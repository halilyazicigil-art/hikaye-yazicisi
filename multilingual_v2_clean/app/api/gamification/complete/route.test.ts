import { describe, it, expect, vi, beforeEach } from 'vitest'
import { POST } from './route'
import { QuotaService } from '@/services/QuotaService'

// Mock Sentry
vi.mock('@sentry/nextjs', () => ({
  captureException: vi.fn(),
  init: vi.fn(),
}))

const mockSupabase = {
  auth: {
    getUser: vi.fn(),
  },
  from: vi.fn(),
  rpc: vi.fn(),
}

vi.mock('@/utils/supabase/server', () => {
  return {
    createClient: vi.fn(() => Promise.resolve(mockSupabase)),
    createAdminClient: vi.fn(() => Promise.resolve(mockSupabase)),
  }
})

vi.mock('@/services/QuotaService', () => {
  return {
    QuotaService: {
      getUserQuotaStats: vi.fn(),
    },
  }
})

describe('Gamification Completion API Route Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Default to a paid plan so standard tests bypass plan verification
    vi.mocked(QuotaService.getUserQuotaStats).mockResolvedValue({
      planId: 'pro',
      isPro: true,
      isPremium: false,
    } as any)
  })

  it('should return 401 Unauthorized if user session is not found', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: null }, error: new Error('No user') })

    const request = new Request('http://localhost/api/gamification/complete', {
      method: 'POST',
      body: JSON.stringify({
        storyId: '47d7d558-7c87-4b7b-9457-9d7a9b4cbb0a',
        source: 'library',
        secondsListened: 100,
        duration: 120,
      }),
    })

    const response = await POST(request)
    expect(response.status).toBe(401)
    const json = await response.json()
    expect(json.success).toBe(false)
    expect(json.error).toBe('Unauthorized')
  })

  it('should return 403 Forbidden if user is on the free plan', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: { id: 'user-id' } }, error: null })
    vi.mocked(QuotaService.getUserQuotaStats).mockResolvedValue({
      planId: 'free',
      isPro: false,
      isPremium: false,
    } as any)

    const request = new Request('http://localhost/api/gamification/complete', {
      method: 'POST',
      body: JSON.stringify({
        storyId: '47d7d558-7c87-4b7b-9457-9d7a9b4cbb0a',
        source: 'library',
        secondsListened: 100,
        duration: 120,
      }),
    })

    const response = await POST(request)
    expect(response.status).toBe(403)
    const json = await response.json()
    expect(json.success).toBe(false)
    expect(json.error).toBe('Forbidden')
    expect(json.message).toContain('abonelik satın al')
  })

  it('should return 400 Bad Request if params are invalid or missing', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: { id: 'user-id' } }, error: null })

    const testCases = [
      // invalid UUID
      { storyId: 'invalid-uuid', source: 'library', secondsListened: 100, duration: 120 },
      // invalid source
      { storyId: '47d7d558-7c87-4b7b-9457-9d7a9b4cbb0a', source: 'invalid-src', secondsListened: 100, duration: 120 },
      // negative secondsListened
      { storyId: '47d7d558-7c87-4b7b-9457-9d7a9b4cbb0a', source: 'library', secondsListened: -5, duration: 120 },
      // zero duration
      { storyId: '47d7d558-7c87-4b7b-9457-9d7a9b4cbb0a', source: 'library', secondsListened: 10, duration: 0 },
    ]

    for (const body of testCases) {
      const request = new Request('http://localhost/api/gamification/complete', {
        method: 'POST',
        body: JSON.stringify(body),
      })
      const response = await POST(request)
      expect(response.status).toBe(400)
      const json = await response.json()
      expect(json.success).toBe(false)
      expect(json.error).toBe('Bad Request')
    }
  })

  it('should trigger anti-cheat if listened time is less than 80%', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: { id: 'user-id' } }, error: null })

    const request = new Request('http://localhost/api/gamification/complete', {
      method: 'POST',
      body: JSON.stringify({
        storyId: '47d7d558-7c87-4b7b-9457-9d7a9b4cbb0a',
        source: 'library',
        secondsListened: 79, // less than 100 * 0.8 = 80
        duration: 100,
      }),
    })

    const response = await POST(request)
    expect(response.status).toBe(200)
    const json = await response.json()
    expect(json.success).toBe(false)
    expect(json.rewarded).toBe(false)
    expect(json.message).toContain('dinleme süresi tamamlanmadı')
  })

  it('should auto-create child profile if profile is missing and invoke complete_story_listen', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: { id: 'user-id' } }, error: null })
    
    // Mock profiles select returning null first, then insert returning the profile ID
    mockSupabase.from.mockImplementation((table) => {
      if (table === 'profiles') {
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          limit: vi.fn().mockReturnThis(),
          maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null }),
          insert: vi.fn().mockReturnThis(),
          single: vi.fn().mockResolvedValue({ data: { id: 'auto-created-profile-uuid' }, error: null }),
        }
      }
      return {}
    })

    // Mock RPC result
    const mockRpcResponse = {
      success: true,
      rewarded: true,
      reward_type: 'xp',
      xp_added: 50,
      pet_stats: { xp: 50, level: 1, stage: 'egg', level_up: false, evolved: false },
      newly_earned_badges: [],
    }
    mockSupabase.rpc.mockResolvedValue({ data: mockRpcResponse, error: null })

    const request = new Request('http://localhost/api/gamification/complete', {
      method: 'POST',
      body: JSON.stringify({
        storyId: '47d7d558-7c87-4b7b-9457-9d7a9b4cbb0a',
        source: 'library',
        secondsListened: 85, // 85% of 100
        duration: 100,
      }),
    })

    const response = await POST(request)
    expect(response.status).toBe(200)
    const json = await response.json()
    expect(json).toEqual(mockRpcResponse)

    // Verify exact RPC call arguments with the auto-created profile ID
    expect(mockSupabase.rpc).toHaveBeenCalledWith('complete_story_listen', {
      p_profile_id: 'auto-created-profile-uuid',
      p_story_id: '47d7d558-7c87-4b7b-9457-9d7a9b4cbb0a',
      p_source: 'library',
    })
  })

  it('should invoke complete_story_listen RPC on successful validation with existing profile', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: { id: 'user-id' } }, error: null })
    
    // Mock profiles table lookup
    mockSupabase.from.mockImplementation((table) => {
      if (table === 'profiles') {
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          limit: vi.fn().mockReturnThis(),
          maybeSingle: vi.fn().mockResolvedValue({ data: { id: 'child-profile-uuid' }, error: null }),
        }
      }
      return {}
    })

    // Mock RPC result
    const mockRpcResponse = {
      success: true,
      rewarded: true,
      reward_type: 'xp',
      xp_added: 50,
      pet_stats: { xp: 50, level: 1, stage: 'egg', level_up: false, evolved: false },
      newly_earned_badges: [],
    }
    mockSupabase.rpc.mockResolvedValue({ data: mockRpcResponse, error: null })

    const request = new Request('http://localhost/api/gamification/complete', {
      method: 'POST',
      body: JSON.stringify({
        storyId: '47d7d558-7c87-4b7b-9457-9d7a9b4cbb0a',
        source: 'library',
        secondsListened: 85, // 85% of 100
        duration: 100,
      }),
    })

    const response = await POST(request)
    expect(response.status).toBe(200)
    const json = await response.json()
    expect(json).toEqual(mockRpcResponse)

    // Verify exact RPC call arguments
    expect(mockSupabase.rpc).toHaveBeenCalledWith('complete_story_listen', {
      p_profile_id: 'child-profile-uuid',
      p_story_id: '47d7d558-7c87-4b7b-9457-9d7a9b4cbb0a',
      p_source: 'library',
    })
  })
})
