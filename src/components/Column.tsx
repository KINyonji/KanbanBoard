import React from 'react'
import Droppable from './Droppable'
import type { CardData } from '@/types/card'
import groupTitles from '@/types/groupTitles'

type Props = {
  itemGroups: Record<string, CardData[]>
  handleOpenDialog: (group: string) => void
  handleDeleteCard: (id: string, groupId: string) => void
  handleEditCard: (card: CardData, groupId: string) => void
}

const Column: React.FC<Props> = ({
  itemGroups,
  handleOpenDialog,
  handleDeleteCard,
  handleEditCard,
}) => {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      {Object.keys(itemGroups).map((group) => (
        <div
          key={group}
          className="flex flex-col items-start gap-2 p-2 border rounded min-w-[240px] bg-white"
        >
          <div className="w-full flex justify-between items-center mb-2">
            <h3 className="font-semibold text-lg">
              {groupTitles[group] ?? group}
            </h3>
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
            onEdit={(card) => handleEditCard(card, group)}
          />
        </div>
      ))}
    </div>
  )
}

export default Column
