/**
 * 🧠 AKILLI SÖZLÜK (HEURISTIC MATCHER) SERVİSİ
 * Bu servis, veritabanındaki dağınık, uzun veya eski verileri 
 * kullanıcı dostu temiz etiketlere dönüştürür.
 */

interface DictionaryRegistry {
  [key: string]: string[];
}

// 🎨 GÖRSEL STİL EŞLEŞTİRME REHBERİ
const STYLE_REGISTRY: DictionaryRegistry = {
  watercolor: ['watercolor', 'brushstrokes', 'aquarelle', 'soft painting'],
  pixar: ['pixar', '3d animated', 'cgi', 'disney style', 'volumetric lighting'],
  pastel: ['pastel', 'hazy atmosphere', 'chalk', 'soft dreamy'],
  anime: ['anime', 'cel-shading', 'japanese animation', 'manga'],
  oil: ['oil painting', 'impasto', 'canvas texture', 'classic painting'],
  pop_art: ['pop art', 'halftone', 'comic book', 'bold outlines'],
  cartoon: ['cartoon', 'clean vectors', 'flat colors', '2d animation'],
  retro: ['retro', 'vintage film', 'analog grain', 'nostalgic', '1970s']
};

// 🎙️ SES EŞLEŞTİRME REHBERİ (Eski isimleri teknik ID'lere bağlar)
const VOICE_REGISTRY: DictionaryRegistry = {
  achird: ['achird', 'bilge dede', 'wise grandpa'],
  algenib: ['algenib', 'gezgin tavşan', 'traveler rabbit'],
  algieba: ['algieba', 'cesur şövalye', 'brave knight'],
  alnilam: ['alnilam', 'yüce kral', 'grand king'],
  charon: ['charon', 'heyecanlı baba', 'excited dad'],
  iapetus: ['iapetus', 'orman muhafızı', 'forest guardian'],
  aoede: ['aoede', 'bilge anne', 'wise mother'],
  callirrhoe: ['callirrhoe', 'masalcı kadın', 'storyteller woman'],
  despina: ['despina', 'huzur perisi', 'serenity fairy'],
  fenrir: ['fenrir', 'sihirli peri', 'magic fairy'],
  gacrux: ['gacrux', 'gizemli prenses', 'mysterious princess'],
  kore: ['kore', 'gökkuşağı kızı', 'rainbow girl']
};

// 📖 TÜR EŞLEŞTİRME REHBERİ
const GENRE_REGISTRY: DictionaryRegistry = {
  tale: ['tale', 'masal'],
  adventure: ['adventure', 'macera'],
  fantasy: ['fantasy', 'fantastik'],
  sci_fi: ['sci_fi', 'bilim kurgu', 'science fiction'],
  fable: ['fable', 'fabl']
};

// ✨ EĞİTİCİ DEĞER EŞLEŞTİRME REHBERİ
const ED_VALUE_REGISTRY: DictionaryRegistry = {
  honesty: ['honesty', 'dürüstlük'],
  sharing: ['sharing', 'paylaşmak'],
  courage: ['courage', 'cesaret'],
  patience: ['patience', 'sabır'],
  responsibility: ['responsibility', 'sorumluluk'],
  nature_love: ['nature_love', 'doğa sevgisi']
};

// 🌍 DİL EŞLEŞTİRME REHBERİ
const LANG_REGISTRY: DictionaryRegistry = {
  tr: ['tr', 'turkish', 'türkçe'],
  en: ['en', 'english', 'ingilizce']
};

/**
 * Verilen ham metni (raw input) analiz eder ve Registry'deki karşılığını bulur.
 */
function findMatch(input: string, registry: DictionaryRegistry): string | null {
  if (!input) return null;
  const normalized = input.toLowerCase();

  for (const [key, keywords] of Object.entries(registry)) {
    // 1. Tam eşleşme kontrolü (En güvenli yol)
    if (normalized === key) return key;

    // 2. Akıllı anahtar kelime taraması (Long Prompt yakalayıcı)
    if (keywords.some(keyword => normalized.includes(keyword))) {
      return key;
    }
  }

  return null;
}

export const SmartDictionary = {
  /**
   * Stil bilgisini normalize eder.
   */
  getStyleKey: (rawStyle: string) => findMatch(rawStyle, STYLE_REGISTRY),

  /**
   * Ses bilgisini normalize eder.
   */
  getVoiceKey: (rawVoice: string) => findMatch(rawVoice, VOICE_REGISTRY),

  /**
   * Tür bilgisini normalize eder.
   */
  getGenreKey: (rawGenre: string) => findMatch(rawGenre, GENRE_REGISTRY),

  /**
   * Eğitici değer bilgisini normalize eder.
   */
  getEdValueKey: (rawEdValue: string) => findMatch(rawEdValue, ED_VALUE_REGISTRY),

  /**
   * Dil bilgisini normalize eder.
   */
  getLangKey: (rawLang: string) => findMatch(rawLang, LANG_REGISTRY)
};
