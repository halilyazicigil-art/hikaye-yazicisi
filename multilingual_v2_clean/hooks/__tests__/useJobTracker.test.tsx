import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useJobTracker } from '../useJobTracker'
import { RealtimeGuard } from '../../utils/realtime-guard'

// Vitest time and mock utilities
vi.useFakeTimers()

describe('useJobTracker Hook Unit Tests', () => {
  let mockSupabase: any
  let mockChannel: any
  let onSuccessSpy: any
  let onFailureSpy: any
  let onProgressSpy: any

  beforeEach(() => {
    onSuccessSpy = vi.fn()
    onFailureSpy = vi.fn()
    onProgressSpy = vi.fn()

    // Mock Realtime Channel
    mockChannel = {
      on: vi.fn().mockReturnThis(),
      subscribe: vi.fn((cb) => {
        if (cb) cb('SUBSCRIBED')
        return mockChannel
      })
    }

    // Mock Supabase Client
    mockSupabase = {
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn(),
      removeChannel: vi.fn().mockResolvedValue({})
    }

    // Default mock behavior for Supabase channel creation
    mockSupabase.channel = vi.fn().mockReturnValue(mockChannel)

    // Clear spy and class mocks
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.clearAllTimers()
  })

  it('should not subscribe or poll if jobId is null', () => {
    renderHook(() =>
      useJobTracker({
        supabase: mockSupabase,
        jobId: null,
        onSuccess: onSuccessSpy,
        onFailure: onFailureSpy,
        onProgress: onProgressSpy
      })
    )

    expect(mockSupabase.channel).not.toHaveBeenCalled()
    expect(mockSupabase.from).not.toHaveBeenCalled()
  })

  it('should immediately query initial state and subscribe to realtime on mount with active jobId', async () => {
    // Arrange
    const dummyJob = { status: 'processing', progress: 45 }
    mockSupabase.maybeSingle.mockResolvedValue({ data: dummyJob, error: null })

    // Act
    renderHook(() =>
      useJobTracker({
        supabase: mockSupabase,
        jobId: 'job-123',
        onSuccess: onSuccessSpy,
        onFailure: onFailureSpy,
        onProgress: onProgressSpy
      })
    )

    // Assert initial query
    expect(mockSupabase.channel).toHaveBeenCalledWith('job-shield-job-123')
    expect(mockSupabase.from).toHaveBeenCalledWith('generation_jobs')

    // Flush microtasks for the immediate check
    await act(async () => {
      await Promise.resolve()
    })

    expect(onProgressSpy).toHaveBeenCalledWith(dummyJob)
  })

  it('should trigger onSuccess when job status becomes completed', async () => {
    // Arrange
    const dummyJob = { status: 'completed', progress: 100, story_id: 'story-999' }
    mockSupabase.maybeSingle.mockResolvedValue({ data: dummyJob, error: null })

    // Act
    renderHook(() =>
      useJobTracker({
        supabase: mockSupabase,
        jobId: 'job-123',
        onSuccess: onSuccessSpy,
        onFailure: onFailureSpy
      })
    )

    // Flush initial immediate check
    await act(async () => {
      await Promise.resolve()
    })

    // Assert
    expect(onSuccessSpy).toHaveBeenCalledWith('story-999')
    expect(onFailureSpy).not.toHaveBeenCalled()
  })

  it('should trigger onFailure when job status is failed', async () => {
    // Arrange
    const dummyJob = { status: 'failed', progress: 0, error_message: 'Sistem hatası!' }
    mockSupabase.maybeSingle.mockResolvedValue({ data: dummyJob, error: null })

    // Act
    renderHook(() =>
      useJobTracker({
        supabase: mockSupabase,
        jobId: 'job-123',
        onSuccess: onSuccessSpy,
        onFailure: onFailureSpy
      })
    )

    // Flush initial immediate check
    await act(async () => {
      await Promise.resolve()
    })

    // Assert
    expect(onFailureSpy).toHaveBeenCalledWith('Sistem hatası!')
    expect(onSuccessSpy).not.toHaveBeenCalled()
  })

  it('should trigger redirect and updates via periodic fallback polling if realtime fails/disconnects', async () => {
    // Arrange
    // First, it is processing
    const initialJob = { status: 'processing', progress: 30 }
    mockSupabase.maybeSingle.mockResolvedValueOnce({ data: initialJob, error: null })

    renderHook(() =>
      useJobTracker({
        supabase: mockSupabase,
        jobId: 'job-123',
        onSuccess: onSuccessSpy,
        onFailure: onFailureSpy,
        onProgress: onProgressSpy,
        pollingIntervalMs: 3000
      })
    )

    // Flush initial immediate check
    await act(async () => {
      await Promise.resolve()
    })

    expect(onProgressSpy).toHaveBeenCalledWith(initialJob)
    expect(onSuccessSpy).not.toHaveBeenCalled()

    // Now, change the mock to return completed state for the next poll
    const completedJob = { status: 'completed', progress: 100, story_id: 'story-456' }
    mockSupabase.maybeSingle.mockResolvedValueOnce({ data: completedJob, error: null })

    // Fast-forward 3 seconds
    await act(async () => {
      vi.advanceTimersByTime(3000)
    })

    // Assert that the polling fallback correctly caught the update and fired redirect callbacks
    expect(onSuccessSpy).toHaveBeenCalledWith('story-456')
  })

  it('should unsubscribe from channels and clear interval on unmount', async () => {
    // Arrange
    const { unmount } = renderHook(() =>
      useJobTracker({
        supabase: mockSupabase,
        jobId: 'job-123',
        onSuccess: onSuccessSpy,
        onFailure: onFailureSpy
      })
    )

    // Act
    unmount()

    // Assert
    expect(mockSupabase.removeChannel).toHaveBeenCalledWith(mockChannel)
  })
})
