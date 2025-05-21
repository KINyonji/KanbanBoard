import Column from '@/components/Column'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { useKanbanStore } from '@/store/kanbanStore'
import type { DragEndEvent } from '@dnd-kit/core'

function App() {
  const sensors = useSensors(useSensor(PointerSensor))
  const moveCard = useKanbanStore((s) => s.moveCard)
  const moveCardToColumn = useKanbanStore((s) => s.moveCardToColumn)
  const cards = useKanbanStore((s) => s.cards)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const overColumnId = over.data?.current?.columnId
    const activeColumnId = active.data?.current?.columnId

    const sameColumnCards = cards.filter((c) => c.columnId === activeColumnId)
    const oldIndex = sameColumnCards.findIndex((c) => c.id === active.id)
    const newIndex = sameColumnCards.findIndex((c) => c.id === over.id)

    if (!overColumnId || !activeColumnId) return

    if (overColumnId === activeColumnId) {
      moveCard(activeColumnId, oldIndex, newIndex)
    } else {
      moveCardToColumn(active.id as string, overColumnId, newIndex)
    }
  }

  return (
    <div className="p-5">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="p-6 bg-gray-50 min-h-screen">
          <h2 className="text-3xl font-bold m-0 flex items-center gap-2">
            칸반 보드
          </h2>

          <div className="flex gap-4 overflow-x-auto h-[calc(100vh-96px)] px-4 bg-gray-100"
  style={{ touchAction: 'pan-y' }}>
            <Column title="to-do" columnId="todo" />
            <Column title="in progress" columnId="inprogress" />
            <Column title="done" columnId="done" />
          </div>
        </div>
      </DndContext>
    </div>
  )
}

export default App
