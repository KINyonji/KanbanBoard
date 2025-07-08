import { KST_OFFSET, MILLISECONDS_IN_HOUR } from '@/config/timeConstants.config'

export const getCurrentKST = (): string => {
  const now = new Date()

  // 한국 시간 기준으로 보정
  const kst = new Date(now.getTime() + KST_OFFSET * MILLISECONDS_IN_HOUR)

  const pad = (n: number) => n.toString().padStart(2, '0')

  const year = kst.getUTCFullYear()
  const month = pad(kst.getUTCMonth() + 1)
  const day = pad(kst.getUTCDate())
  const hours = pad(kst.getUTCHours())
  const minutes = pad(kst.getUTCMinutes())

  return `${year}-${month}-${day} ${hours}:${minutes}`
}
