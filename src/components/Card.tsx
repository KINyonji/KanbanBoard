import React from 'react';
import { useKanbanStore } from '@/store/kanbanStore';

type CardProps = {
  id: string;
  content: string;
  title?: string;
  author?: string;
  date?: string;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
};

const Card: React.FC<CardProps> = ({
  id,
  content,
  title = 'ISSUE-000',
  author = '작성자',
  date = '2024.01.01 00:00',
  dragHandleProps,
}) => {
  const removeCard = useKanbanStore((s) => s.removeCard);

  return (
    <div className="border border-gray-300 rounded bg-white px-3 py-2 space-y-2 text-sm">
      <div className="flex justify-between items-center font-semibold">
        <span>{title}</span>
        <div className="space-x-1">
          <button className="hover:underline">수정</button>
          <button
            onClick={() => removeCard(id)}
            className="hover:text-red-500"
          >
            삭제
          </button>
        </div>
      </div>
      <div
        className="p-2 border border-dashed rounded cursor-move"
        {...dragHandleProps}
      >
        {content}
      </div>
      <div className="flex justify-between text-xs text-gray-500 pt-2 border-t border-gray-200">
        <span>{author}</span>
        <span>{date}</span>
      </div>
    </div>
  );
};

export default Card;
