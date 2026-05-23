'use server'

import { createClient, createAdminClient } from '@/utils/supabase/server'
import { STORY_SCENARIOS } from '@/utils/scenarios'

const GENRE_TR_MAP: Record<string, string> = {
    'adventure': 'Macera',
    'sci_fi': 'Bilim Kurgu',
    'tale': 'Masal',
    'fantasy': 'Fantastik',
    'fable': 'Fabl'
};

const STYLE_TR_MAP: Record<string, string> = {
    'watercolor': 'Sulu Boya',
    'pixar': '3D Pixar Stili',
    'pastel': 'Pastel Düşler',
    'anime': 'Anime',
    'oil': 'Yağlı Boya',
    'pop_art': 'Pop Art',
    'cartoon': 'Çizgi Film',
    'retro': 'Vintage Retro'
};

const ENRICHED_STYLES: Record<string, string> = {
    watercolor: "Hand-painted watercolor illustration, soft wet-on-wet washes, paper texture, ethereal and dreamy",
    pixar: "3D animated feature film style, cinematic volumetric lighting, high-detail textures, big expressive eyes",
    pastel: "Soft chalk pastel drawing, muted powdery colors, hazy dreamlike atmosphere, gentle textures",
    anime: "Modern high-quality anime art style, vibrant cel-shading, detailed backgrounds, emotional cinematic lighting",
    oil: "Classic oil painting, thick impasto brushstrokes, rich canvas texture, dramatic chiaroscuro lighting",
    pop_art: "Vibrant pop art style, bold black outlines, halftone dot patterns, high-contrast CMYK colors",
    cartoon: "Hand-drawn 2D cartoon illustration, clean bold outlines, flat vibrant colors, playful and expressive",
    retro: "1970s vintage film aesthetic, faded colors, warm analog grain, soft vignette, nostalgic texture"
};

const GENRE_EN_MAP: Record<string, string> = {
    'adventure': 'Adventure',
    'sci_fi': 'Sci-Fi',
    'tale': 'Tale',
    'fantasy': 'Fantasy',
    'fable': 'Fable'
};

const STYLE_EN_MAP: Record<string, string> = {
    'watercolor': 'Watercolor',
    'pixar': '3D Pixar Style',
    'pastel': 'Pastel Dreams',
    'anime': 'Anime',
    'oil': 'Oil Painting',
    'pop_art': 'Pop Art',
    'cartoon': 'Cartoon',
    'retro': 'Vintage Retro'
};

export async function getScenariosCacheStatus() {
    const supabase = await createAdminClient()
    
    // 1. Get all completed shuffle jobs
    const { data: cachedJobs, error } = await supabase
        .from('generation_jobs')
        .select('payload')
        .eq('status', 'completed')

    if (error) {
        console.error('Error fetching cache status:', error)
        return { scenarios: [], metrics: { total: 0, full: 0, empty: 0 } }
    }

    const cachedThemes = new Set(cachedJobs?.map(job => (job.payload as any)?.theme).filter(Boolean))

    // 2. Process scenarios
    const processedScenarios = STORY_SCENARIOS.map((s, index) => {
        const chars = s.characters.join(', ')
        
        // Map keys to display names (for historical matching)
        const dbGenreTR = GENRE_TR_MAP[s.genre] || s.genre
        const dbStyleTR = STYLE_TR_MAP[s.style] || s.style
        
        const dbGenreEN = GENRE_EN_MAP[s.genre] || s.genre
        const dbStyleEN = STYLE_EN_MAP[s.style] || s.style

        const dbGenre = s.language === 'en' ? dbGenreEN : dbGenreTR;
        const richStyle = ENRICHED_STYLES[s.style] || s.style

        // --- MATCHING VARIATIONS ---

        // 1. New R&D Persona (v2 - 8181) - FIXED to match StoryForm.tsx exactly
        const rdTheme = s.language === 'en'
            ? `Act as a Professional Storyteller. Genre: ${dbGenre}. Topic: ${s.prompt}. Visual Style Instruction: ${richStyle}. Characters: ${chars}.`
            : `Profesyonel Masal Anlatıcısı (Storyteller) modunda yaz. Tür: ${dbGenre}. Konu: ${s.prompt}. Görsel Stil Talimatı: ${richStyle}. Karakterler: ${chars}.`

        // 2. Old i18n Format (v1 - 6161)
        const i18nTheme = s.language === 'en'
            ? `Write in English language. Style: ${dbGenreEN}. Topic: ${s.prompt}. Art Style: ${dbStyleEN}. Voice: ${s.voice}. Characters: ${chars}.`
            : `Turkish dilinde. ${dbGenreTR} tarzında. Konu: ${s.prompt}. Çizim Stili: ${dbStyleTR}. Ses Seçimi: ${s.voice}. Karakterler: ${chars}.`

        // 3. Original Legacy Format (Oldest)
        const legacyTheme = `${dbGenreTR} tarzında. Konu: ${s.prompt}. Çizim Stili: ${dbStyleTR}. Ses Seçimi: ${s.voice}. Karakterler: ${chars}.`
        
        // --- 🧪 ROBUST MATCHING LOGIC ---
        // A. Strict String Matching (Legacy support)
        const isCachedByString = cachedThemes.has(rdTheme) || cachedThemes.has(i18nTheme) || cachedThemes.has(legacyTheme);

        // B. Logical Metadata Matching (The "Surgical" Fix)
        // Matches by character names and prompt inclusion regardless of the persona wrapper
        const isCachedByLogic = cachedJobs?.some(job => {
            const p = job.payload as any;
            if (!p) return false;
            
            // Normalize characters for comparison (Sort and trim)
            const pChars = (p.hero || "").split(',').map((c: string) => c.trim()).sort().join(', ');
            const sChars = s.characters.map((c: string) => c.trim()).sort().join(', ');
            
            const heroMatch = pChars === sChars;
            
            // Normalize prompts for comparison (Remove punctuation and extra spaces)
            const normalize = (txt: string) => txt.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s+/g," ").trim();
            const promptMatch = p.theme ? normalize(p.theme).includes(normalize(s.prompt)) : false;
            
            const langMatch = (p.language || 'tr') === s.language;
            
            return heroMatch && promptMatch && langMatch;
        }) || false;

        const isCached = isCachedByString || isCachedByLogic;

        return {
            ...s,
            id: index,
            theme: rdTheme,
            isCached
        }
    })

    const total = processedScenarios.length
    const full = processedScenarios.filter(s => s.isCached).length
    const empty = total - full

    return {
        scenarios: processedScenarios,
        metrics: { total, full, empty }
    }
}

export async function checkJobStatus(jobId: string) {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('generation_jobs')
        .select('status, error_message, story_id')
        .eq('id', jobId)
        .single()

    if (error) return { status: 'error', error: error.message }
    return data
}
