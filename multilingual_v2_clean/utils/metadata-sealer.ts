import { STORY_SCENARIOS } from './scenarios';
import { SmartDictionary } from './smart-dictionary';

/**
 * 🏛️ KUSURSUZ METADATA MÜHÜRLEYİCİ (MetadataSealer)
 * Akıllı Sözlük (SmartDictionary) yapısıyla %100 Uyumlu Kurumsal Versiyon.
 */
export class MetadataSealer {
    
    static seal(payload: any, storyData: any, masterUrl: string): any {
        // 1. Önce Akıllı Sözlükten (STORY_SCENARIOS) fuzzy eşleşme yapmayı dene
        const normalize = (txt: string) => txt.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s+/g," ").trim();
        const pChars = (payload.hero || "").split(',').map((c: string) => c.trim()).sort().join(', ');
        const searchTarget = normalize(payload.originalPrompt || payload.theme || "");

        const matchedScenario = STORY_SCENARIOS.find(s => {
            const sChars = s.characters.map((c: string) => c.trim()).sort().join(', ');
            const charMatch = normalize(pChars) === normalize(sChars);
            const promptMatch = searchTarget.includes(normalize(s.prompt)) || normalize(s.prompt).includes(searchTarget);
            const langMatch = (payload.language || 'tr').toLowerCase().startsWith(s.language.toLowerCase());
            return charMatch && promptMatch && langMatch;
        });

        // 2. SmartDictionary Helper'larını Kullanarak Temiz Mührü Çıkar
        const rawGenre = matchedScenario?.genre || payload.genre || payload.metadata?.genre || 'adventure';
        const finalGenre = SmartDictionary.getGenreKey(rawGenre) || 'adventure';

        const rawStyle = matchedScenario?.style || payload.style || payload.metadata?.style || 'watercolor';
        const finalStyle = SmartDictionary.getStyleKey(rawStyle) || 'watercolor';

        const rawVoice = matchedScenario?.voice || payload.elevenVoiceId || payload.metadata?.voice_name || 'Aoede';
        const finalVoice = SmartDictionary.getVoiceKey(rawVoice) || 'aoede';

        const rawLang = matchedScenario?.language || payload.language || payload.metadata?.language || 'tr';
        const finalLang = SmartDictionary.getLangKey(rawLang) || 'tr';

        const rawAge = matchedScenario?.age || payload.metadata?.age_group || payload.age || '4-6';
        const finalAge = rawAge.replace(/[^0-9-]/g, ''); // "4-6 Yaş" -> "4-6"

        return {
            genre: finalGenre,
            style: finalStyle,
            age_group: finalAge,
            language: finalLang,
            voice_name: finalVoice,
            tab: payload.tab || null,
            
            // Sistem Alanları (Referans Görseller & Karakterler)
            master_image_url: masterUrl,
            master_ref_story_id: payload.master_ref_story_id || null,
            characters: Object.keys(storyData.characters || {})
        };
    }
}
