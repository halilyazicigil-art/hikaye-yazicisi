import { EventEmitter } from 'events';
import { EnterpriseSec } from './enterprise-sec';

// Real-time SSE Progress için global EventEmitter singleton
const progressEmitter = new EventEmitter();

export interface StepStatus {
  nextPageIndex: number;
  isCompleted: boolean;
  progress: number;
}

export class EnterpriseQueue {
  public static readonly progressEmitter = progressEmitter;

  /**
   * Masalın checkpoint durumuna göre sıradaki adımın hedefini hesaplar.
   * @param payload Job tablosundaki payload sütunu
   * @param totalPages Toplam sayfa sayısı (varsayılan: 12)
   */
  public static shouldProcessNextStep(payload: any, totalPages: number = 12): StepStatus {
    if (!payload) {
      return { nextPageIndex: 0, isCompleted: false, progress: 5 };
    }

    const pages = payload.checkpoint_pages || [];
    const generatedPagesCount = pages.length;

    // Metin üretilmediyse 0. adımdır (Metin ve ilk sahne)
    if (!payload.checkpoint_story_data) {
      return { nextPageIndex: 0, isCompleted: false, progress: 10 };
    }

    // Tüm sayfalar (görsel + ses) çizildiyse tamamlanmıştır
    if (generatedPagesCount >= totalPages) {
      return { nextPageIndex: totalPages, isCompleted: true, progress: 100 };
    }

    // İlerleme yüzdesi hesabı (10% başlangıç barajı + her sayfa için eşit ağırlık)
    const baseProgress = 15;
    const progressPerPage = Math.floor((80 / totalPages));
    const currentProgress = Math.min(95, baseProgress + (generatedPagesCount * progressPerPage));

    return {
      nextPageIndex: generatedPagesCount,
      isCompleted: false,
      progress: currentProgress
    };
  }

  /**
   * İlerleme durumunu hem canlı yayın (SSE) için dağıtır hem de Redis / Veritabanına kaydeder.
   */
  public static async publishProgress(jobId: string, progress: number, data?: any): Promise<void> {
    try {
      const message = { jobId, progress, timestamp: Date.now(), ...data };
      
      // 1. Canlı SSE dinleyicilerine dağıt (In-Memory Pub/Sub)
      progressEmitter.emit(`progress:${jobId}`, message);

      // 2. Redis Bağlantı Kalkanı (Eğer REDIS_URL yüklüyse ve kurulduysa)
      // Devre dışı: ioredis paketi kurulu değil ve kullanılmıyor.
      /*
      if (process.env.REDIS_URL) {
        try {
          const Redis = require('ioredis');
          const redis = new Redis(process.env.REDIS_URL);
          await redis.setex(`job:${jobId}:progress`, 3600, JSON.stringify(message));
          await redis.quit();
        } catch (redisErr: any) {
          console.warn(`[REDIS FALLBACK WARNING] Redis'e yazılamadı: ${redisErr.message}`);
        }
      }
      */
    } catch (err: any) {
      console.error(`[QUEUE ERROR] İlerleme yayınlanırken hata: ${err.message}`);
    }
  }

  /**
   * Bir sonraki sayfanın üretilmesi için worker API'sini asenkron ve imza doğrulamasını koruyarak rekürsif tetikler.
   */
  public static async triggerNextStepAsync(jobId: string): Promise<boolean> {
    try {
      const isTestEnv = process.env.NODE_ENV === 'test';

      // Read current request headers to check if orchestrated by Trigger.dev
      let isOrchestrated = false;
      try {
        const { headers } = require('next/headers');
        const headersList = await headers();
        const orchestratedJobId = headersList.get('x-orchestrated-job-id');
        
        // If the current request is orchestrated by Trigger.dev for the SAME jobId, skip recursive call
        if (orchestratedJobId === jobId) {
          isOrchestrated = true;
        }
      } catch (e) {
        // Not in Next.js request context (e.g., test environment or background script)
      }

      if (isOrchestrated) {
        console.log(`[EnterpriseQueue] Job ${jobId} is orchestrated by Trigger.dev. Skipping recursive HTTP fetch.`);
        return true;
      }

      // If Trigger.dev is configured, delegate task queuing to Trigger.dev.
      // Bypass Trigger.dev in local development mode (APP_ENV=dev) unless FORCE_TRIGGER_DEV is true.
      const useTriggerDev = process.env.TRIGGER_SECRET_KEY && 
                            !isTestEnv && 
                            (process.env.APP_ENV !== 'dev' || process.env.FORCE_TRIGGER_DEV === 'true');

      if (useTriggerDev) {
        try {
          const { generateStoryTask } = require('../../src/trigger/story');
          await generateStoryTask.trigger({ jobId });
          console.log(`[EnterpriseQueue] Triggered generateStoryTask on Trigger.dev for job: ${jobId}`);
          return true;
        } catch (err: any) {
          console.error(`[EnterpriseQueue] Trigger.dev task trigger failed, falling back to HTTP: ${err.message}`);
        }
      }

      const baseUrl = isTestEnv ? 'http://localhost:3000' : (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:8181');
      const workerUrl = `${baseUrl}/api/story-worker`;

      // Yetkilendirme imzalarını al (Faz 1 Koruması)
      const authHeaders = EnterpriseSec.getAuthorizationHeaders();

      // test ortamında await ediyoruz ki test kararlı sonuç versin
      if (isTestEnv) {
        const res = await fetch(workerUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...authHeaders },
          body: JSON.stringify({ jobId })
        });
        return res.ok;
      }

      // 🛡️ DEADLOCK KALKANI: Mevcut HTTP isteği tamamen kapanmadan yeni istek
      // açılırsa Next.js lokal TCP soket limiti aşılır ve sistem kilitlenir.
      // 100ms gecikme ile sunucunun soketi temizlemesine izin veriyoruz.
      setTimeout(() => {
        fetch(workerUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Connection': 'close',   // Eski soketlerin açık kalmasını engeller
            ...authHeaders
          },
          body: JSON.stringify({ jobId })
        }).catch((err) => {
          console.error(`[RECURSIVE TRIGGER ERROR] Asenkron istek başarısız oldu: ${err.message}`);
        });
      }, 100);

      return true;
    } catch (err: any) {
      console.error(`[QUEUE TRIGGER ERROR] Bir sonraki adım tetiklenemedi: ${err.message}`);
      return false;
    }
  }
}
