import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useKeyDown } from './useKeyDown.util'

// key enum이 정의된 모듈에서 적절한 키 값 사용
import { KeyBoard } from '@/config/keyBoard.config'

describe('useKeyDown', () => {
  it('should call callback when specified key is pressed', () => {
    const callback = vi.fn()
    const key = 'Enter' as KeyBoard

    renderHook(() => useKeyDown(key, callback))

    // 키보드 이벤트 트리거
    const event = new KeyboardEvent('keydown', { key: 'Enter' })
    window.dispatchEvent(event)

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should not call callback when a different key is pressed', () => {
    const callback = vi.fn()
    const key = 'Enter' as KeyBoard

    renderHook(() => useKeyDown(key, callback))

    const event = new KeyboardEvent('keydown', { key: 'Escape' })
    window.dispatchEvent(event)

    expect(callback).not.toHaveBeenCalled()
  })
})
