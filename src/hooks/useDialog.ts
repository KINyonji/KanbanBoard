'use client'

import { useState } from 'react'
import type { CardData } from '@/@types/card.type'
import { DialogType } from '@/config/dialogType.config'

export function useDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [dialogType, setDialogType] = useState<DialogType>(DialogType.ADD)
  const [editingCard, setEditingCard] = useState<CardData | null>(null)

  const openDialog = (type: DialogType, cardData: CardData | null = null) => {
    setIsOpen(true)
    setDialogType(type)
    setEditingCard(cardData)
  }

  const closeDialog = () => {
    setIsOpen(false)
    setDialogType(DialogType.ADD)
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
