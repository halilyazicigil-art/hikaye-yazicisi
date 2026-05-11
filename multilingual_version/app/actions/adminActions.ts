'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { QuotaService } from '@/services/QuotaService'

/**
 * Admin Yetki Kontrolü (Güvenlik Katmanı)
 */
async function checkAdmin(supabase: any) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Oturum açılmadı.')
  
  const quota = await QuotaService.getUserQuotaStats(supabase, user.id)
  if (quota.role !== 'admin') throw new Error('Bu işlem için admin yetkisi gerekiyor.')
  
  return user
}

/**
 * Kullanıcıya Bonus Kota Ekle
 */
export async function addBonusQuotaAction(userId: string, amount: number) {
  const supabase = await createClient()
  try {
    await checkAdmin(supabase)
    
    // Mevcut bonus_quota değerini al ve üzerine ekle
    const { data: user } = await supabase.from('users').select('bonus_quota').eq('id', userId).single()
    const currentBonus = user?.bonus_quota || 0
    
    const { error } = await supabase
      .from('users')
      .update({ bonus_quota: currentBonus + amount })
      .eq('id', userId)
    
    if (error) throw error
    revalidatePath('/admin')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

/**
 * Kullanıcı Hesabını Askıya Al / Aktif Et
 */
export async function toggleUserSuspensionAction(userId: string, currentStatus: boolean) {
  const supabase = await createClient()
  try {
    await checkAdmin(supabase)
    
    const { error } = await supabase
      .from('users')
      .update({ is_suspended: !currentStatus })
      .eq('id', userId)
    
    if (error) throw error
    revalidatePath('/admin')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

/**
 * Sistem Şalterini Değiştir
 */
export async function toggleSystemSettingAction(field: 'maintenance_mode' | 'voice_cloning_enabled', currentValue: boolean) {
  const supabase = await createClient()
  try {
    await checkAdmin(supabase)
    const { error } = await supabase
      .from('system_settings')
      .update({ [field]: currentValue, updated_at: new Date().toISOString() })
      .eq('id', 1)
    
    if (error) throw error
    revalidatePath('/admin')
    revalidatePath('/') 
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}
