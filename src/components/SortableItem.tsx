'use client'

import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import Item from './Item'
import type { CardData } from '@/@types/card.type'

type Props = {
  card: CardData
  onDelete?: (id: string) => void
  onEdit?: (card: CardData) => void
}

const SortableItem: React.FC<Props> = ({ card, onDelete, onEdit }) => {
  const {
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    setNodeRef,
  } = useSortable({ id: card.id })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div style={style} ref={setNodeRef} {...attributes} {...listeners}>
      <Item card={card} onDelete={onDelete} onEdit={onEdit} />
    </div>
  )
}

export default SortableItem
