import React from "react";
import "./Item.css";

import type { CardData } from "../types/card";

type ItemProps = {
  card: CardData | null;
  dragOverlay?: boolean;
};

const Item: React.FC<ItemProps> = ({ card, dragOverlay }) => {
  if (!card) return null;
  const style: React.CSSProperties = {
    cursor: dragOverlay ? "grabbing" : "grab",
  };

  return (
    <div className="item-card" style={style}>
      <div className="flex justify-between mb-2">
        <strong>{card.issueId}</strong>
        <div className="space-x-1 text-sm">
          <button className="bg-gray-200 px-2 rounded">수정</button>
          <button className="bg-gray-200 px-2 rounded">삭제</button>
        </div>
      </div>
      <p className="text-sm mb-2">{card.content}</p>
      <div className="flex justify-between text-xs text-gray-500">
        <span>{card.author}</span>
        <span>{card.createdAt}</span>
      </div>
    </div>
  );
};

export default Item;
