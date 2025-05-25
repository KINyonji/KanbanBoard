import React from 'react'
import './Item.css'

import type { CardData } from '../types/card'

type Props = {
  card: CardData | null
  dragOverlay?: boolean
  onDelete?: (id: string) => void
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>
}

const Item: React.FC<Props> = ({ card, dragOverlay = false, onDelete, }) => {
  if (!card) return null

  const style: React.CSSProperties = {
    cursor: dragOverlay ? 'grabbing' : 'grab',
  }

  const handleDelete = () => {
    console.log(123)
    if (card && onDelete) {
      onDelete(card.id)
    }
  }

  return (
    <div className="item-card" style={style}>
      <div className="flex justify-between mb-2">
        <strong>{card.issueId}</strong>
        <div className="space-x-1 text-sm">
          <button className="bg-gray-200 px-2 rounded">수정</button>
          <button className="bg-gray-200 px-2 rounded" onClick={handleDelete}>
            삭제
          </button>
        </div>
      </div>
      <p className="text-sm mb-2">{card.content}</p>
      <div className="flex justify-between text-xs text-gray-500">
        <span>{card.author}</span>
        <span>{card.createdAt}</span>
      </div>
    </div>
  )
}

export default Item
