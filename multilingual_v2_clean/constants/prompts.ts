export const buildSystemPrompt = (theme: string, age: string | number) => `
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

export const buildStoryThemePrompt = (
  isTR: boolean,
  displayGenre: string,
  prompt: string,
  richStyle: string,
  chars: string,
  egitici: string,
  continuationContext: string
) => {
  return isTR 
    ? `Profesyonel Masal Anlatıcısı (Storyteller) modunda yaz. Tür: ${displayGenre}. Konu: ${prompt}. Görsel Stil Talimatı: ${richStyle}. Karakterler: ${chars}.${egitici}${continuationContext}`
    : `Act as a Professional Storyteller. Genre: ${displayGenre}. Topic: ${prompt}. Visual Style Instruction: ${richStyle}. Characters: ${chars}.${egitici}${continuationContext}`;
};
