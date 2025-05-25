// src/store/kanbanStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CardData } from '@/types/card'

type ItemGroups = {
  [key: string]: CardData[]
}

interface KanbanState {
  itemGroups: ItemGroups
  itemCount: number
  setItemGroups: (groups: ItemGroups) => void
  addCard: (groupId: string, card: CardData) => void
  removeCard: (groupId: string, cardId: string) => void
  moveCardBetweenGroups: (
    from: string,
    to: string,
    fromIndex: number,
    toIndex: number,
    card: CardData
  ) => void
  incrementCount: () => void
}

const defaultGroups: ItemGroups = {
  group1: [],
  group2: [],
  group3: [],
}

export const useKanbanStore = create<KanbanState>()(
  persist(
    (set) => ({
      itemGroups: defaultGroups,
      itemCount: 10,
      setItemGroups: (groups) => set({ itemGroups: groups }),
      addCard: (groupId, card) =>
        set((state) => ({
          itemGroups: {
            ...state.itemGroups,
            [groupId]: [...state.itemGroups[groupId], card],
          },
        })),
      removeCard: (groupId, cardId) =>
        set((state) => ({
          itemGroups: {
            ...state.itemGroups,
            [groupId]: state.itemGroups[groupId].filter(
              (card) => card.id !== cardId
            ),
          },
        })),
      moveCardBetweenGroups: (from, to, fromIdx, toIdx, card) =>
        set((state) => {
          const updatedFrom = [...state.itemGroups[from]]
          updatedFrom.splice(fromIdx, 1)
          const updatedTo = [...state.itemGroups[to]]
          updatedTo.splice(toIdx, 0, card)

          return {
            itemGroups: {
              ...state.itemGroups,
              [from]: updatedFrom,
              [to]: updatedTo,
            },
          }
        }),
      incrementCount: () =>
        set((state) => ({ itemCount: state.itemCount + 1 })),
    }),
    {
      name: 'kanban-storage',
    }
  )
)
