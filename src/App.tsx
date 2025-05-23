import React, { useState } from 'react'
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DragStartEvent, DragOverEvent, DragEndEvent } from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'

import Droppable from './components/Droppable'
import Item from './components/Item'
import { arrayMove, insertAtIndex, removeAtIndex } from './utils/array'

import './App.css'

import type { CardData } from './types/card'

type ItemGroups = {
  [key: string]: CardData[]
}

function App() {
  const [itemGroups, setItemGroups] = useState<ItemGroups>({
    group1: [
      {
        id: '1',
        issueId: 'ISSUE-104',
        content: '이슈 제목을 보여줍니다. 이슈 제목을 보여줍니다.',
        author: '조르디',
        createdAt: '2021.09.10 18:43',
      },
      {
        id: '2',
        issueId: 'ISSUE-105',
        content: '이슈 제목을 보여줍니다. 이슈 제목을 보여줍니다.',
        author: '라이언',
        createdAt: '2021.09.13 09:37',
      },
      {
        id: '3',
        issueId: 'ISSUE-105',
        content: '이슈 제목을 보여줍니다. 이슈 제목을 보여줍니다.',
        author: '라이언',
        createdAt: '2021.09.13 09:37',
      },
    ],
    group2: [
      {
        id: '4',
        issueId: 'ISSUE-104',
        content: '이슈 제목을 보여줍니다. 이슈 제목을 보여줍니다.',
        author: '조르디',
        createdAt: '2021.09.10 18:43',
      },
      {
        id: '5',
        issueId: 'ISSUE-105',
        content: '이슈 제목을 보여줍니다. 이슈 제목을 보여줍니다.',
        author: '라이언',
        createdAt: '2021.09.13 09:37',
      },
      {
        id: '6',
        issueId: 'ISSUE-105',
        content: '이슈 제목을 보여줍니다. 이슈 제목을 보여줍니다.',
        author: '라이언',
        createdAt: '2021.09.13 09:37',
      },
    ],
    group3: [
      {
        id: '7',
        issueId: 'ISSUE-104',
        content: '이슈 제목을 보여줍니다. 이슈 제목을 보여줍니다.',
        author: '조르디',
        createdAt: '2021.09.10 18:43',
      },
    ],
  })

  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )
  const [activeCard, setActiveCard] = useState<CardData | null>(null)

  const handleDragStart = ({ active }: DragStartEvent) => {
    const containerId = active.data.current?.sortable?.containerId
    const card =
      itemGroups[containerId]?.find((c) => c.id === active.id) ?? null
    setActiveCard(card)
  }

  const handleDragCancel = () => {
    setActiveId(null)
  }

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    const overId = over?.id

    if (!overId) return

    const activeContainer = active.data.current?.sortable?.containerId
    const overContainer = over.data.current?.sortable?.containerId || over.id

    if (!activeContainer || !overContainer || activeContainer === overContainer)
      return

    setItemGroups((prevGroups) => {
      const activeIndex = active.data.current?.sortable?.index
      const overIndex =
        over.id in prevGroups
          ? prevGroups[overContainer as string].length + 1
          : over.data.current?.sortable?.index

      if (
        typeof activeIndex !== 'number' ||
        typeof overIndex !== 'number' ||
        typeof active.id !== 'string'
      ) {
        return prevGroups
      }

      const activeCard = prevGroups[activeContainer].find(
        (card) => card.id === active.id,
      )
      if (!activeCard) return prevGroups

      return moveBetweenContainers(
        prevGroups,
        activeContainer,
        activeIndex,
        overContainer as string,
        overIndex,
        activeCard,
      )
    })
  }

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) {
      setActiveId(null)
      return
    }

    if (active.id === over.id) {
      setActiveId(null)
      return
    }

    const activeContainer = active.data.current?.sortable?.containerId
    const overContainer = over.data.current?.sortable?.containerId || over.id

    const activeIndex = active.data.current?.sortable?.index
    const overIndex =
      over.id in itemGroups
        ? itemGroups[overContainer as string].length + 1
        : over.data.current?.sortable?.index

    if (
      !activeContainer ||
      !overContainer ||
      typeof activeIndex !== 'number' ||
      typeof overIndex !== 'number' ||
      typeof active.id !== 'string'
    ) {
      setActiveId(null)
      return
    }

    setItemGroups((prevGroups) => {
      if (activeContainer === overContainer) {
        return {
          ...prevGroups,
          [overContainer as string]: arrayMove(
            prevGroups[overContainer as string],
            activeIndex,
            overIndex,
          ),
        }
      }

      const activeCard = prevGroups[activeContainer].find(
        (card) => card.id === active.id,
      )
      if (!activeCard) return prevGroups

      return moveBetweenContainers(
        prevGroups,
        activeContainer,
        activeIndex,
        overContainer as string,
        overIndex,
        activeCard,
      )
    })

    setActiveId(null)
  }

  const moveBetweenContainers = (
    items: ItemGroups,
    activeContainer: string,
    activeIndex: number,
    overContainer: string,
    overIndex: number,
    item: CardData,
  ): ItemGroups => {
    return {
      ...items,
      [activeContainer]: removeAtIndex(items[activeContainer], activeIndex),
      [overContainer]: insertAtIndex(items[overContainer], overIndex, item),
    }
  }

  const groupTitles: Record<string, string> = {
    group1: 'to-do',
    group2: 'in progress',
    group3: 'done',
  }

  const [itemCount, setItemCount] = useState(10) // 1~9까지 있으므로 10번부터

  const handleAddItem = (groupId: string) => {
    const newCard: CardData = {
      id: String(itemCount),
      issueId: `ISSUE-${itemCount}`,
      content: '새로운 이슈입니다.',
      author: '작성자',
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
    }

    setItemGroups((prev) => ({
      ...prev,
      [groupId]: [...prev[groupId], newCard],
    }))

    setItemCount((prev) => prev + 1)
  }

  return (
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
                  onClick={() => handleAddItem(group)}
                >
                  항목 추가
                </button>
              </div>
              <Droppable
                id={group}
                items={itemGroups[group]}
                activeId={activeId}
                key={group}
              />
            </div>
          ))}
        </div>
      </div>
      <DragOverlay>
        {activeId ? <Item card={activeCard} dragOverlay /> : null}
      </DragOverlay>
    </DndContext>
  )
}

export default App
