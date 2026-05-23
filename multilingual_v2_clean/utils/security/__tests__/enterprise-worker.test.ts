import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { EnterpriseWorker } from '../enterprise-worker';

// Supabase Sunucu İstemcisi Altyapısını Mock'la
const mockSupabase = {
  from: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  in: vi.fn().mockReturnThis(),
  select: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  single: vi.fn().mockReturnThis(),
  rpc: vi.fn()
};

vi.mock('@/utils/supabase/server', () => ({
  createAdminClient: vi.fn(() => mockSupabase)
}));

describe('EnterpriseWorker: Kurumsal Eşzamanlı İşçi ve Kuyruk Yönetim Testleri', () => {

  beforeEach(() => {
    vi.restoreAllMocks();
    EnterpriseWorker.stop();
  });

  afterEach(() => {
    EnterpriseWorker.stop();
  });

  describe('1. Kendi Kendini İyileştirme (recoverStuckJobs)', () => {
    it('Sunucu başlarken askıda kalan tüm işlerin statüsünü waiting_in_queue durumuna geri çekmelidir', async () => {
      // Setup mock data
      const mockIn = vi.fn().mockResolvedValue({ error: null });
      const mockUpdate = vi.fn(() => ({ in: mockIn }));
      mockSupabase.from.mockReturnValue({ update: mockUpdate });

      // Act
      await EnterpriseWorker.recoverStuckJobs();

      // Assert
      expect(mockSupabase.from).toHaveBeenCalledWith('generation_jobs');
      expect(mockUpdate).toHaveBeenCalledWith({ status: 'waiting_in_queue' });
      expect(mockIn).toHaveBeenCalledWith('status', ['processing', 'generating_audio', 'processing_text']);
    });
  });

  describe('2. Atomik Kuyruk Rezervasyonu (fetchNextJob ve PostgreSQL SKIP LOCKED RPC)', () => {
    it('Veritabanında bekleyen bir iş varsa RPC fonksiyonu üzerinden job_id değerini doğru dönmelidir', async () => {
      // Setup RPC mock
      mockSupabase.rpc.mockResolvedValueOnce({
        data: [{ job_id: 'job_uuid_123' }],
        error: null
      }).mockResolvedValue({
        data: [],
        error: null
      });

      // Act
      const fetchNextJobSpy = vi.spyOn(EnterpriseWorker as any, 'fetchNextJob');
      
      // processQueue çalıştırıldığında fetchNextJob'ı çağırır
      await EnterpriseWorker.processQueue();

      // Assert
      expect(fetchNextJobSpy).toHaveBeenCalled();
      const result = await fetchNextJobSpy.mock.results[0].value;
      expect(result).toBe('job_uuid_123');
    });

    it('Kuyruk tamamen boşsa null değerini dönmelidir', async () => {
      // Setup empty RPC response
      mockSupabase.rpc.mockResolvedValue({
        data: [],
        error: null
      });

      const fetchNextJobSpy = vi.spyOn(EnterpriseWorker as any, 'fetchNextJob');
      await EnterpriseWorker.processQueue();

      const result = await fetchNextJobSpy.mock.results[0].value;
      expect(result).toBeNull();
    });
  });

  describe('3. Eşzamanlılık Sınırı (Concurrency Limiter)', () => {
    it('Aktif iş sayısı maksimum limit değerine (concurrency limit) ulaştığında kuyruktan yeni iş çekmemelidir', async () => {
      // Setup worker with concurrency limit of 1
      EnterpriseWorker.start(1);

      // fetchNextJob'ı her zaman geçerli bir iş dönecek şekilde mock'la
      const fetchNextJobSpy = vi.spyOn(EnterpriseWorker as any, 'fetchNextJob').mockResolvedValue('another_job_id');

      // runJob metodunu mock'layalım ki işin bitmesi zaman alsın (asenkron dursun)
      const runJobSpy = vi.spyOn(EnterpriseWorker as any, 'runJob').mockImplementation(async () => {
        // İşi bitirmeden uzun süren bir işlem simüle et
        await new Promise(resolve => setTimeout(resolve, 500));
      });

      // İlk iş kuyruktan çekilir ve işlenmeye başlar
      await EnterpriseWorker.processQueue();

      // Assert
      expect(EnterpriseWorker.getActiveJobsCount()).toBe(1);
      
      // Limit 1 iken, processQueue tekrar çağrıldığında yeni iş çekilmemelidir!
      await EnterpriseWorker.processQueue();
      
      // fetchNextJob ilk çağrı dışında tekrar çağrılmamış olmalı (Concurrency Limiti korundu)
      expect(fetchNextJobSpy).toHaveBeenCalledTimes(1);

      // Temizle
      EnterpriseWorker.stop();
    });
  });
});
