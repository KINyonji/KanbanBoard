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
    from: string,to: string,fromIndex: number,toIndex: number,card: CardData,
  ) => void
  incrementCount: () => void
  updateCard: (groupId: string, updatedCard: CardData) => void
}

const defaultGroups: ItemGroups = {
  group1: [],group2: [],group3: [],





}

export const useKanbanStore = create<KanbanState>()(
  persist(
    (set) => ({


      
      itemGroups: defaultGroups,
      itemCount: 1,
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
      moveCardBetweenGroups: (from, to, fromIdx, toIdx) =>
        set((state) => {
          const isSameGroup = from === to

          const updatedFrom = [...state.itemGroups[from]]
          const [movingCard] = updatedFrom.splice(fromIdx, 1)

          const updatedTo = isSameGroup
            ? updatedFrom
            : [...state.itemGroups[to]]

          const adjustedToIndex =
            isSameGroup && fromIdx < toIdx ? toIdx - 1 : toIdx

          updatedTo.splice(adjustedToIndex, 0, movingCard)

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

      // 카드 수정 기능
      updateCard: (groupId, updatedCard) =>
        set((state) => {
          const updatedGroup = state.itemGroups[groupId].map((card) =>
            card.id === updatedCard.id ? updatedCard : card
          )
          return {
            itemGroups: {
              ...state.itemGroups,
              [groupId]: updatedGroup,
            },
          }
        }),
    }),
    {
      name: 'kanban-storage',
    }
  )
)
