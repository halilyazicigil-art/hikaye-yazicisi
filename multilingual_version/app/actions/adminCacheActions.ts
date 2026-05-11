'use server'

import { createClient } from '@/utils/supabase/server'
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

export async function getScenariosCacheStatus() {
    const supabase = await createClient()
    
    // 1. Get all completed shuffle jobs
    const { data: cachedJobs, error } = await supabase
        .from('generation_jobs')
        .select('payload')
        .eq('status', 'completed')
        .eq('payload->>isShuffle', 'true')

    if (error) {
        console.error('Error fetching cache status:', error)
        return { scenarios: [], metrics: { total: 0, full: 0, empty: 0 } }
    }

    const cachedThemes = new Set(cachedJobs?.map(job => (job.payload as any)?.theme).filter(Boolean))

    // 2. Process scenarios
    const processedScenarios = STORY_SCENARIOS.map((s, index) => {
        const chars = s.characters.join(', ')
        
        // Reverse map keys to DB strings (Turkish)
        const dbGenre = GENRE_TR_MAP[s.genre] || s.genre
        const dbStyle = STYLE_TR_MAP[s.style] || s.style

        // Match exact format used in StoryForm.tsx handleGenerate
        // Note: We use the DB-friendly names (Turkish) for matching older records
        const theme = s.language === 'en'
            ? `Write in English language. Style: ${s.genre}. Topic: ${s.prompt}. Art Style: ${s.style}. Voice: ${s.voice}. Characters: ${chars}.`
            : `Turkish dilinde. ${dbGenre} tarzında. Konu: ${s.prompt}. Çizim Stili: ${dbStyle}. Ses Seçimi: ${s.voice}. Karakterler: ${chars}.`

        // Backward compatibility: Support for stories generated before the multilingual prefix was added
        const legacyTheme = `${dbGenre} tarzında. Konu: ${s.prompt}. Çizim Stili: ${dbStyle}. Ses Seçimi: ${s.voice}. Karakterler: ${chars}.`
        
        return {
            ...s,
            id: index,
            theme,
            isCached: cachedThemes.has(theme) || cachedThemes.has(legacyTheme)
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
