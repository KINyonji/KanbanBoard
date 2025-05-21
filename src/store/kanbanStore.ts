import { createStore } from 'zustand'
import { useStoreWithEqualityFn } from 'zustand/traditional'

export type Card = {
  id: string
  content: string
  columnId: string
}

type KanbanState = {
  cards: Card[]
  addCard: (columnId: string, content: string) => void
  removeCard: (id: string) => void
  getCardsByColumn: (columnId: string) => Card[]
  moveCard: (columnId: string, fromIndex: number, toIndex: number) => void
  moveCardToColumn: (id: string, toColumnId: string, toIndex: number) => void
}

const kanbanStore = createStore<KanbanState>((set, get) => ({
  cards: [
    { id: '1', content: '할 일 1', columnId: 'todo' },
    { id: '2', content: '할 일 2', columnId: 'todo' },
    { id: '3', content: '진행 중 1', columnId: 'inprogress' },
    { id: '4', content: '완료됨 1', columnId: 'done' },
  ],
  addCard: (columnId, content) => {
    const newCard = {
      id: Date.now().toString(),
      content,
      columnId,
    }
    set((state) => ({
      cards: [...state.cards, newCard],
    }))
  },
  removeCard: (id) => {
    console.log('실제 삭제 중인 카드 ID:', id)
    set((state) => ({
      cards: state.cards.filter((card) => card.id !== id),
    }))
  },
  moveCard: (columnId, from, to) => {
    set((state) => {
      const sameColumn = state.cards.filter((c) => c.columnId === columnId)
      const moving = sameColumn[from]
      if (!moving) return state
      const reordered = [...sameColumn]
      reordered.splice(from, 1)
      reordered.splice(to, 0, moving)
      const others = state.cards.filter((c) => c.columnId !== columnId)
      return { cards: [...others, ...reordered] }
    })
  },
  getCardsByColumn: (columnId) => {
    return get().cards.filter((card) => card.columnId === columnId)
  },

  moveCardToColumn: (id, toColumnId, toIndex) => {
    set((state) => {
      const cardToMove = state.cards.find((card) => card.id === id)
      if (!cardToMove) return state

      // 1. 카드 제거
      const remainingCards = state.cards.filter((card) => card.id !== id)

      // 2. 이동 대상 컬럼의 카드만 필터링
      const targetColumnCards = remainingCards.filter(
        (card) => card.columnId === toColumnId,
      )

      // 3. columnId 변경된 카드 생성
      const movedCard = { ...cardToMove, columnId: toColumnId }

      // 4. 대상 컬럼에 삽입
      targetColumnCards.splice(toIndex, 0, movedCard)

      // 5. 나머지 컬럼 카드와 합치기
      const otherCards = remainingCards.filter(
        (card) => card.columnId !== toColumnId,
      )

      return {
        cards: [...otherCards, ...targetColumnCards],
      }
    })
  },
}))

export const useKanbanStore = <T>(
  selector: (state: KanbanState) => T,
  equals?: (a: T, b: T) => boolean,
) => useStoreWithEqualityFn(kanbanStore, selector, equals)
