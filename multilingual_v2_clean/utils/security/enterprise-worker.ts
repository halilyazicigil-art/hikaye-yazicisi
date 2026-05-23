import { createAdminClient } from '../supabase/server';
import { EnterpriseQueue } from './enterprise-queue';

export class EnterpriseWorker {
  private static activeJobsCount = 0;
  private static maxConcurrency = 2; // Çevre değişkeninden alınabilir (Maksimum eşzamanlı iş sayısı)
  private static workerInterval: NodeJS.Timeout | null = null;
  private static isPolling = false;

  /**
   * 🚀 Arka plan işçi döngüsünü başlatır.
   * Geliştirme ortamında (Next.js HMR) mükerrer döngüleri önlemek için global nesneyi kullanır.
   */
  public static start(customMaxConcurrency?: number) {
    if (customMaxConcurrency !== undefined) {
      this.maxConcurrency = customMaxConcurrency;
    }

    const isTestEnv = process.env.NODE_ENV === 'test';
    
    // Geliştirme ortamında sıcak yenileme (HMR) koruması
    const globalForWorker = global as typeof global & {
      enterpriseWorkerInterval?: NodeJS.Timeout;
    };

    if (!isTestEnv && globalForWorker.enterpriseWorkerInterval) {
      this.workerInterval = globalForWorker.enterpriseWorkerInterval;
      return;
    }

    if (this.workerInterval) return;

    // Sunucu başlarken askıda kalan işleri kurtar (Self-Healing)
    if (!isTestEnv) {
      this.recoverStuckJobs().catch((err) => 
        console.error(`[Worker Recovery Error] Stuck jobs recovery failed: ${err.message}`)
      );
    }

    // Belirli aralıklarla kuyruğu kontrol et
    this.workerInterval = setInterval(async () => {
      await this.processQueue();
    }, isTestEnv ? 50 : 5000); // Test ortamında 50ms, canlı/yerelde 5 saniye

    if (!isTestEnv) {
      globalForWorker.enterpriseWorkerInterval = this.workerInterval;
    }
  }

  /**
   * Arka plan işçisini durdurur (Testlerin temiz kapanması için).
   */
  public static stop() {
    if (this.workerInterval) {
      clearInterval(this.workerInterval);
      this.workerInterval = null;
    }

    const globalForWorker = global as typeof global & {
      enterpriseWorkerInterval?: NodeJS.Timeout;
    };
    delete globalForWorker.enterpriseWorkerInterval;
  }

  /**
   * Aktif işlenen iş sayısını döner (İzleme ve testler için).
   */
  public static getActiveJobsCount(): number {
    return this.activeJobsCount;
  }

  /**
   * 🛡️ Kendi Kendini İyileştirme (Auto-Recovery):
   * Sunucu çöktüğünde veya yeniden başladığında 'processing' veya 'generating_audio' 
   * durumunda takılı kalan işleri güvenle 'waiting_in_queue' durumuna çeker.
   */
  public static async recoverStuckJobs(): Promise<void> {
    try {
      const supabase = await createAdminClient();
      const { error } = await supabase
        .from('generation_jobs')
        .update({ status: 'waiting_in_queue' })
        .in('status', ['processing', 'generating_audio', 'processing_text']);

      if (error) {
        console.error(`[Worker Recovery] Stuck jobs could not be recovered: ${error.message}`);
      } else {
        console.log('[Worker Recovery] Successfully reset stuck jobs back to waiting queue.');
      }
    } catch (err: any) {
      console.error(`[Worker Recovery Exception] ${err.message}`);
    }
  }

  /**
   * 🔒 Atomik Kuyruk Rezervasyonu (PostgreSQL SKIP LOCKED):
   * get_next_job_in_queue veritabanı fonksiyonunu çağırarak sıradaki işi atomically kilitler.
   */
  private static async fetchNextJob(): Promise<string | null> {
    try {
      const supabase = await createAdminClient();
      
      const { data, error } = await supabase.rpc('get_next_job_in_queue');
      
      if (error) {
        console.error(`[Worker Queue Fetch Error] ${error.message}`);
        return null;
      }

      if (data && data.length > 0 && data[0].job_id) {
        return data[0].job_id;
      }
      
      return null;
    } catch (err: any) {
      console.error(`[Worker Queue Fetch Exception] ${err.message}`);
      return null;
    }
  }

  /**
   * Eşzamanlılık limitini aşmadan kuyruktaki işleri çekip asenkron tetikler.
   */
  public static async processQueue(): Promise<void> {
    if (this.isPolling) return;
    this.isPolling = true;

    try {
      while (this.activeJobsCount < this.maxConcurrency) {
        const jobId = await this.fetchNextJob();
        if (!jobId) {
          break; // Kuyrukta bekleyen başka iş yok
        }

        // Aktif iş yükünü artır
        this.activeJobsCount++;

        // İşi asenkron olarak arka planda koştur
        this.runJob(jobId)
          .catch((err) => {
            console.error(`[Worker Job Exception] Job ${jobId} failed: ${err.message}`);
          })
          .finally(() => {
            this.activeJobsCount--;
            // Boşalan slotu hemen doldurmak için kuyruğu anında tekrar tetikle (De-recursive)
            setTimeout(() => this.processQueue(), 0);
          });
      }
    } catch (err: any) {
      console.error(`[Worker Polling Exception] ${err.message}`);
    } finally {
      this.isPolling = false;
    }
  }

  /**
   * 🎯 Bir işin tüm yaşam döngüsünü sunucu içinde kilitlenmesiz ve döngüsel (loopback-free) yönetir.
   */
  private static async runJob(jobId: string): Promise<void> {
    console.log(`>>> [Worker] Job ${jobId} için arka plan döngüsü başlatıldı.`);
    
    // Not: Bu kısım cerrahi entegrasyon onayından sonra asıl API iş mantığıyla 
    // birleştirilecektir. Şu aşamada izole testlerin kusursuz geçmesi için 
    // temel akış mimarisi kurulmuştur.
  }
}
