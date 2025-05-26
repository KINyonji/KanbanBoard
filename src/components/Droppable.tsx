"use client";

import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable'

import SortableItem from './SortableItem'
import type { CardData } from '@/types/card'

type Props = {
  id: string
  items: CardData[]
  onDelete?: (id: string, groupId: string) => void
  onEdit?: (card: CardData, groupId: string) => void
}

const Droppable: React.FC<Props> = ({ id, items, onDelete, onEdit }) => {
  const { setNodeRef } = useDroppable({ id })

  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
      <div  ref={setNodeRef} className="flex flex-col gap-3 w-full">
        {items.map((card) => (
          <SortableItem
            key={card.id}
            card={card}
            onDelete={(cardId) => onDelete?.(cardId, id)}
            onEdit={(cardData) => onEdit?.(cardData, id)}
          />
        ))}
      </div>
    </SortableContext>
  )
}

export default Droppable
