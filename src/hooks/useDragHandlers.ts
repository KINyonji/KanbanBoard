'use client'

import { useCallback } from 'react'
import type { CardData } from '@/@types/card.type'
import type { DragStartEvent, DragOverEvent, DragEndEvent } from '@dnd-kit/core'

interface Props {
  itemGroups: Record<string, CardData[]>
  moveCardBetweenGroups: (
    from: string,
    to: string,
    fromIndex: number,
    toIndex: number,
    card: CardData
  ) => void
  setActiveCard: (card: CardData | null) => void
}

export function useDragHandlers({
  itemGroups,
  moveCardBetweenGroups,
  setActiveCard,
}: Props) {
  const handleDragStart = useCallback(
    ({ active }: DragStartEvent) => {
      const containerId = active.data.current?.sortable?.containerId
      const card =
        itemGroups[containerId]?.find((c) => c.id === active.id) ?? null
      setActiveCard(card)
    },
    [itemGroups, setActiveCard]
  )

  const getDragMetaData = (
    active:
      | DragStartEvent['active']
      | DragOverEvent['active']
      | DragEndEvent['active'],
    over: DragOverEvent['over'] | DragEndEvent['over']
  ) => {
    const from = active.data.current?.sortable?.containerId
    const to = over?.data.current?.sortable?.containerId || over?.id
    const fromIndex = active.data.current?.sortable?.index
    const toIndex = (() => {
      if (!over) return null

      // over.id가 itemGroups에 존재하면 해당 그룹의 길이를 반환
      if (over.id in itemGroups) {
        return itemGroups[over.id].length
      }

      // 그렇지 않으면, over의 sortable index를 반환
      return over?.data.current?.sortable?.index ?? null
    })()

    const card = from ? itemGroups[from]?.find((c) => c.id === active.id) : null

    return {
      from,
      to,
      fromIndex,
      toIndex,
      card,
    }
  }

  const handleDragCancel = useCallback(() => {
    setActiveCard(null)
  }, [setActiveCard])

  const handleDragOver = useCallback(
    ({ active, over }: DragOverEvent) => {
      if (!over) return

      const { from, to, fromIndex, toIndex, card } = getDragMetaData(
        active,
        over
      )

      if (
        !card ||
        !from ||
        !to ||
        from === to ||
        fromIndex == null ||
        toIndex == null
      )
        return

      moveCardBetweenGroups(from, to, fromIndex, toIndex, card)
    },
    [itemGroups, moveCardBetweenGroups]
  )

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      if (!over || active.id === over.id) {
        setActiveCard(null)
        return
      }

      const { from, to, fromIndex, toIndex, card } = getDragMetaData(
        active,
        over
      )

      if (!card || !from || !to || fromIndex == null || toIndex == null) {
        setActiveCard(null)
        return
      }

      moveCardBetweenGroups(from, to, fromIndex, toIndex, card)
      setActiveCard(null)
    },
    [itemGroups, moveCardBetweenGroups, setActiveCard]
  )

  return { handleDragStart, handleDragCancel, handleDragOver, handleDragEnd }
}
