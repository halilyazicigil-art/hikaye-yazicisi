'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function incrementDownloadAction(storyId: string) {
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: 'Oturum açılmadı' };

    // 1. Mevcut kullanıcı verisini al
    const { data: userData, error: userError } = await supabase
        .from('users')
        .select('podcast_downloads')
        .eq('id', user.id)
        .single();

    if (userError) return { success: false, error: 'Kullanıcı verisi alınamadı' };

    // 2. Paket limitini al
    const { data: sub } = await supabase.from('subscriptions').select('plan_id').eq('user_id', user.id).maybeSingle();
    const planId = sub?.plan_id || 'free';
    
    const limits = {
        'free': 0,
        'pro': 6,
        'premium': 15
    };
    
    const limit = limits[planId as keyof typeof limits] || 0;
    const currentDownloads = userData.podcast_downloads || 0;

    if (currentDownloads >= limit) {
        return { 
            success: false, 
            error: `Podcast indirme limitinize ulaştınız (${currentDownloads}/${limit}). Lütfen paketinizi yükseltin.` 
        };
    }

    // 3. Sayacı artır
    const { error: updateError } = await supabase
        .from('users')
        .update({ podcast_downloads: currentDownloads + 1 })
        .eq('id', user.id);

    if (updateError) return { success: false, error: 'Limit güncellenemedi' };

    revalidatePath('/parent');
    revalidatePath(`/story/${storyId}`);
    
    return { success: true, newCount: currentDownloads + 1 };
}
