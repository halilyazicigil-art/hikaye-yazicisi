import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { EnterpriseQueue } from '../enterprise-queue';
import { EnterpriseSec } from '../enterprise-sec';

describe('EnterpriseQueue: Kurumsal Kuyruk ve Adım Yönetim Testleri', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('1. shouldProcessNextStep (Sıradaki Adım ve İlerleme Hesaplaması)', () => {
    it('Payload boşsa, sıfırdan başlama kararı vermeli ve %5 veya %10 ilerleme dönmelidir', () => {
      const result = EnterpriseQueue.shouldProcessNextStep(null, 12);
      expect(result.nextPageIndex).toBe(0);
      expect(result.isCompleted).toBe(false);
      expect(result.progress).toBe(5);
    });

    it('Checkpoint_story_data (metin) henüz üretilmediyse 0. indexi döndürmelidir', () => {
      const payload = { checkpoint_pages: [] };
      const result = EnterpriseQueue.shouldProcessNextStep(payload, 12);
      expect(result.nextPageIndex).toBe(0);
      expect(result.isCompleted).toBe(false);
      expect(result.progress).toBe(10);
    });

    it('Kısmi sayfalar üretildiyse sıradaki sayfa indexini ve orantılı ilerlemeyi hesaplamalıdır', () => {
      const payload = {
        checkpoint_story_data: { title: 'Deneme' },
        checkpoint_pages: [
          { text: 'Sayfa 1', image_url: 'img1', audio_url: 'aud1' },
          { text: 'Sayfa 2', image_url: 'img2', audio_url: 'aud2' }
        ]
      };
      
      const result = EnterpriseQueue.shouldProcessNextStep(payload, 12);
      expect(result.nextPageIndex).toBe(2); // 0 ve 1 tamamlandı, sıradaki 2
      expect(result.isCompleted).toBe(false);
      expect(result.progress).toBeGreaterThan(15); // İlerleme başlamış olmalı
      expect(result.progress).toBeLessThan(100);
    });

    it('Tüm sayfalar tamamlandıysa isCompleted true ve %100 progress dönmelidir', () => {
      const fullPages = Array.from({ length: 12 }, (_, i) => ({
        text: `Sayfa ${i}`,
        image_url: `img${i}`,
        audio_url: `aud${i}`
      }));

      const payload = {
        checkpoint_story_data: { title: 'Tamamlandı' },
        checkpoint_pages: fullPages
      };

      const result = EnterpriseQueue.shouldProcessNextStep(payload, 12);
      expect(result.nextPageIndex).toBe(12);
      expect(result.isCompleted).toBe(true);
      expect(result.progress).toBe(100);
    });
  });

  describe('2. publishProgress (SSE Event Yayınlama)', () => {
    it('publishProgress çağrıldığında progressEmitter üzerinden dinleyicilere anlık mesaj gitmelidir', () => {
      const jobId = 'test_job_123';
      const expectedProgress = 45;
      let receivedMessage: any = null;

      // Event listener ekle
      EnterpriseQueue.progressEmitter.on(`progress:${jobId}`, (msg) => {
        receivedMessage = msg;
      });

      // Act
      EnterpriseQueue.publishProgress(jobId, expectedProgress, { status: 'drawing_images' });

      // Assert
      expect(receivedMessage).not.toBeNull();
      expect(receivedMessage.jobId).toBe(jobId);
      expect(receivedMessage.progress).toBe(expectedProgress);
      expect(receivedMessage.status).toBe('drawing_images');
      expect(receivedMessage.timestamp).toBeGreaterThan(0);
    });
  });

  describe('3. triggerNextStepAsync (Rekürsif Adım Tetikleme)', () => {
    it('Tetikleme sırasında API isteğine Faz 1 Token ve Yetki imzaları eklenmelidir', async () => {
      // Mock fetch global
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ success: true })
      });
      vi.stubGlobal('fetch', mockFetch);

      const jobId = 'job_999';

      // Act
      const success = await EnterpriseQueue.triggerNextStepAsync(jobId);

      // Assert
      expect(success).toBe(true);
      expect(mockFetch).toHaveBeenCalled();
      
      const lastCallArgs = mockFetch.mock.calls[0];
      const url = lastCallArgs[0];
      const options = lastCallArgs[1] as any;

      expect(url).toContain('/api/story-worker');
      expect(options.method).toBe('POST');
      expect(JSON.parse(options.body)).toEqual({ jobId });
      
      // Güvenlik anahtar başlığı doğrulaması (x-internal-worker-key)
      expect(options.headers).toHaveProperty('x-internal-worker-key');
      expect(options.headers['x-internal-worker-key']).toBe(
        process.env.NEXT_PUBLIC_INTERNAL_WORKER_KEY || 'lumibook_secure_worker_auth_key_2026'
      );
    });
  });
});
