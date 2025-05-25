import React from 'react'

import type { CardData } from '@/types/card'

type Props = {
  card: CardData | null
  dragOverlay?: boolean
  onDelete?: (id: string) => void
  onEdit?: (card: CardData) => void
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>
}

const Item: React.FC<Props> = ({
  card,
  dragOverlay = false,
  onDelete,
  onEdit,
}) => {
  if (!card) return null

  const handleDelete = () => {
    const confirmed = window.confirm('정말 이 항목을 삭제하시겠습니까?')
    if (!confirmed) return

    if (card && onDelete) {
      onDelete(card.id)
    }
  }

  const handleEdit = () => {
    if (card && onEdit) {
      onEdit(card)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        boxSizing: 'border-box',
        width: '250px',
        padding: '8px',
        marginBottom: '10px',
        border: '1px solid gray',
        borderRadius: '5px',
        userSelect: 'none',
        backgroundColor: 'white',
        cursor: dragOverlay ? 'grabbing' : 'grab',
      }}
    >
      <div className="flex justify-between mb-2 w-full">
        <strong>{card.issueId}</strong>
        <div className="space-x-1 text-sm">
          <button className="bg-gray-200 px-2 rounded" onClick={handleEdit}>
            수정
          </button>
          <button className="bg-gray-200 px-2 rounded" onClick={handleDelete}>
            삭제
          </button>
        </div>
      </div>
      <p className="text-sm mb-2">{card.content}</p>
      <div className="flex justify-between text-xs text-gray-500 w-full">
        <span>{card.author}</span>
        <span>{card.createdAt}</span>
      </div>
    </div>
  )
}

export default Item
