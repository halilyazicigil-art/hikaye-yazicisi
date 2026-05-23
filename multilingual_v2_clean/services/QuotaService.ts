import { SupabaseClient } from '@supabase/supabase-js'
import * as Sentry from "@sentry/nextjs";

export interface QuotaStats {
  shuffleUsed: number
  shuffleLimit: number
  manualUsed: number
  manualLimit: number
  audioUsed: number
  audioLimit: number
  shuffleAudioUsed: number
  totalUsed: number
  totalLimit: number

  podcastUsed: number
  podcastLimit: number
  shortStoryUsed: number
  shortStoryLimit: number
  continueUsed?: number
  continueLimit?: number
  isPro: boolean
  isPremium: boolean
  planId: string
  role: string
  bonusQuota: number
  isSuspended: boolean
}

/**
 * Uygulama genelindeki tüm kota ve abonelik hesaplamalarını tek bir merkezden yönetir.
 * Mevcut iş mantığında (StoryForm, backgroundStoryAction, ParentDashboard) herhangi bir
 * değişiklik yapılmadan kopyalanarak merkezileştirilmiştir.
 */
export class QuotaService {
  
  /**
   * Kullanıcının abonelik planına göre limitleri belirler
   */
  static getPlanLimits(planId: string | null, isExpired: boolean = false) {
    const isPremium = !isExpired && planId === 'premium'
    const isPro = !isExpired && planId === 'pro'
    const plan = isPremium ? 'premium' : (isPro ? 'pro' : 'free')

    return {
      isPremium,
      isPro,
      planId: plan,
      totalLimit: isPremium ? 80 : (isPro ? 40 : 3),
      shuffleLimit: isPremium ? 25 : (isPro ? 10 : 3),
      manualLimit: isPremium ? 55 : (isPro ? 30 : 0),
      audioLimit: isPremium ? 40 : (isPro ? 20 : 3),

      podcastLimit: isPremium ? 15 : (isPro ? 6 : 0),
      shortStoryLimit: isPremium ? 30 : (isPro ? 15 : 0)
    }
  }

  /**
   * Mevcut fatura döneminin başlangıç tarihini hesaplar
   */
  static calculateStartDate(currentPeriodEnd: string | null) {
    let startDate = new Date()
    if (currentPeriodEnd) {
      startDate = new Date(currentPeriodEnd)
      startDate.setMonth(startDate.getMonth() - 1)
    } else {
      startDate.setDate(1)
      startDate.setHours(0, 0, 0, 0)
    }
    return startDate
  }

  /**
   * Veritabanından kullanıcının tüm kullanım verilerini çeker ve hesaplar
   */
  static async getUserQuotaStats(supabase: SupabaseClient, userId: string): Promise<QuotaStats> {
    try {
      // 1. Abonelik bilgilerini çek
      const { data: sub } = await supabase
        .from('subscriptions')
        .select('plan_id, current_period_end')
        .eq('user_id', userId)
        .maybeSingle()

      const now = new Date()
      const isExpired = sub?.current_period_end ? new Date(sub.current_period_end) < now : true
      const limits = this.getPlanLimits(sub?.plan_id, isExpired)
      const startDate = this.calculateStartDate(sub?.current_period_end)

      // 2. Kullanım verilerini çek
      const [
        { count: totalUsed },
        { count: usedShuffle },
        { count: usedManual },
        { count: usedShuffleAudio },
        { count: usedManualAudio },
        { count: usedShortStory },

        { data: userData }
      ] = await Promise.all([
        supabase.from('stories').select('*', { count: 'exact', head: true }).eq('user_id', userId).gte('created_at', startDate.toISOString()),
        supabase.from('stories').select('*', { count: 'exact', head: true }).eq('user_id', userId).eq('is_shuffle', true).gte('created_at', startDate.toISOString()),
        supabase.from('stories').select('*', { count: 'exact', head: true }).eq('user_id', userId).eq('is_shuffle', false).or('metadata->>tab.neq.kisa,metadata->>tab.is.null').gte('created_at', startDate.toISOString()),
        supabase.from('stories').select('*', { count: 'exact', head: true }).eq('user_id', userId).eq('is_shuffle', true).not('audio_url', 'is', null).gte('created_at', startDate.toISOString()),
        supabase.from('stories').select('*', { count: 'exact', head: true }).eq('user_id', userId).eq('is_shuffle', false).not('audio_url', 'is', null).gte('created_at', startDate.toISOString()),
        supabase.from('stories').select('*', { count: 'exact', head: true }).eq('user_id', userId).eq('metadata->>tab', 'kisa').gte('created_at', startDate.toISOString()),

        supabase.from('users').select('podcast_downloads, role, bonus_quota, is_suspended').eq('id', userId).maybeSingle()
      ])

      const manualAudioLimit = limits.audioLimit - limits.shuffleLimit

      return {
        shuffleUsed: usedShuffle || 0,
        shuffleLimit: limits.shuffleLimit + (userData?.bonus_quota || 0),
        manualUsed: usedManual || 0,
        manualLimit: limits.manualLimit,
        audioUsed: usedManualAudio || 0,
        audioLimit: manualAudioLimit,
        shuffleAudioUsed: usedShuffleAudio || 0,
        totalUsed: totalUsed || 0,
        totalLimit: limits.totalLimit + (userData?.bonus_quota || 0),

        podcastUsed: userData?.podcast_downloads || 0,
        podcastLimit: limits.podcastLimit,
        shortStoryUsed: usedShortStory || 0,
        shortStoryLimit: limits.shortStoryLimit,
        isPro: limits.isPro,
        isPremium: limits.isPremium,
        planId: limits.planId,
        role: userData?.role || 'user',
        bonusQuota: userData?.bonus_quota || 0,
        isSuspended: userData?.is_suspended || false
      }
    } catch (error) {
      Sentry.captureException(error);
      
      // Lokal hata logu (Admin paneli için)
      try {
        const message = error instanceof Error ? error.message : String(error);
        await supabase.from('error_logs').insert({
          user_id: userId,
          error_message: message,
          location: 'QuotaService.getUserQuotaStats'
        });
      } catch (logErr) {
        // Loglama hatası sistemin ana akışını bozmamalı
      }

      // GÜVENLİ FALLBACK (Çökmeyi Engelleyen Varsayılan Değerler)
      return {
        shuffleUsed: 0,
        shuffleLimit: 3, // Ücretsiz paket varsayılanı
        manualUsed: 0,
        manualLimit: 0,
        audioUsed: 0,
        audioLimit: 0,
        shuffleAudioUsed: 0,
        totalUsed: 0,
        totalLimit: 3,

        podcastUsed: 0,
        podcastLimit: 0,
        shortStoryUsed: 0,
        shortStoryLimit: 0,
        isPro: false,
        isPremium: false,
        planId: 'free',
        role: 'user',
        bonusQuota: 0,
        isSuspended: false
      };
    }
  }

  /**
   * Belirli bir işlem bağlamı için kotanın uygunluğunu kontrol eder (Revize v2)
   */
  static validateQuota(stats: QuotaStats, context: { isShuffle?: boolean, isAudio?: boolean, tab?: string }): { success: boolean, message?: string } {
    // 1. Toplam Limit Kontrolü (Herkes için geçerli)
    if (stats.totalUsed >= stats.totalLimit) {
      return { success: false, message: `Aylık toplam hikaye limitinize ulaştınız (${stats.totalLimit}/${stats.totalLimit}).` };
    }

    // 2. Bağlama Özel Kontroller
    if (context.tab === 'kisa') {
      if (!stats.isPro && !stats.isPremium) {
        return { success: false, message: "Kısa Hikaye özelliği sadece Gümüş Gökyüzü ve Altın Güneş paketlerinde mevcuttur." };
      }
      if (stats.shortStoryUsed >= stats.shortStoryLimit) {
        return { success: false, message: `Aylık Kısa Hikaye limitinize ulaştınız (${stats.shortStoryLimit}/${stats.shortStoryLimit}).` };
      }
      if (context.isAudio && stats.audioUsed >= stats.audioLimit) {
        return { success: false, message: `Aylık özgün ses limitinize ulaştınız (${stats.audioLimit}/${stats.audioLimit}).` };
      }
    } else if (context.isShuffle) {
      // 🔄 TASLAK (SHUFFLE): Sadece taslak limitine bakılır, ses havuzu burada bloklamaz.
      if (stats.shuffleUsed >= stats.shuffleLimit) {
        return { success: false, message: `Aylık sihirli taslak (karıştır) limitinize ulaştınız (${stats.shuffleLimit}/${stats.shuffleLimit}).` };
      }
    } else {
      // 📝 ÖZGÜN: Mevcut disiplin korunur.
      if (!stats.isPro && !stats.isPremium) {
        return { success: false, message: "Kendi hikayenizi yazmak için lütfen abone olun." };
      }
      if (stats.manualUsed >= stats.manualLimit) {
        return { success: false, message: `Aylık özgün hikaye limitinize ulaştınız (${stats.manualLimit}/${stats.manualLimit}).` };
      }
      if (context.isAudio && stats.audioUsed >= stats.audioLimit) {
        return { success: false, message: `Aylık özgün ses limitinize ulaştınız (${stats.audioLimit}/${stats.audioLimit}).` };
      }
    }

    return { success: true };
  }
}
