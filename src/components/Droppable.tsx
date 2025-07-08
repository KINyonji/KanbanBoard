'use client'

import React, { useMemo } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable'

import SortableItem from './SortableItem'
import type { CardData } from '@/@types/card.type'
import { MESSAGE } from '@/config/message.config'

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

  //컬럼 비어있을때
  if (items.length === 0) {
    return (
      <div
        ref={setNodeRef}
        className='border border-dashed border-gray-300 p-3 text-center text-gray-400 text-sm rounded w-full flex items-center justify-center'>
        {MESSAGE.DROP_CARD_HERE}
      </div>
    )
  }

  return (
    //컬럼에 항목이 있을때
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
