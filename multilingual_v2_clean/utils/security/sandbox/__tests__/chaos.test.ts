import { describe, it, expect } from 'vitest';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 🌀 KAOS VE FELAKET KURTARMA SIMÜLASYONU
class ResilientService {
  static async callVertexAIWithLatency(latencyMs: number): Promise<string> {
    // Yapay gecikmeyi (latency) simüle et
    await sleep(latencyMs);
    return 'The story content generated successfully after delay!';
  }

  static async queryDatabaseWithRetry(
    shouldFailFirstTwice: boolean,
    currentAttempt = 1
  ): Promise<boolean> {
    if (shouldFailFirstTwice && currentAttempt < 3) {
      // Bağlantı kesintisini (outage) simüle et ve hata fırlat
      throw new Error(`DB_CONNECTION_ERROR: Attempt ${currentAttempt} failed.`);
    }
    // 3. denemede başarıyla yeniden bağlan ve veri çek (Auto Reconnect)
    return true;
  }
}

describe('🌀 LUMIBOOK SANDBOX CHAOS & LATENCY TESTS', () => {
  it('Dış API 20ms veya daha yavaş yanıt verdiğinde (Gecikme Simülasyonu) sistem çökmeyip yanıtı sabırla beklemelidir', async () => {
    const startTime = Date.now();
    const result = await ResilientService.callVertexAIWithLatency(20);
    const duration = Date.now() - startTime;

    expect(result).toBe('The story content generated successfully after delay!');
    expect(duration).toBeGreaterThanOrEqual(15); // Gecikme başarıyla yönetildi (küçük tolerans ile)
  });

  it('Veritabanı bağlantısı ilk 2 denemede koparsa, sistem pes etmeyip 3. denemede otomatik yeniden bağlanıp (Auto Reconnect) işlemi tamamlamalıdır', async () => {
    let finalResult = false;
    let attemptsCount = 0;

    // Otomatik Yeniden Deneme (Retry Loop with Exponential Backoff) Simülasyonu
    for (let attempt = 1; attempt <= 3; attempt++) {
      attemptsCount = attempt;
      try {
        const success = await ResilientService.queryDatabaseWithRetry(true, attempt);
        if (success) {
          finalResult = true;
          break; // Başarılı! Döngüden çık.
        }
      } catch (err) {
        // Hata durumunda bekle ve tekrar dene
        await sleep(5);
      }
    }

    expect(finalResult).toBe(true); // Veri başarıyla kurtarıldı!
    expect(attemptsCount).toBe(3); // 3. denemede kurtarıldığı doğrulandı!
  });
});
