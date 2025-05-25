// src/sensors/CustomPointerSensor.ts
import { PointerSensor, type PointerSensorOptions } from '@dnd-kit/core'

export class CustomPointerSensor extends PointerSensor {
  static activators: Array<{
    eventName: 'onPointerDown'
    handler: (
      event: { nativeEvent: PointerEvent },
      options: PointerSensorOptions
    ) => boolean
  }> = [
    {
      eventName: 'onPointerDown',
      /* eslint-disable @typescript-eslint/no-unused-vars */
      handler: ({ nativeEvent }, _options) => {
        const target = nativeEvent.target as HTMLElement
        const interactiveTags = ['button', 'input', 'textarea', 'select', 'option']

        // 커스텀 무시 조건 (삭제 버튼 등)
        if (target.closest('[data-no-dnd="true"]')) {
          return false
        }

        return !interactiveTags.includes(target.tagName.toLowerCase())
      },
    },
  ]
}
