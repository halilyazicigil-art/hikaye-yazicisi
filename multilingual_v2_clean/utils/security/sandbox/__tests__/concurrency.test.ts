import { describe, it, expect, beforeEach } from 'vitest';
import { MockApiSlotBroker, SandboxDatabase } from '../mockServices';

describe('🛡️ LUMIBOOK SANDBOX CONCURRENCY & STRESS TESTS', () => {
  beforeEach(() => {
    SandboxDatabase.reset();
  });

  it('Aynı anda gelen 10 istekten sadece 2 tanesi yuva kiralayabilmeli, diğer 8 istek sıraya alınmalıdır', async () => {
    const jobIds = Array.from({ length: 10 }, (_, i) => `job-uuid-0000-0000-0000-00000000000${i}`);

    // 10 Eşzamanlı kiralama isteği (Simultane/Parallel) gönderiliyor
    const leasePromises = jobIds.map(id => MockApiSlotBroker.acquireSlot(id));
    const results = await Promise.all(leasePromises);

    // Sonuçların sayımı
    const successfulLeases = results.filter(r => r.success);
    const blockedLeases = results.filter(r => !r.success);

    // KURAL: Sadece 2 adet yuva (primary ve backup) olduğu için en fazla 2 kiralama başarılı olmalı!
    expect(successfulLeases.length).toBe(2);
    expect(blockedLeases.length).toBe(8);

    // Hangi yuvaların kiralandığını doğrula
    const primarySlot = SandboxDatabase.slots.find(s => s.slot_name === 'primary');
    const backupSlot = SandboxDatabase.slots.find(s => s.slot_name === 'backup');

    expect(primarySlot?.status).toBe('busy');
    expect(backupSlot?.status).toBe('busy');

    // Kiralayan job ID'lerini al
    const holder1 = primarySlot?.job_id;
    const holder2 = backupSlot?.job_id;

    expect(holder1).toBeDefined();
    expect(holder2).toBeDefined();
    expect(holder1).not.toBe(holder2);

    // ADIM 2: İlk işlerden biri bittiğinde yuvayı serbest bırakıyor
    const releaseResult = await MockApiSlotBroker.releaseSlot(holder1!);
    expect(releaseResult).toBe(true);
    expect(primarySlot?.status).toBe('idle');

    // ADIM 3: Sırada bekleyen 8 iş tekrar kiralama yarışı yapıyor (skip locked / racing)
    const retryPromises = jobIds
      .filter(id => id !== holder1 && id !== holder2) // Zaten kiralayanları çıkar
      .map(id => MockApiSlotBroker.acquireSlot(id));

    const retryResults = await Promise.all(retryPromises);

    const successfulRetry = retryResults.filter(r => r.success);
    const blockedRetry = retryResults.filter(r => !r.success);

    // KURAL: Sadece 1 adet boş yuva açıldığı için bekleyenlerden sadece 1 tanesi yeni yuvayı kapabilmelidir!
    expect(successfulRetry.length).toBe(1);
    expect(blockedRetry.length).toBe(7);

    // Yeni kiralayanın yuvaya oturduğunu doğrula
    expect(primarySlot?.status).toBe('busy');
    expect(primarySlot?.job_id).toBeDefined();
  });
});
