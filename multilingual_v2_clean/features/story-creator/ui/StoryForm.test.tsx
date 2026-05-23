import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import StoryForm from './StoryForm'
import { QuotaService } from '@/services/QuotaService'
import React from 'react'

// Mocking Context & Next.js
vi.mock('@/context/LanguageContext', () => ({
  useLanguage: () => ({
    t: (key: string) => key,
    language: 'tr'
  })
}))

vi.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: vi.fn()
  })
}))

vi.mock('@/utils/supabase/client', () => ({
  createClient: () => ({
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: { id: 'test-user' } } })
    },
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      in: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({ data: null }),
      single: vi.fn().mockResolvedValue({ data: null }),
    }),
    channel: vi.fn().mockReturnValue({
      on: vi.fn().mockReturnThis(),
      subscribe: vi.fn().mockReturnThis()
    }),
    removeChannel: vi.fn()
  })
}))

vi.mock('@/services/QuotaService', () => ({
  QuotaService: {
    getUserQuotaStats: vi.fn()
  }
}))

describe('StoryForm Frontend Logic Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should display correct remaining quota (Dynamic Limit Calculation)', async () => {
    // Mock quota: 10 limit, 7 used -> 3 remaining
    (QuotaService.getUserQuotaStats as any).mockResolvedValue({
      totalUsed: 7,
      totalLimit: 10,
      shuffleUsed: 2,
      shuffleLimit: 5,
      manualUsed: 5,
      manualLimit: 5,
      audioUsed: 1,
      audioLimit: 5,
      role: 'user'
    })

    render(<StoryForm />)

    await waitFor(() => {
      // "3" değerinin ekranda (Toplam Kalan alanında) göründüğünü doğrula
      const remainingElements = screen.getAllByText('3')
      expect(remainingElements.length).toBeGreaterThan(0)
    })
  })

  it('should show 0 instead of NaN when quotaStats is null (Anti-NaN Check)', async () => {
    // QuotaService'den veri dönmediği senaryo
    (QuotaService.getUserQuotaStats as any).mockResolvedValue(null)

    render(<StoryForm />)

    // NaN kelimesinin ekranda geçmediğini doğrula
    await waitFor(() => {
      const bodyText = document.body.textContent
      expect(bodyText).not.toContain('NaN')
    })
  })

  it('should disable the submit button when quota is full (Lock Mechanism)', async () => {
    // Kota tamamen dolu
    (QuotaService.getUserQuotaStats as any).mockResolvedValue({
      totalUsed: 10,
      totalLimit: 10,
      shuffleUsed: 5,
      shuffleLimit: 5,
      manualUsed: 5,
      manualLimit: 5,
      audioUsed: 5,
      audioLimit: 5,
      role: 'pro'
    })

    render(<StoryForm />)

    await waitFor(() => {
      // Gönder butonunun (id/role/text üzerinden) disabled olduğunu doğrula
      // Not: t('form.buttons.generate') mock tarafından 'form.buttons.generate' olarak dönüyor
      const submitButton = screen.getByRole('button', { name: /form.buttons.generate|Submit|Gönder|Limit Doldu/i })
      expect(submitButton).toBeDisabled()
    })
  })
})
