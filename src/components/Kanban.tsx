'use client'

import { useCallback, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'

import { useDialog } from '@/hooks/useDialog'
import { useDragHandlers } from '@/hooks/useDragHandlers'
import { CustomPointerSensor } from '@/sensors/CustomPointerSensor'
import { useKanbanStore } from '@/store/kanbanStore'
import type { CardData } from '@/@types/card.type'

import Column from '@/components/Column'
import Item from '@/components/Item'
import DialogManager from '@/components/DialogManager'
import { DialogType } from '@/config/dialogType.config'
import { BUTTON_TEXT } from '@/config/buttonText.config'
import { TitleText } from '@/config/titleText.config'

export default function KanbanPage() {
  const router = useRouter()

  const itemGroups = useKanbanStore((state) => state.itemGroups)
  const removeCard = useKanbanStore((state) => state.removeCard)
  const moveCardBetweenGroups = useKanbanStore(
    (state) => state.moveCardBetweenGroups
  )

  const [activeCard, setActiveCard] = useState<CardData | null>(null)
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)

  const { handleDragStart, handleDragCancel, handleDragOver, handleDragEnd } =
    useDragHandlers({
      itemGroups,
      moveCardBetweenGroups,
      setActiveCard,
    })

  const sensors = useSensors(
    useSensor(CustomPointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const {
    isOpen: isDialogOpen,
    dialogType,
    editingCard,
    openDialog,
    closeDialog,
  } = useDialog()

  const handleOpenDialog = useCallback(
    (group: string) => {
      setSelectedGroup(group)
      openDialog(DialogType.ADD)
    },
    [openDialog]
  )

  const handleEditCard = useCallback(
    (card: CardData, groupId: string) => {
      setSelectedGroup(groupId)
      openDialog(DialogType.EDIT, card)
    },
    [openDialog]
  )

  const handleDeleteCard = useCallback(
    (id: string, groupId: string) => {
      removeCard(groupId, id)
    },
    [removeCard]
  )

  const isShownDialog = useMemo<boolean>(() => {
    // dialogType이 null이면 false를 반환하고, 그렇지 않으면 true를 반환
    return isDialogOpen && !!dialogType
  }, [isDialogOpen, dialogType])

  return (
    <>
      {isShownDialog && (
        <DialogManager
          isOpen={isDialogOpen}
          dialogType={dialogType}
          editingCard={editingCard}
          selectedGroup={selectedGroup}
          closeDialog={closeDialog}
        />
      )}

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}>
        <div className='p-6 bg-gray-50 min-h-screen'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-3xl font-bold m-0'>{TitleText.TITLE}</h2>
            <button
              className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400'
              onClick={() => router.push('/')}>
              {BUTTON_TEXT.HOME}
            </button>
          </div>
          <Column
            itemGroups={itemGroups}
            handleOpenDialog={handleOpenDialog}
            handleDeleteCard={handleDeleteCard}
            handleEditCard={handleEditCard}
          />
        </div>
        <DragOverlay>
          {activeCard && <Item card={activeCard} dragOverlay />}
        </DragOverlay>
      </DndContext>
    </>
  )
}
