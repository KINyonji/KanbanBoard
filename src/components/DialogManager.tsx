// components/DialogManager.tsx
import React, { useCallback } from 'react'
import Dialog from './Dialog'
import type { CardData } from '@/types/card'
import { getCurrentKST } from '@/utils/date'
import { useKanbanStore } from '@/store/kanbanStore'

type Props = {
  isOpen: boolean
  dialogType: 'add' | 'edit'
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

      if (dialogType === 'add') {
        const newCard: CardData = {
          id: String(itemCount),
          issueId: `ISSUE-${itemCount}`,
          content: title,
          author,
          createdAt: getCurrentKST(),
        }
        addCard(selectedGroup, newCard)
        incrementCount()
      } else if (dialogType === 'edit' && editingCard) {
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
    [selectedGroup, dialogType, editingCard, itemCount, addCard, incrementCount, closeDialog],
  )

  if (!isOpen) return null

  return (
    <Dialog
      initialTitle={editingCard?.content || ''}
      initialAuthor={editingCard?.author || ''}
      onConfirm={handleConfirm}
      onClose={closeDialog}
    />
  )
}

export default DialogManager
