// pages/kanban.tsx
import dynamic from 'next/dynamic'

// 기존 App 컴포넌트 이동
const KanbanApp = dynamic(() => import('@/App'), { ssr: false })

export default function KanbanPage() {
  return <KanbanApp />
}
 