"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";
import type { CardData } from "@/types/card";

type Props = {
  id: string;
  items: CardData[];
  onDelete?: (id: string, groupId: string) => void;
  onEdit?: (card: CardData, groupId: string) => void;
};

const Droppable: React.FC<Props> = ({ id, items, onDelete, onEdit }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
      <div ref={setNodeRef} className="flex flex-col gap-3 w-full min-h-[60px]">
        {items.length > 0 ? (
          items.map((card) => (
            <SortableItem
              key={card.id}
              card={card}
              onDelete={(cardId) => onDelete?.(cardId, id)}
              onEdit={(cardData) => onEdit?.(cardData, id)}
            />
          ))
        ) : (
          <div className="border border-dashed border-gray-300 p-3 text-center text-gray-400 text-sm rounded">
            여기에 카드를 드롭하세요
          </div>
        )}
      </div>
    </SortableContext>
  );
};

export default Droppable;
