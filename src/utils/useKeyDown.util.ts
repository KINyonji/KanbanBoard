import { useEffect } from 'react'
import { KeyBoard } from '@/config/keyBoard.config'

export const useKeyDown = (key: KeyBoard, callback: () => void) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === key) callback()
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [key, callback])
}
