import { describe, it, expect, vi, beforeEach } from 'vitest'
import { backgroundStoryAction } from '@/app/actions/backgroundStoryAction'
import { QuotaService } from '@/services/QuotaService'

// Mock Sentry
vi.mock('@sentry/nextjs', () => ({
  captureException: vi.fn(),
  init: vi.fn(),
}))

vi.mock('@/utils/supabase/server', () => {
  const mockSupabase = {
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: { id: 'test-user' } } })
    },
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      not: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      gte: vi.fn().mockReturnThis(),
      in: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({ 
        data: { plan_id: 'pro', current_period_end: '2099-01-01T00:00:00.000Z' } 
      }),
      insert: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: { id: 'mock-job-id' }, error: null })
    })
  };
  return {
    createClient: vi.fn(() => mockSupabase),
    createAdminClient: vi.fn(() => mockSupabase)
  };
})

// Mock QuotaService
vi.mock('@/services/QuotaService', () => ({
  QuotaService: {
    getUserQuotaStats: vi.fn(),
    getPlanLimits: vi.fn().mockImplementation((planId, isExpired) => {
      const isPremium = !isExpired && planId === 'premium'
      const isPro = !isExpired && planId === 'pro'
      return {
        isPremium,
        isPro,
        totalLimit: isPremium ? 80 : (isPro ? 40 : 3),
        shuffleLimit: isPremium ? 25 : (isPro ? 10 : 3),
        manualLimit: isPremium ? 55 : (isPro ? 30 : 0),
        audioLimit: isPremium ? 40 : (isPro ? 20 : 3),
        continueLimit: isPremium ? 25 : (isPro ? 10 : 0)
      }
    }),
    validateQuota: vi.fn().mockImplementation((stats, context) => {
      if (stats.totalUsed >= stats.totalLimit) {
        return { success: false, message: `Aylık toplam hikaye limitinize ulaştınız (${stats.totalLimit}/${stats.totalLimit}).` };
      }
      if (context.isShuffle) {
        if (stats.shuffleUsed >= stats.shuffleLimit) {
          return { success: false, message: `Aylık sihirli taslak (karıştır) limitinize ulaştınız (${stats.shuffleLimit}/${stats.shuffleLimit}).` };
        }
      } else {
        if (!stats.isPro && !stats.isPremium) {
          return { success: false, message: "Pamuk Bulut paketi ile sadece sihirli taslakları kullanabilirsiniz." };
        }
        if (stats.manualUsed >= stats.manualLimit) {
          return { success: false, message: `Aylık özgün hikaye limitinize ulaştınız (${stats.manualLimit}/${stats.manualLimit}).` };
        }
      }
      return { success: true };
    })
  }
}))

describe('backgroundStoryAction Integration Tests', () => {
  const mockFormData = {
    hero: 'Test Hero',
    theme: 'Test Theme',
    voiceOption: 'AI',
    childName: 'Test Child',
    age: '2-4',
    style: 'Cartoon',
    isShuffle: false
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should throw error when total quota is reached (Quota Guard)', async () => {
    (QuotaService.getUserQuotaStats as any).mockResolvedValue({
      shuffleUsed: 0, shuffleLimit: 10, manualUsed: 0, manualLimit: 30,
      audioUsed: 0, audioLimit: 20, shuffleAudioUsed: 0,
      totalUsed: 40, totalLimit: 40, continueUsed: 0, continueLimit: 10,
      podcastUsed: 0, podcastLimit: 6, isPro: true, isPremium: false,
      planId: 'pro', role: 'admin', bonusQuota: 0, isSuspended: false
    })

    const result = await backgroundStoryAction(mockFormData)
    expect(result.success).toBe(false)
    expect(result.error).toContain('limitinize ulaştınız')
  })

  it('should prevent manual stories for free users (Plan Authorization)', async () => {
    (QuotaService.getUserQuotaStats as any).mockResolvedValue({
      shuffleUsed: 0, shuffleLimit: 3, manualUsed: 0, manualLimit: 0,
      audioUsed: 0, audioLimit: 3, shuffleAudioUsed: 0,
      totalUsed: 0, totalLimit: 3, continueUsed: 0, continueLimit: 0,
      podcastUsed: 0, podcastLimit: 0, isPro: false, isPremium: false,
      planId: 'free', role: 'user', bonusQuota: 0, isSuspended: false
    })

    const result = await backgroundStoryAction({ ...mockFormData, isShuffle: false })
    expect(result.success).toBe(false)
    expect(result.error).toContain('Pamuk Bulut paketi ile sadece sihirli taslakları')
  })

  it('should return jobId when quota is available (Success Case)', async () => {
    (QuotaService.getUserQuotaStats as any).mockResolvedValue({
      shuffleUsed: 1, shuffleLimit: 10, manualUsed: 2, manualLimit: 30,
      audioUsed: 1, audioLimit: 20, shuffleAudioUsed: 0,
      totalUsed: 5, totalLimit: 40, continueUsed: 0, continueLimit: 10,
      podcastUsed: 0, podcastLimit: 6, isPro: true, isPremium: false,
      planId: 'pro', role: 'user', bonusQuota: 0, isSuspended: false
    })

    // Mock fetch for worker trigger
    global.fetch = vi.fn().mockResolvedValue({ ok: true })

    const result = await backgroundStoryAction(mockFormData)
    console.log("TEST RESULT ERROR:", result.error)
    
    expect(result.success).toBe(true)
    expect(result.jobId).toBe('mock-job-id')
  })
})
