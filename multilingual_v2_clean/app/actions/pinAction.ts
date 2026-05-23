'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function togglePinAction(storyId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: 'Oturum açılmadı' };

    // 1. Mevcut durumu al
    const { data: story } = await supabase.from('stories').select('is_pinned').eq('id', storyId).eq('user_id', user.id).single();
    if (!story) return { success: false, error: 'Hikaye bulunamadı veya yetkiniz yok.' };

    const newStatus = !story.is_pinned;

    // 2. Paket limitini kontrol et
    const { data: sub } = await supabase.from('subscriptions').select('plan_id').eq('user_id', user.id).maybeSingle();
    const isPremium = sub?.plan_id === 'premium';
    const isPro = sub?.plan_id === 'pro';
    const pinLimit = isPremium ? 10 : (isPro ? 5 : 0);

    if (newStatus) {
        if (pinLimit === 0) {
            return { success: false, error: 'Kahraman Hafızası özelliği sadece Gümüş ve Altın paketlerde mevcuttur.' };
        }

        const { count } = await supabase.from('stories')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id)
            .eq('is_pinned', true);
        
        if (count && count >= pinLimit) {
            return { success: false, error: `${isPremium ? 'Altın Güneş' : 'Gümüş Gökyüzü'} paket limitin olan ${pinLimit} masal sınırına ulaştın. Önce birini kaldırmalısın.` };
        }
    }

    // 3. Güncelle
    const { error: updateError } = await supabase
        .from('stories')
        .update({ is_pinned: newStatus })
        .eq('id', storyId)
        .eq('user_id', user.id);

    if (updateError) {
        return { success: false, error: `Veritabanı: ${updateError.message}` };
    }

    revalidatePath('/parent');
    revalidatePath('/library');
    revalidatePath('/');
    
    return { success: true, isPinned: newStatus };

    revalidatePath('/parent');
    revalidatePath('/library');
    revalidatePath('/');
    
    return { success: true, isPinned: newStatus };
}
