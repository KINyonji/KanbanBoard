import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable'

import SortableItem from './SortableItem'

import './Droppable.css'
import type { CardData } from "../types/card";

type DroppableProps = {
  id: string
  items: CardData[]
  activeId: string | null
}

const Droppable: React.FC<DroppableProps> = ({ id, items }) => {
  const { setNodeRef } = useDroppable({ id })

  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
      <ul className="droppable" ref={setNodeRef}>
        {items.map((card) => (
          <SortableItem key={card.id} card={card} />
        ))}
      </ul>
    </SortableContext>
  )
}

export default Droppable
