import { describe, it, expect, beforeEach } from 'vitest';
import { SmartDictionary } from '../../../smart-dictionary';
import { MockApiSlotBroker, SandboxDatabase } from '../mockServices';

describe('🧪 LUMIBOOK SANDBOX UNIT TESTS', () => {
  beforeEach(() => {
    SandboxDatabase.reset();
  });

  describe('🧠 1. SmartDictionary (Akıllı Sözlük) Normalizasyon Testleri', () => {
    it('Stil parametrelerini doğru anahtara dönüştürmelidir', () => {
      expect(SmartDictionary.getStyleKey('Hand-painted watercolor washes')).toBe('watercolor');
      expect(SmartDictionary.getStyleKey('cinematic volumetric lighting pixar')).toBe('pixar');
      expect(SmartDictionary.getStyleKey('modern high-quality anime art style')).toBe('anime');
      expect(SmartDictionary.getStyleKey('unknown_style')).toBeNull();
    });

    it('Ses parametrelerini teknik kimliklere doğru eşlemelidir', () => {
      expect(SmartDictionary.getVoiceKey('Wise Grandpa (Achird)')).toBe('achird');
      expect(SmartDictionary.getVoiceKey('Traveler Rabbit (Algenib)')).toBe('algenib');
      expect(SmartDictionary.getVoiceKey('Brave Knight (Algieba)')).toBe('algieba');
    });

    it('Eğitici değer ve dil parametrelerini normalize etmelidir', () => {
      expect(SmartDictionary.getGenreKey('macera hikayesi')).toBe('adventure');
      expect(SmartDictionary.getLangKey('Turkish language')).toBe('tr');
      expect(SmartDictionary.getLangKey('english')).toBe('en');
    });

    it('Yeni eklenen 15 İngilizce senaryonun akıllı sözlük uyumluluğunu doğrulamalıdır', () => {
      const sampleSenaryo1 = { voice: 'Achird', style: 'watercolor', genre: 'tale' };
      const sampleSenaryo2 = { voice: 'Algenib', style: 'pixar', genre: 'sci_fi' };

      expect(SmartDictionary.getVoiceKey(sampleSenaryo1.voice)).toBe('achird');
      expect(SmartDictionary.getStyleKey(sampleSenaryo1.style)).toBe('watercolor');
      expect(SmartDictionary.getGenreKey(sampleSenaryo1.genre)).toBe('tale');

      expect(SmartDictionary.getVoiceKey(sampleSenaryo2.voice)).toBe('algenib');
      expect(SmartDictionary.getStyleKey(sampleSenaryo2.style)).toBe('pixar');
      expect(SmartDictionary.getGenreKey(sampleSenaryo2.genre)).toBe('sci_fi');
    });
  });

  describe('🛡️ 2. ApiSlotBroker Kiralama ve İade Mekanizması', () => {
    it('Boştaki bir yuvayı başarıyla kiralamalıdır', async () => {
      const jobId = '11111111-1111-1111-1111-111111111111';
      const result = await MockApiSlotBroker.acquireSlot(jobId);

      expect(result.success).toBe(true);
      expect(result.slot).toBe('primary');

      // Veritabanı durumu güncellenmiş olmalıdır
      const primarySlot = SandboxDatabase.slots.find(s => s.slot_name === 'primary');
      expect(primarySlot?.status).toBe('busy');
      expect(primarySlot?.job_id).toBe(jobId);
    });

    it('Kiralanan yuvayı başarıyla iade edebilmelidir', async () => {
      const jobId = '22222222-2222-2222-2222-222222222222';
      
      // Kirala
      await MockApiSlotBroker.acquireSlot(jobId);
      
      // Serbest bırak
      const releaseResult = await MockApiSlotBroker.releaseSlot(jobId);
      expect(releaseResult).toBe(true);

      const primarySlot = SandboxDatabase.slots.find(s => s.slot_name === 'primary');
      expect(primarySlot?.status).toBe('idle');
      expect(primarySlot?.job_id).toBeNull();
    });
  });
});
