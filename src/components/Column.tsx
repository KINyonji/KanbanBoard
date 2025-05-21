import React, { useState } from 'react';
import { useKanbanStore } from '@/store/kanbanStore';
import SortableCard from './SortableCard';

import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

type ColumnProps = {
  title: string;
  columnId: string;
};

const Column: React.FC<ColumnProps> = ({ title, columnId }) => {
  const [newCardText, setNewCardText] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const addCard = useKanbanStore((s) => s.addCard);

  const cards = useKanbanStore((state) =>
  state.cards.filter((card) => card.columnId === columnId)
);

const handleAddCard = () => {
  if (newCardText.trim() === '') return;
  addCard(columnId, newCardText.trim());
  setNewCardText('');
  setIsAdding(false); // 입력창 닫기
};



  return (
  <div className="bg-white border border-gray-300 rounded w-72 flex flex-col p-3">
    <div className="flex justify-between items-center mb-2 font-semibold text-sm">
      <span>{title}</span>
      <button
  onClick={() => setIsAdding(true)}
        className="text-xs px-2 py-1 border border-gray-400 rounded hover:bg-gray-100"
      >
        항목 추가
      </button>
    </div>


  <SortableContext
    items={cards.map((c) => c.id)}
    strategy={verticalListSortingStrategy}
  >
    <div className="flex-1 overflow-y-auto max-h-full pr-1 space-y-3">
  {cards.map((card) => (
    <SortableCard
      key={card.id}
      id={card.id}
      columnId={columnId}
      content={card.content}
    />
  ))}
</div>
  </SortableContext>

{isAdding && (
  <div className="mt-2 space-y-2">
    <input
      type="text"
      value={newCardText}
      onChange={(e) => setNewCardText(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleAddCard();
        }
      }}
      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
      placeholder="카드 내용을 입력하세요"
      autoFocus
    />
    <div className="flex justify-end gap-2">
      <button
        onClick={() => {
          setIsAdding(false);
          setNewCardText('');
        }}
        className="text-xs px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
      >
        취소
      </button>
      <button
        onClick={handleAddCard}
        className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        등록
      </button>
    </div>
  </div>
)}
  </div>

);
};

export default Column;
