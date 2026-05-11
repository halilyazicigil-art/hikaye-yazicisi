import { describe, it, expect, vi, beforeEach } from 'vitest'
import { backgroundStoryAction } from '../../../app/actions/backgroundStoryAction'
import { QuotaService } from '../../services/QuotaService'

// Mock Sentry
vi.mock('@sentry/nextjs', () => ({
  captureException: vi.fn(),
  init: vi.fn(),
}))

// Mock Supabase
vi.mock('@/utils/supabase/server', () => ({
  createClient: vi.fn(() => ({
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: { id: 'test-user' } } })
    },
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      not: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({ data: null }),
      insert: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: { id: 'mock-job-id' }, error: null })
    })
  }))
}))

// Mock QuotaService
vi.mock('../../services/QuotaService', () => ({
  QuotaService: {
    getUserQuotaStats: vi.fn()
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
    // Mock quota reached
    (QuotaService.getUserQuotaStats as any).mockResolvedValue({
      totalUsed: 10,
      totalLimit: 10,
      isPro: true,
      isPremium: false,
      role: 'admin'
    })

    const result = await backgroundStoryAction(mockFormData)
    
    expect(result.success).toBe(false)
    expect(result.error).toContain('limitinize ulaştınız')
  })

  it('should prevent manual stories for free users (Plan Authorization)', async () => {
    // Mock free user
    (QuotaService.getUserQuotaStats as any).mockResolvedValue({
      totalUsed: 0,
      totalLimit: 3,
      isPro: false,
      isPremium: false,
      manualUsed: 0,
      manualLimit: 0,
      role: 'user'
    })

    const result = await backgroundStoryAction({ ...mockFormData, isShuffle: false })
    
    expect(result.success).toBe(false)
    expect(result.error).toContain('Pamuk Bulut paketi ile sadece sihirli taslakları')
  })

  it('should return jobId when quota is available (Success Case)', async () => {
    // Mock available quota
    (QuotaService.getUserQuotaStats as any).mockResolvedValue({
      totalUsed: 5,
      totalLimit: 40,
      isPro: true,
      isPremium: false,
      manualUsed: 2,
      manualLimit: 30,
      audioUsed: 1,
      audioLimit: 20,
      role: 'pro'
    })

    // Mock fetch for worker trigger
    global.fetch = vi.fn().mockResolvedValue({ ok: true })

    const result = await backgroundStoryAction(mockFormData)
    
    expect(result.success).toBe(true)
    expect(result.jobId).toBe('mock-job-id')
  })
})
