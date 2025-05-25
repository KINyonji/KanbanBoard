// hooks/useDialog.ts
import { useState } from 'react'
import type { CardData } from '../types/card'

export type DialogType = 'add' | 'edit'

export function useDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [dialogType, setDialogType] = useState<DialogType | null>(null)
  const [editingCard, setEditingCard] = useState<CardData | null>(null)

  const openDialog = (type: DialogType, cardData: CardData | null = null) => {
    setIsOpen(true)
    setDialogType(type)
    setEditingCard(cardData)
  }

  const closeDialog = () => {
    setIsOpen(false)
    setDialogType(null)
    setEditingCard(null)
  }

  return {
    isOpen,
    dialogType,
    editingCard,
    openDialog,
    closeDialog,
  }
}
