import React, { useState } from 'react'
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import type { DragStartEvent, DragOverEvent, DragEndEvent } from '@dnd-kit/core'

import Droppable from './components/Droppable'
import Item from './components/Item'
import { useDialog } from './hooks/useDialog'
import Dialog from './components/Dialog'
import { CustomPointerSensor } from './sensors/CustomPointerSensor'

import { useKanbanStore } from './store/kanbanStore'
import type { CardData } from './types/card'

import './App.css'

function App() {
  // ✅ Zustand 개별 selector 구독
  const itemGroups = useKanbanStore((state) => state.itemGroups)
  const itemCount = useKanbanStore((state) => state.itemCount)
  const addCard = useKanbanStore((state) => state.addCard)
  const removeCard = useKanbanStore((state) => state.removeCard)
  const moveCardBetweenGroups = useKanbanStore((state) => state.moveCardBetweenGroups)
  const incrementCount = useKanbanStore((state) => state.incrementCount)

  const [activeId, setActiveId] = useState<string | null>(null)
  const [activeCard, setActiveCard] = useState<CardData | null>(null)
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(CustomPointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const { isOpen: isDialogOpen, openDialog, closeDialog } = useDialog()

  const handleDragStart = ({ active }: DragStartEvent) => {
    const containerId = active.data.current?.sortable?.containerId
    const card =
      itemGroups[containerId]?.find((c) => c.id === active.id) ?? null
    setActiveCard(card)
  }

  const handleDragCancel = () => setActiveId(null)

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) return

    const activeContainer = active.data.current?.sortable?.containerId
    const overContainer = over.data.current?.sortable?.containerId || over.id

    if (!activeContainer || !overContainer || activeContainer === overContainer) return

    const activeIndex = active.data.current?.sortable?.index
    const overIndex =
      over.id in itemGroups
        ? itemGroups[overContainer].length
        : over.data.current?.sortable?.index

    const activeCard = itemGroups[activeContainer].find((c) => c.id === active.id)
    if (!activeCard || typeof activeIndex !== 'number' || typeof overIndex !== 'number') return

    moveCardBetweenGroups(activeContainer, overContainer, activeIndex, overIndex, activeCard)
  }

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) {
      setActiveId(null)
      return
    }

    const activeContainer = active.data.current?.sortable?.containerId
    const overContainer = over.data.current?.sortable?.containerId || over.id
    const activeIndex = active.data.current?.sortable?.index
    const overIndex =
      over.id in itemGroups
        ? itemGroups[overContainer].length
        : over.data.current?.sortable?.index

    const activeCard = itemGroups[activeContainer]?.find((c) => c.id === active.id)

    if (!activeCard || !activeContainer || !overContainer ||
      typeof activeIndex !== 'number' || typeof overIndex !== 'number') {
      setActiveId(null)
      return
    }

    if (activeContainer === overContainer && activeIndex !== overIndex) {
      moveCardBetweenGroups(activeContainer, overContainer, activeIndex, overIndex, activeCard)
    } else if (activeContainer !== overContainer) {
      moveCardBetweenGroups(activeContainer, overContainer, activeIndex, overIndex, activeCard)
    }

    setActiveId(null)
  }

  const groupTitles: Record<string, string> = {
    group1: 'to-do',
    group2: 'in progress',
    group3: 'done',
  }

  const handleOpenDialog = (group: string) => {
    setSelectedGroup(group)
    openDialog()
  }

  const handleDeleteCard = (id: string, groupId: string) => {
    removeCard(groupId, id)
  }

  return (
    <>
      {isDialogOpen && (
        <Dialog
          mode="create"
          initialTitle=""
          initialAuthor=""
          onConfirm={(title, author) => {
            if (!selectedGroup) return
            const newCard: CardData = {
              id: String(itemCount),
              issueId: `ISSUE-${itemCount}`,
              content: title,
              author,
              createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
            }
            addCard(selectedGroup, newCard)
            incrementCount()
            closeDialog()
          }}
          onClose={closeDialog}
        />
      )}
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="p-6 bg-gray-50 min-h-screen">
          <h2 className="text-3xl font-bold m-0 flex items-center gap-2">
            칸반 보드
          </h2>
          <div className="container">
            {Object.keys(itemGroups).map((group) => (
              <div
                key={group}
                className="flex flex-col items-start gap-2 p-2 border rounded min-w-[240px] bg-white"
              >
                <div className="w-full flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">{groupTitles[group]}</h3>
                  <button
                    className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded"
                    type="button"
                    onClick={() => handleOpenDialog(group)}
                  >
                    항목 추가
                  </button>
                </div>
                <Droppable
                  id={group}
                  items={itemGroups[group]}
                  onDelete={(id) => handleDeleteCard(id, group)}
                />
              </div>
            ))}
          </div>
        </div>
        <DragOverlay>
          {activeId ? <Item card={activeCard} dragOverlay /> : null}
        </DragOverlay>
      </DndContext>
    </>
  )
}

export default App
