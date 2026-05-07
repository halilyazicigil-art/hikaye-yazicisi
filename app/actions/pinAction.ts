'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function togglePinAction(storyId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: 'Oturum açılmadı' };

    // 1. Mevcut durumu al
    const { data: story } = await supabase.from('stories').select('is_pinned').eq('id', storyId).single();
    if (!story) return { success: false, error: 'Hikaye bulunamadı' };

    const newStatus = !story.is_pinned;

    // 2. Eğer pinlenecekse limit kontrolü yap
    if (newStatus) {
        const { count } = await supabase.from('stories')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id)
            .eq('is_pinned', true);
        
        if (count && count >= 5) {
            return { success: false, error: 'En fazla 5 hikaye sabitleyebilirsiniz. Lütfen önce birini kaldırın.' };
        }
    }

    // 3. Güncelle
    const { error } = await supabase.from('stories').update({ is_pinned: newStatus }).eq('id', storyId);
    if (error) return { success: false, error: error.message };

    revalidatePath('/parent');
    revalidatePath('/library');
    revalidatePath('/');
    
    return { success: true, isPinned: newStatus };
}
