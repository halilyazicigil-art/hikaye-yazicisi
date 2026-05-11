'use server'

import { createAdminClient } from '@/utils/supabase/server'

/**
 * Migration Script: Updates old story cache keys to the new multilingual format.
 * Format: "Turkish dilinde. [Existing Theme]"
 */
export async function migrateLegacyCacheKeys() {
    const supabase = await createAdminClient()
    
    // 1. Fetch all completed shuffle jobs that don't have the language prefix
    const { data: jobs, error } = await supabase
        .from('generation_jobs')
        .select('id, payload')
        .eq('status', 'completed')
        .eq('payload->>isShuffle', 'true')

    if (error) {
        return { success: false, error: error.message }
    }

    if (!jobs || jobs.length === 0) {
        return { success: true, message: 'No jobs found to migrate.', updatedCount: 0 }
    }

    let updatedCount = 0;
    const errors = [];

    for (const job of jobs) {
        const payload = job.payload as any;
        const currentTheme = payload.theme || '';
        
        // Skip if already has prefix
        if (currentTheme.startsWith('Turkish dilinde.') || currentTheme.startsWith('English dilinde.')) {
            continue;
        }

        // Apply new prefix (assuming all legacy stories were Turkish)
        const updatedTheme = `Turkish dilinde. ${currentTheme}`;
        const updatedPayload = { ...payload, theme: updatedTheme, language: 'tr' };

        const { error: updateErr } = await supabase
            .from('generation_jobs')
            .update({ payload: updatedPayload })
            .eq('id', job.id);

        if (updateErr) {
            errors.push(`Job ${job.id}: ${updateErr.message}`);
        } else {
            updatedCount++;
        }
    }

    return {
        success: errors.length === 0,
        updatedCount,
        errorCount: errors.length,
        errors: errors.slice(0, 5)
    };
}
