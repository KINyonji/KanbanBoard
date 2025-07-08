'use client'

import React, { useCallback, useMemo } from 'react'
import Droppable from './Droppable'
import type { CardData } from '@/@types/card.type'
import groupTitles from '@/@types/groupTitles.type'
import { BUTTON_TEXT } from '@/config/buttonText.config'

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
  const groupKeys = useMemo(() => Object.keys(itemGroups), [itemGroups])

  const memoizedItemGroups = useMemo(
    () => groupKeys.map((group) => itemGroups[group]),
    [groupKeys, itemGroups]
  )

  const handleDelete = useCallback(
    (id: string, group: string) => {
      handleDeleteCard(id, group)
    },
    [handleDeleteCard]
  )

  const handleEdit = useCallback(
    (card: CardData, group: string) => {
      handleEditCard(card, group)
    },
    [handleEditCard]
  )

  return (
    <div className='flex flex-row gap-4 px-4 py-2 overflow-x-auto'>
      {groupKeys.map((group, index) => (
        <div
          key={group}
          className='flex flex-col items-start gap-2 p-4 border border-gray-500 rounded-md min-w-[280px] flex-1 bg-white shadow'>
          <div className='w-full flex justify-between items-center mb-1'>
            <h3 className='font-semibold text-lg text-gray-800'>
              {groupTitles[group] ?? group}
            </h3>
            <button
              className='text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded'
              type='button'
              onClick={() => handleOpenDialog(group)}>
              {BUTTON_TEXT.ADD}
            </button>
          </div>
          <Droppable
            id={group}
            items={memoizedItemGroups[index]}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>
      ))}
    </div>
  )
}

export default Column
