"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import { useDialog } from "@/hooks/useDialog";
import { useDragHandlers } from "@/hooks/useDragHandlers";
import { CustomPointerSensor } from "@/sensors/CustomPointerSensor";
import { useKanbanStore } from "@/store/kanbanStore";
import type { CardData } from "@/types/card";

import Column from "@/components/Column";
import Item from "@/components/Item";
import DialogManager from "@/components/DialogManager";

export default function KanbanPage() {
  const router = useRouter();

  const itemGroups = useKanbanStore((state) => state.itemGroups);
  const removeCard = useKanbanStore((state) => state.removeCard);
  const moveCardBetweenGroups = useKanbanStore((state) => state.moveCardBetweenGroups);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeCard, setActiveCard] = useState<CardData | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const { handleDragStart, handleDragCancel, handleDragOver, handleDragEnd } = useDragHandlers({
    itemGroups,
    moveCardBetweenGroups,
    setActiveCard,
    setActiveId,
  });

  const sensors = useSensors(
    useSensor(CustomPointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const {
    isOpen: isDialogOpen,
    dialogType,
    editingCard,
    openDialog,
    closeDialog,
  } = useDialog();

  const handleOpenDialog = (group: string) => {
    setSelectedGroup(group);
    openDialog("add");
  };

  const handleEditCard = (card: CardData, groupId: string) => {
    setSelectedGroup(groupId);
    openDialog("edit", card);
  };

  const handleDeleteCard = (id: string, groupId: string) => {
    removeCard(groupId, id);
  };

  return (
    <>
      {isDialogOpen && dialogType && (
        <DialogManager
          isOpen={isDialogOpen}
          dialogType={dialogType}
          editingCard={editingCard}
          selectedGroup={selectedGroup}
          closeDialog={closeDialog}
        />
      )}

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="p-6 bg-gray-50 min-h-screen">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold m-0">칸반 보드</h2>
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => router.push("/")}
            >
              홈으로
            </button>
          </div>
          <Column
            itemGroups={itemGroups}
            handleOpenDialog={handleOpenDialog}
            handleDeleteCard={handleDeleteCard}
            handleEditCard={handleEditCard}
          />
        </div>
        <DragOverlay>
          {activeId ? <Item card={activeCard} dragOverlay /> : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}
