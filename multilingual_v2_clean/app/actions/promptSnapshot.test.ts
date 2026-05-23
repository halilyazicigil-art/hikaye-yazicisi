import { describe, it, expect } from 'vitest';
import { buildSystemPrompt, buildStoryThemePrompt } from '../../constants/prompts';

describe('Prompt Snapshot Tests', () => {
  it('should generate EXACTLY the same System Prompt as the original', () => {
    const theme = "Uzay macerası";
    const age = "4-6 Yaş";

    const newPrompt = buildSystemPrompt(theme, age);

    // Orijinal koddan birebir kopyalanan yapı (boşlukları dahil)
    const originalPrompt = `
                GÖREV: Bir çocuk hikayesi yaz.
                DİL: Türkçe.
                ÇIKTI: JSON formatında olmalı.

                İÇERİK KURALLARI:
                1. 'title': Hikayenin başlığı.
                2. 'characters': Hikayedeki karakterlerin sözlüğü. { "İsim": "Çok detaylı fiziksel tarif, kıyafet, saç rengi" } formatında. (Görsel süreklilik için kritik).
                3. 'scenes': ZORUNLU OLARAK TAM 12 SAHNE ÜRETİLECEK. Her sahne şunları içermeli:
                   - 'text': Çocuğun okuyacağı masal metni (Türkçe).
                   - 'active_characters': Bu sahnede fiziksel olarak bulunan karakter isimlerinin listesi (Örn: ["Ali", "Canan"]).
                   - 'camera_angle': Sahneye uygun sinematik bakış açısı (Örn: 'Close-up', 'Wide-angle', 'Side-view').
                   - 'lighting': Sahneye uygun ışıklandırma (Örn: 'Golden hour', 'Moonlight', 'Bright sun').
                   - 'visualHook': BU SAHNE İÇİN GÖRSEL MOTORUNA GİDECEK KESİN TALİMAT (İngilizce). 
                     KURALLAR: 'Subject-Verb-Object' yapısını kullan. Sadece 'active_characters' listesindeki isimleri kullan. 
                     Aksiyonu ve ortamı net betimle.
                
                KULLANICI PROMPT'U: ${theme}
                HEDEF YAŞ: ${age}
            `;

    expect(newPrompt).toBe(originalPrompt);
  });

  it('should generate EXACTLY the same Story Theme Prompt (TR)', () => {
    const isTR = true;
    const displayGenre = "Masal";
    const prompt = "Uzay macerası";
    const richStyle = "Sulu Boya";
    const chars = "Ali, Ayşe";
    const egitici = " Eğitici Değer: Paylaşmak.";
    const continuationContext = "";

    const newPrompt = buildStoryThemePrompt(isTR, displayGenre, prompt, richStyle, chars, egitici, continuationContext);

    const originalPrompt = `Profesyonel Masal Anlatıcısı (Storyteller) modunda yaz. Tür: ${displayGenre}. Konu: ${prompt}. Görsel Stil Talimatı: ${richStyle}. Karakterler: ${chars}.${egitici}${continuationContext}`;

    expect(newPrompt).toBe(originalPrompt);
  });

  it('should generate EXACTLY the same Story Theme Prompt (EN)', () => {
    const isTR = false;
    const displayGenre = "Fable";
    const prompt = "Space adventure";
    const richStyle = "Watercolor";
    const chars = "Ali, Ayşe";
    const egitici = " Educational Value: Sharing.";
    const continuationContext = " (Continuation)";

    const newPrompt = buildStoryThemePrompt(isTR, displayGenre, prompt, richStyle, chars, egitici, continuationContext);

    const originalPrompt = `Act as a Professional Storyteller. Genre: ${displayGenre}. Topic: ${prompt}. Visual Style Instruction: ${richStyle}. Characters: ${chars}.${egitici}${continuationContext}`;

    expect(newPrompt).toBe(originalPrompt);
  });
});
