'use client'

import React, { useMemo } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable'

import SortableItem from './SortableItem'
import type { CardData } from '@/@types/card.type'

type Props = {
  id: string
  items: CardData[]
  onDelete?: (id: string, groupId: string) => void
  onEdit?: (card: CardData, groupId: string) => void
}

const Droppable: React.FC<Props> = ({ id, items, onDelete, onEdit }) => {
  const { setNodeRef } = useDroppable({ id })

  const memoizedOnDelete = useMemo(() => {
    return (cardId: string) => {
      onDelete?.(cardId, id)
    }
  }, [onDelete, id])

  const memoizedOnEdit = useMemo(() => {
    return (cardData: CardData) => {
      onEdit?.(cardData, id)
    }
  }, [onEdit, id])

  // 조기 리턴: items.length === 0 일 경우 바로 리턴하여 불필요한 렌더링 방지
  if (items.length === 0) {
    return (
      <div
        ref={setNodeRef}
        className='border border-dashed border-gray-300 p-3 text-center text-gray-400 text-sm rounded'>
        여기에 카드를 드롭하세요
      </div>
    )
  }

  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
      <div ref={setNodeRef} className='flex flex-col gap-3 w-full min-h-[60px]'>
        {items.map((card) => (
          <SortableItem
            key={card.id}
            card={card}
            onDelete={memoizedOnDelete}
            onEdit={memoizedOnEdit}
          />
        ))}
      </div>
    </SortableContext>
  )
}

export default Droppable
