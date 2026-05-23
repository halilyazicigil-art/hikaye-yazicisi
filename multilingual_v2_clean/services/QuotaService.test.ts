import { describe, it, expect, vi } from 'vitest'
import { QuotaService } from './QuotaService'

describe('QuotaService Unit Tests', () => {
  
  describe('Plan Validation (getPlanLimits)', () => {
    it('should correctly identify free plan', () => {
      const limits = QuotaService.getPlanLimits(null)
      expect(limits.planId).toBe('free')
      expect(limits.totalLimit).toBe(3)
      expect(limits.isPro).toBe(false)
      expect(limits.isPremium).toBe(false)
    })

    it('should correctly identify pro plan', () => {
      const limits = QuotaService.getPlanLimits('pro')
      expect(limits.planId).toBe('pro')
      expect(limits.totalLimit).toBe(40)
      expect(limits.isPro).toBe(true)
    })

    it('should correctly identify premium plan', () => {
      const limits = QuotaService.getPlanLimits('premium')
      expect(limits.planId).toBe('premium')
      expect(limits.totalLimit).toBe(80)
      expect(limits.isPremium).toBe(true)
    })
  })

  describe('Expiration Logic', () => {
    it('should force free limits when plan is expired', () => {
      const limits = QuotaService.getPlanLimits('premium', true)
      expect(limits.planId).toBe('free')
      expect(limits.totalLimit).toBe(3)
      expect(limits.isPremium).toBe(false)
    })
  })

  describe('Date Calculation (calculateStartDate)', () => {
    it('should default to the first of the month when no sub date is provided', () => {
      const date = QuotaService.calculateStartDate(null)
      expect(date.getDate()).toBe(1)
      expect(date.getHours()).toBe(0)
    })

    it('should calculate one month prior for subscription cycles', () => {
      const cycleEnd = '2026-05-20T12:00:00Z'
      const startDate = QuotaService.calculateStartDate(cycleEnd)
      // May 20 -> April 20
      expect(startDate.getMonth()).toBe(3) // 0-indexed April
      expect(startDate.getDate()).toBe(20)
    })
  })

  describe('Resilience & Fallback (getUserQuotaStats)', () => {
    it('should return safe default values when supabase throws an error', async () => {
      // Mock Supabase with a failing query
      const mockSupabase = {
        from: vi.fn().mockImplementation(() => ({
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          maybeSingle: vi.fn().mockRejectedValue(new Error('Simulated Database Failure')),
          gte: vi.fn().mockReturnThis(),
          not: vi.fn().mockReturnThis()
        }))
      } as any

      const stats = await QuotaService.getUserQuotaStats(mockSupabase, 'test-user-id')
      
      // Verification
      expect(stats).toBeDefined()
      expect(stats.planId).toBe('free')
      expect(stats.totalLimit).toBe(3)
      expect(stats.shuffleUsed).toBe(0)
      // Must not crash
    })
  })
})
