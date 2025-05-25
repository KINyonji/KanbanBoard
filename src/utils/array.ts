import { arrayMove as dndKitArrayMove } from "@dnd-kit/sortable";

/**
 * 주어진 배열에서 index 위치의 항목을 제거한 새로운 배열 반환
 */
export const removeAtIndex = <T>(array: T[], index: number): T[] => {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};

/**
 * 주어진 배열의 index 위치에 item을 삽입한 새로운 배열 반환
 */
export const insertAtIndex = <T>(array: T[], index: number, item: T): T[] => {
  return [...array.slice(0, index), item, ...array.slice(index)];
};

/**
 * 배열 항목의 순서를 변경 (dnd-kit 내부 유틸 활용)
 */
export const arrayMove = <T>(array: T[], oldIndex: number, newIndex: number): T[] => {
  return dndKitArrayMove(array, oldIndex, newIndex);
};
