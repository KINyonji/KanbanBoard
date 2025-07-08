'use client'

import React, { useCallback, useMemo } from 'react'
import Dialog from './Dialog'
import type { CardData } from '@/@types/card.type'
import { getCurrentKST } from '@/utils/date.util'
import { useKanbanStore } from '@/store/kanbanStore'
import { DialogType } from '@/config/dialogType.config'

type Props = {
  isOpen: boolean
  dialogType: DialogType
  editingCard: CardData | null
  selectedGroup: string | null
  closeDialog: () => void
}

const DialogManager: React.FC<Props> = ({
  isOpen,
  dialogType,
  editingCard,
  selectedGroup,
  closeDialog,
}) => {
  const itemCount = useKanbanStore((state) => state.itemCount)
  const addCard = useKanbanStore((state) => state.addCard)
  const incrementCount = useKanbanStore((state) => state.incrementCount)

  const handleConfirm = useCallback(
    (title: string, author: string) => {
      if (!selectedGroup) return

      if (dialogType === DialogType.ADD) {
        const newCard: CardData = {
          id: String(itemCount),
          issueId: `ISSUE-${itemCount}`,
          content: title,
          author,
          createdAt: getCurrentKST(),
        }
        addCard(selectedGroup, newCard)
        incrementCount()
      } else if (dialogType === DialogType.EDIT && editingCard) {
        const updatedCard = {
          ...editingCard,
          content: title,
          author,
          createdAt: getCurrentKST(),
        }
        useKanbanStore.getState().updateCard(selectedGroup, updatedCard)
      }

      closeDialog()
    },
    [
      selectedGroup,
      dialogType,
      editingCard,
      itemCount,
      addCard,
      incrementCount,
      closeDialog,
    ]
  )

  const initialTitle = useMemo(() => editingCard?.content || '', [editingCard])
  const initialAuthor = useMemo(() => editingCard?.author || '', [editingCard])

  if (!isOpen) return null

  return (
    <Dialog
      initialTitle={initialTitle}
      initialAuthor={initialAuthor}
      onConfirm={handleConfirm}
      onClose={closeDialog}
    />
  )
}

export default DialogManager
