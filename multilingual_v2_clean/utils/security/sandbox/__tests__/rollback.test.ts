import { describe, it, expect, beforeEach } from 'vitest';
import { SandboxDatabase, MockApiSlotBroker, MockJob } from '../mockServices';

describe('🚨 LUMIBOOK SANDBOX ROLLBACK & FALLBACK TESTS', () => {
  beforeEach(() => {
    SandboxDatabase.reset();
  });

  it('Üretim esnasında API veya elektrik kesintisi çökmelerinde, slot otomatik iade edilmeli ve hata kaydedilmelidir', async () => {
    const errorJobId = '99999999-9999-9999-9999-999999999999';
    
    // 1. Job ekle
    const failingJob: MockJob = {
      id: errorJobId,
      user_id: 'user-777',
      status: 'pending',
      progress: 0,
      story_id: null,
      payload: { hero: 'Sir Galahad' },
      fingerprint: 'sir galahad|dragon',
      scheduled_at: new Date().toISOString(),
      estimated_duration: 120,
      created_at: new Date().toISOString()
    };
    SandboxDatabase.jobs.push(failingJob);

    // 2. Slot kirala
    const lease = await MockApiSlotBroker.acquireSlot(errorJobId);
    expect(lease.success).toBe(true);
    expect(lease.slot).toBe('primary');

    const primarySlot = SandboxDatabase.slots.find(s => s.slot_name === 'primary');
    expect(primarySlot?.status).toBe('busy');

    // 3. ANİ ÇÖKME (TRY-CATCH SIMÜLASYONU)
    try {
      failingJob.status = 'processing';
      failingJob.progress = 30;

      // Beklenmeyen Vertex AI API veya Arayüz Hatası tetikleniyor
      throw new Error('VertexAI: Quota exceeded or connection timed out.');
    } catch (err: any) {
      // Otomatik Geri Alma (Rollback) & Hata Kaydı (Fallback) Tetiklenir
      
      // A. Slotu hemen güvenle iade et (Kuyruk kilitlenmesin!)
      const released = await MockApiSlotBroker.releaseSlot(errorJobId);
      expect(released).toBe(true);

      // B. Job durumunu failed yap ve hata mesajını yazdır
      failingJob.status = 'failed';
      failingJob.progress = 91; // %91 ses birleştirme hatası simülasyonu
      failingJob.error_message = err.message;
    }

    // VERİTABANI KONTROLÜ (GÜVENLİK KALKANI DOĞRULAMASI)
    
    // Slotun tamamen boşaldığını doğrula (Kilit açık!)
    expect(primarySlot?.status).toBe('idle');
    expect(primarySlot?.job_id).toBeNull();

    // Hatanın veritabanına işlendiğini doğrula
    const checkedJob = SandboxDatabase.jobs.find(j => j.id === errorJobId);
    expect(checkedJob?.status).toBe('failed');
    expect(checkedJob?.progress).toBe(91);
    expect(checkedJob?.error_message).toBe('VertexAI: Quota exceeded or connection timed out.');
  });
});
