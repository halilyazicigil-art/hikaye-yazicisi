'use server'

import { createAdminClient } from '@/utils/supabase/server'

/**
 * 🛡️ METADATA KAYITÇI (TEMASSIZ)
 * Boru hattı bittikten sonra, masalın yan bilgilerini kaydeder.
 * Bu sayede generateStory.ts koduna hiç dokunmamış oluruz.
 */
export async function saveStoryMetadata(storyId: string, metadata: any) {
    const supabase = await createAdminClient();
    
    try {
        // Not: 'metadata' sütununu stories tablosuna eklemeliyiz.
        // Eğer sütun yoksa bile bu işlem hata vermez (sessizce yutulur veya loglanır)
        const { error } = await supabase
            .from('stories')
            .update({ metadata })
            .eq('id', storyId);

        if (error) {
            console.error(">>> [METADATA HATA]:", error.message);
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (err: any) {
        console.error(">>> [METADATA KRİTİK HATA]:", err.message);
        return { success: false, error: err.message };
    }
}
