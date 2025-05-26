"use client";

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
    <div className="flex flex-row gap-4 px-4 py-2 overflow-x-auto">
      {Object.keys(itemGroups).map((group) => (
        <div
          key={group}
          className="flex flex-col items-start gap-2 p-4 border border-gray-500 rounded-md min-w-[280px] flex-1 bg-white shadow"
        >
          <div className="w-full flex justify-between items-center mb-1">
            <h3 className="font-semibold text-lg text-gray-800">
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
