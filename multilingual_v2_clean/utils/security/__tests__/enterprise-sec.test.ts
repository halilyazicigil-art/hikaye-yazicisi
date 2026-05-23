import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EnterpriseSec } from '../enterprise-sec';

describe('EnterpriseSec: Kurumsal Güvenlik ve Koruma Kalkanı Testleri', () => {

  beforeEach(() => {
    vi.restoreAllMocks();
    delete process.env.INTERNAL_WORKER_KEY;
  });

  describe('1. API Token Doğrulama (verifyApiToken)', () => {
    it('Geçerli token başlığı gönderildiğinde doğrulamadan başarıyla geçmelidir', () => {
      // Setup
      process.env.INTERNAL_WORKER_KEY = 'test_secret_key_123';
      const mockRequest = {
        headers: {
          get: (name: string) => (name === 'x-internal-worker-key' ? 'test_secret_key_123' : null)
        }
      } as unknown as Request;

      // Act
      const result = EnterpriseSec.verifyApiToken(mockRequest);

      // Assert
      expect(result).toBe(true);
    });

    it('Environment key yokken varsayılan (DEFAULT_WORKER_KEY) ile geçmelidir', () => {
      const mockRequest = {
        headers: {
          get: (name: string) => (name === 'x-internal-worker-key' ? 'lumibook_secure_worker_auth_key_2026' : null)
        }
      } as unknown as Request;

      const result = EnterpriseSec.verifyApiToken(mockRequest);
      expect(result).toBe(true);
    });

    it('Yanlış veya eksik token başlığı gönderildiğinde doğrulamayı reddetmelidir', () => {
      process.env.INTERNAL_WORKER_KEY = 'test_secret_key_123';
      const mockRequest = {
        headers: {
          get: (name: string) => (name === 'x-internal-worker-key' ? 'wrong_key' : null)
        }
      } as unknown as Request;

      const result = EnterpriseSec.verifyApiToken(mockRequest);
      expect(result).toBe(false);
    });

    it('x-internal-worker-key başlığı tamamen yoksa doğrulamayı reddetmelidir', () => {
      const mockRequest = {
        headers: {
          get: () => null
        }
      } as unknown as Request;

      const result = EnterpriseSec.verifyApiToken(mockRequest);
      expect(result).toBe(false);
    });
  });

  describe('2. PBKDF2 PIN Şifreleme (hashPin & verifyPin)', () => {
    it('Verilen düz PIN kodunu tuzlanmış ve iki parçalı hash formatına çevirmelidir', () => {
      const pin = '123456';
      const hashed = EnterpriseSec.hashPin(pin);

      expect(hashed).toContain(':');
      const parts = hashed.split(':');
      expect(parts.length).toBe(2);
      expect(parts[0].length).toBe(32); // 16 bytes hex salt = 32 chars
      expect(parts[1].length).toBe(128); // 64 bytes hex hash = 128 chars
    });

    it('Boş PIN verilirse hata fırlatmalıdır', () => {
      expect(() => EnterpriseSec.hashPin('')).toThrow('PIN kodu boş olamaz');
    });

    it('Doğru PIN kodu girildiğinde eşleşmeyi doğrulamalıdır', () => {
      const pin = '9876';
      const hashed = EnterpriseSec.hashPin(pin);

      const isMatch = EnterpriseSec.verifyPin(pin, hashed);
      expect(isMatch).toBe(true);
    });

    it('Yanlış PIN kodu girildiğinde eşleşmeyi reddetmelidir', () => {
      const pin = '9876';
      const hashed = EnterpriseSec.hashPin(pin);

      const isMatch = EnterpriseSec.verifyPin('wrong_pin', hashed);
      expect(isMatch).toBe(false);
    });

    it('Bozuk hash şeması verildiğinde güvenli bir şekilde false dönmelidir', () => {
      const isMatch = EnterpriseSec.verifyPin('1234', 'salt_without_colon');
      expect(isMatch).toBe(false);
    });
  });

  describe('3. Atomik Transaksiyon Kopyalama (executeAtomicCacheCopy)', () => {
    const mockParams = {
      userId: 'user_id_123',
      masterStoryId: 'master_story_123',
      status: 'cached_processing',
      payload: { isShuffle: true },
      fingerprint: 'fp_123',
      scheduledAt: '2026-05-17T15:00:00Z',
      estimatedDuration: 180
    };

    it('Supabase RPC yüklüyse ve başarılıysa, RPC üzerinden tek sorguda tamamlamalıdır', async () => {
      // Setup
      const mockSupabase = {
        rpc: vi.fn().mockResolvedValue({ data: 'job_id_abc', error: null })
      } as any;

      // Act
      const result = await EnterpriseSec.executeAtomicCacheCopy(mockSupabase, mockParams);

      // Assert
      expect(mockSupabase.rpc).toHaveBeenCalledWith('copy_story_and_create_job', {
        p_user_id: mockParams.userId,
        p_master_story_id: mockParams.masterStoryId,
        p_status: mockParams.status,
        p_payload: mockParams.payload,
        p_fingerprint: mockParams.fingerprint,
        p_scheduled_at: mockParams.scheduledAt,
        p_estimated_duration: mockParams.estimatedDuration
      });
      expect(result).toEqual({ success: true, jobId: 'job_id_abc' });
    });

    it('Supabase RPC hata verirse (yüklü değilse), fallback modunda sıralı kopyalamayı denemelidir', async () => {
      // Setup: RPC hata dönüyor, sıralı işlemler başarılı
      const mockStory = {
        title: 'Mutlu Kedi',
        content_json: {},
        image_url: 'img_url',
        audio_url: 'audio_url',
        is_shuffle: true,
        metadata: {}
      };

      const mockSupabase = {
        rpc: vi.fn().mockResolvedValue({ data: null, error: { message: 'Function not found' } }),
        from: vi.fn().mockImplementation((table: string) => {
          if (table === 'stories') {
            return {
              select: vi.fn().mockReturnThis(),
              eq: vi.fn().mockReturnThis(),
              single: vi.fn().mockResolvedValue({ data: mockStory, error: null }),
              insert: vi.fn().mockReturnThis(),
              selectReturnSingle: vi.fn().mockResolvedValue({ data: { id: 'copied_story_999' }, error: null })
            };
          }
          if (table === 'generation_jobs') {
            return {
              insert: vi.fn().mockReturnThis(),
              select: vi.fn().mockReturnThis(),
              single: vi.fn().mockResolvedValue({ data: { id: 'fake_job_888' }, error: null })
            };
          }
          return {};
        })
      } as any;

      // RPC sonrası standard kopyalama zincirini mocklamak için Supabase chain desteği
      const selectChain = {
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockImplementation(() => Promise.resolve({ data: mockStory, error: null }))
      };
      const insertChain = {
        select: vi.fn().mockReturnThis(),
        single: vi.fn().mockImplementation(() => Promise.resolve({ data: { id: 'copied_story_999' }, error: null }))
      };

      mockSupabase.from = vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue(selectChain),
        insert: vi.fn().mockReturnValue(insertChain)
      });

      // Act
      const result = await EnterpriseSec.executeAtomicCacheCopy(mockSupabase, mockParams);

      // Assert
      expect(mockSupabase.rpc).toHaveBeenCalled();
      expect(mockSupabase.from).toHaveBeenCalledWith('stories');
    });

    it('Fallback sırasında ikinci adım çökerse, ilk adımdaki story silinmeli (Rollback) ve hata dönmelidir', async () => {
      // Setup: Story kopyalaması başarılı, ancak Job ekleme çöküyor.
      const mockStory = { title: 'Test' };
      const deleteMock = vi.fn().mockReturnThis();

      const mockSupabase = {
        rpc: vi.fn().mockResolvedValue({ data: null, error: { message: 'Function not found' } }),
        from: vi.fn().mockImplementation((table: string) => {
          if (table === 'stories') {
            const selectChain = {
              eq: vi.fn().mockReturnThis(),
              single: vi.fn().mockImplementation(() => Promise.resolve({ data: mockStory, error: null }))
            };
            const insertChain = {
              select: vi.fn().mockReturnThis(),
              single: vi.fn().mockImplementation(() => Promise.resolve({ data: { id: 'copied_story_999' }, error: null }))
            };
            return {
              select: vi.fn().mockReturnValue(selectChain),
              insert: vi.fn().mockReturnValue(insertChain),
              delete: vi.fn().mockReturnValue({ eq: deleteMock })
            };
          }
          if (table === 'generation_jobs') {
            return {
              insert: vi.fn().mockReturnThis(),
              select: vi.fn().mockReturnThis(),
              single: vi.fn().mockImplementation(() => Promise.resolve({ data: null, error: { message: 'Insert failed' } }))
            };
          }
          return {};
        })
      } as any;

      // Act
      const result = await EnterpriseSec.executeAtomicCacheCopy(mockSupabase, mockParams);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toContain('Sanal iş oluşturulamadı');
      expect(mockSupabase.from).toHaveBeenCalledWith('stories');
      expect(deleteMock).toHaveBeenCalledWith('id', 'copied_story_999'); // Rollback tetiklenmiş olmalı!
    });
  });
});
