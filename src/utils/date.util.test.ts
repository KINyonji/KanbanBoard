import { describe, it, expect, vi } from 'vitest'
import { getCurrentKST } from './date.util'
import { KST_OFFSET, MILLISECONDS_IN_HOUR } from '@/config/timeConstants.config'

describe('getCurrentKST', () => {
  it('should return the current KST time formatted correctly', () => {
    // Current UTC time in milliseconds
    const now = new Date()
    const utcNow = now.getTime()

    // 한국 시간 기준으로 보정
    const expectedKST = new Date(utcNow + KST_OFFSET * MILLISECONDS_IN_HOUR)

    // Format the expected output
    const expectedYear = expectedKST.getUTCFullYear()
    const expectedMonth = (expectedKST.getUTCMonth() + 1)
      .toString()
      .padStart(2, '0')
    const expectedDay = expectedKST.getUTCDate().toString().padStart(2, '0')
    const expectedHours = expectedKST.getUTCHours().toString().padStart(2, '0')
    const expectedMinutes = expectedKST
      .getUTCMinutes()
      .toString()
      .padStart(2, '0')
    const expectedFormattedDate = `${expectedYear}-${expectedMonth}-${expectedDay} ${expectedHours}:${expectedMinutes}`

    // Use vitest to check if the function returns the correct time
    expect(getCurrentKST()).toBe(expectedFormattedDate)
  })

  it('should handle changes in the time correctly', () => {
    // Check if the current time in UTC + 9 hours is being calculated correctly
    vi.setSystemTime(new Date('2025-07-04T12:00:00Z')) // Set a fixed date for testing
    const result = getCurrentKST()
    expect(result).toBe('2025-07-04 21:00') // Expected result based on UTC + 9 hours offset
  })
})
