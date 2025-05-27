"use client";

import React from "react";

import type { CardData } from "@/types/card";

type Props = {
  card: CardData | null;
  dragOverlay?: boolean;
  onDelete?: (id: string) => void;
  onEdit?: (card: CardData) => void;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
};

const Item: React.FC<Props> = ({
  card,
  dragOverlay = false,
  onDelete,
  onEdit,
}) => {
  if (!card) return null;

  const handleDelete = () => {
    const confirmed = window.confirm("정말 이 항목을 삭제하시겠습니까?");
    if (!confirmed) return;

    if (card && onDelete) {
      onDelete(card.id);
    }
  };

  const handleEdit = () => {
    if (card && onEdit) {
      onEdit(card);
    }
  };

  if (dragOverlay) {
    return (
      <div className="bg-white px-4 py-2 rounded shadow text-gray-800 w-[280px] cursor-grabbing">
        <strong>{card.issueId}</strong>
      </div>
    );
  }

  return (
    <div
      className={`bg-white border border-gray-300 rounded-md px-4 py-3 select-none ${
        dragOverlay ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <strong className="text-gray-800">{card.issueId}</strong>
        <div className="flex gap-1 text-sm">
          <button
            data-no-dnd="true"
            className="bg-gray-200 hover:bg-gray-300 px-2 py-0.5 rounded text-xs"
            onClick={handleEdit}
          >
            수정
          </button>
          <button
            data-no-dnd="true"
            className="bg-gray-200 hover:bg-gray-300 px-2 py-0.5 rounded text-xs"
            onClick={handleDelete}
          >
            삭제
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-700 mb-2 break-words whitespace-pre-line">
        {card.content}
      </p>

      <div className="flex justify-between text-xs text-gray-500">
        <span>{card.author}</span>
        <span>{card.createdAt}</span>
      </div>
    </div>
  );
};

export default Item;
