import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Item from "./Item";

import type { CardData } from "../types/card";

type Props = {
  card: CardData;
  onDelete?: (id: string) => void
};

const SortableItem: React.FC<Props> = ({ card, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li style={style} ref={setNodeRef} {...attributes} {...listeners}>
      <Item card={card}  onDelete={onDelete}/>
    </li>
  );
};

export default SortableItem;
