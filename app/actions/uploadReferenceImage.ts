'use server'

import { createAdminClient } from '@/utils/supabase/server'
import { v4 as uuidv4 } from 'uuid'

export async function uploadReferenceImage(formData: FormData) {
    const file = formData.get('file') as File;
    if (!file) return { success: false, error: 'Dosya bulunamadı' };

    const supabase = await createAdminClient();
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `ref_${uuidv4()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;

    const { error } = await supabase.storage.from('story_assets').upload(`references/${fileName}`, buffer, { contentType: file.type });
    if (error) return { success: false, error: error.message };

    const { data: { publicUrl } } = supabase.storage.from('story_assets').getPublicUrl(`references/${fileName}`);
    return { success: true, url: publicUrl };
}
