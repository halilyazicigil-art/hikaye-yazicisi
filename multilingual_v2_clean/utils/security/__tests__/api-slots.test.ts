import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ApiSlotBroker } from '../sandbox/ApiSlotBroker';
import { SupabaseClient } from '@supabase/supabase-js';

describe('ApiSlotBroker: Kurumsal Yuva Kiralama ve Hata Tolerans Testleri', () => {
  const mockSupabase = {
    rpc: vi.fn()
  } as unknown as SupabaseClient;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('1. acquireSlot (Yuva Kiralama)', () => {
    it('Veritabanı RPC fonksiyonu "primary" dönerse metot "primary" dönmelidir', async () => {
      vi.mocked(mockSupabase.rpc).mockResolvedValue({
        data: 'primary',
        error: null
      } as any);

      const slot = await ApiSlotBroker.acquireSlot(mockSupabase, 'job-uuid-1');

      expect(mockSupabase.rpc).toHaveBeenCalledWith('acquire_api_slot', {
        p_job_id: 'job-uuid-1'
      });
      expect(slot).toBe('primary');
    });

    it('Veritabanı RPC fonksiyonu "backup" dönerse metot "backup" dönmelidir', async () => {
      vi.mocked(mockSupabase.rpc).mockResolvedValue({
        data: 'backup',
        error: null
      } as any);

      const slot = await ApiSlotBroker.acquireSlot(mockSupabase, 'job-uuid-2');

      expect(mockSupabase.rpc).toHaveBeenCalledWith('acquire_api_slot', {
        p_job_id: 'job-uuid-2'
      });
      expect(slot).toBe('backup');
    });

    it('Tüm yuvalar doluysa ve RPC null dönerse metot null dönmelidir', async () => {
      vi.mocked(mockSupabase.rpc).mockResolvedValue({
        data: null,
        error: null
      } as any);

      const slot = await ApiSlotBroker.acquireSlot(mockSupabase, 'job-uuid-3');

      expect(slot).toBeNull();
    });

    it('SQL henüz çalıştırılmadıysa (PGRST202/PGRST205), sistem çökmeyip defensive fallback olarak "primary" dönmelidir', async () => {
      // Konsol uyarılarının kirlilik yaratmasını önlemek için spy ekliyoruz
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      vi.mocked(mockSupabase.rpc).mockResolvedValue({
        data: null,
        error: {
          code: 'PGRST202',
          message: 'Could not find the function acquire_api_slot',
          details: '',
          hint: ''
        }
      } as any);

      const slot = await ApiSlotBroker.acquireSlot(mockSupabase, 'job-uuid-4');

      expect(slot).toBe('primary');
      expect(consoleWarnSpy).toHaveBeenCalled();
    });

    it('RPC sırasında genel bir hata (örn. Network) çıkarsa null dönmelidir', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      vi.mocked(mockSupabase.rpc).mockResolvedValue({
        data: null,
        error: {
          code: '500',
          message: 'Database connection lost',
          details: '',
          hint: ''
        }
      } as any);

      const slot = await ApiSlotBroker.acquireSlot(mockSupabase, 'job-uuid-5');

      expect(slot).toBeNull();
      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });

  describe('2. releaseSlot (Yuva Serbest Bırakma)', () => {
    it('releaseSlot fonksiyonu doğru parametrelerle release_api_slot RPC çağrısı yapmalıdır', async () => {
      vi.mocked(mockSupabase.rpc).mockResolvedValue({
        error: null
      } as any);

      await ApiSlotBroker.releaseSlot(mockSupabase, 'job-uuid-6');

      expect(mockSupabase.rpc).toHaveBeenCalledWith('release_api_slot', {
        p_job_id: 'job-uuid-6'
      });
    });
  });
});
