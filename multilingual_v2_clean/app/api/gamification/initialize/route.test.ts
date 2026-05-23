import { describe, it, expect, vi, beforeEach } from 'vitest'
import { POST } from './route'
import { QuotaService } from '@/services/QuotaService'

const mockSupabase = {
  auth: {
    getUser: vi.fn(),
  },
  from: vi.fn(),
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

describe('Gamification Initialize API Route Tests', () => {
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

    const request = new Request('http://localhost/api/gamification/initialize', {
      method: 'POST',
      body: JSON.stringify({
        petType: 'dragon',
        petName: 'Alev',
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

    const request = new Request('http://localhost/api/gamification/initialize', {
      method: 'POST',
      body: JSON.stringify({
        petType: 'dragon',
        petName: 'Alev',
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
      // missing fields
      {},
      // invalid petType
      { petType: 'invalid-type', petName: 'Alev' },
      // empty petName
      { petType: 'dragon', petName: '' },
      // space-only petName
      { petType: 'pegasus', petName: '   ' },
      // too long petName
      { petType: 'dragon', petName: 'Alev'.repeat(10) },
    ]

    for (const body of testCases) {
      const request = new Request('http://localhost/api/gamification/initialize', {
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

  it('should auto-create profile and insert new pet if profile is missing', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: { id: 'user-id' } }, error: null })
    
    const mockNewPet = { profile_id: 'auto-profile-uuid', pet_type: 'dragon', pet_name: 'Alev', xp: 0, level: 1, stage: 'egg' }

    mockSupabase.from.mockImplementation((table) => {
      if (table === 'profiles') {
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          limit: vi.fn().mockReturnThis(),
          maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null }),
          insert: vi.fn().mockReturnThis(),
          single: vi.fn().mockResolvedValue({ data: { id: 'auto-profile-uuid' }, error: null }),
        }
      }
      if (table === 'profile_pets') {
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null }),
          insert: vi.fn().mockReturnThis(),
          single: vi.fn().mockResolvedValue({ data: mockNewPet, error: null }),
        }
      }
      return {}
    })

    const request = new Request('http://localhost/api/gamification/initialize', {
      method: 'POST',
      body: JSON.stringify({
        petType: 'dragon',
        petName: 'Alev',
      }),
    })

    const response = await POST(request)
    expect(response.status).toBe(200)
    const json = await response.json()
    expect(json.success).toBe(true)
    expect(json.pet.pet_type).toBe('dragon')
    expect(json.pet.pet_name).toBe('Alev')
  })

  it('should update profile_pets if an existing record is found', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: { id: 'user-id' } }, error: null })

    const mockProfile = { id: 'child-profile-uuid' }
    const mockExistingPet = { profile_id: 'child-profile-uuid', pet_type: null, pet_name: null, xp: 50, level: 2, stage: 'baby' }
    const mockUpdatedPet = { profile_id: 'child-profile-uuid', pet_type: 'dragon', pet_name: 'Alev', xp: 50, level: 2, stage: 'baby' }

    mockSupabase.from.mockImplementation((table) => {
      if (table === 'profiles') {
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          limit: vi.fn().mockReturnThis(),
          maybeSingle: vi.fn().mockResolvedValue({ data: mockProfile, error: null }),
        }
      }
      if (table === 'profile_pets') {
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          maybeSingle: vi.fn().mockResolvedValue({ data: mockExistingPet, error: null }),
          update: vi.fn().mockReturnThis(),
          single: vi.fn().mockResolvedValue({ data: mockUpdatedPet, error: null }),
        }
      }
      return {}
    })

    const request = new Request('http://localhost/api/gamification/initialize', {
      method: 'POST',
      body: JSON.stringify({
        petType: 'dragon',
        petName: 'Alev',
      }),
    })

    const response = await POST(request)
    expect(response.status).toBe(200)
    const json = await response.json()
    expect(json.success).toBe(true)
    expect(json.pet.pet_type).toBe('dragon')
    expect(json.pet.pet_name).toBe('Alev')
    expect(json.pet.xp).toBe(50) // preserved
  })

  it('should insert new record in profile_pets if no existing pet is found', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: { id: 'user-id' } }, error: null })

    const mockProfile = { id: 'child-profile-uuid' }
    const mockNewPet = { profile_id: 'child-profile-uuid', pet_type: 'pegasus', pet_name: 'Luna', xp: 0, level: 1, stage: 'egg' }

    mockSupabase.from.mockImplementation((table) => {
      if (table === 'profiles') {
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          limit: vi.fn().mockReturnThis(),
          maybeSingle: vi.fn().mockResolvedValue({ data: mockProfile, error: null }),
        }
      }
      if (table === 'profile_pets') {
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null }),
          insert: vi.fn().mockReturnThis(),
          single: vi.fn().mockResolvedValue({ data: mockNewPet, error: null }),
        }
      }
      return {}
    })

    const request = new Request('http://localhost/api/gamification/initialize', {
      method: 'POST',
      body: JSON.stringify({
        petType: 'pegasus',
        petName: '  Luna  ', // test trimming
      }),
    })

    const response = await POST(request)
    expect(response.status).toBe(200)
    const json = await response.json()
    expect(json.success).toBe(true)
    expect(json.pet.pet_type).toBe('pegasus')
    expect(json.pet.pet_name).toBe('Luna')
    expect(json.pet.xp).toBe(0)
  })
})
