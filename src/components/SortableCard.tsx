import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Card from './Card';

type Props = {
  id: string;
  content: string;
  columnId: string;
};

export default function SortableCard({ id, content, columnId }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
    data: {
      columnId, // ✅ 여기에 현재 카드가 속한 컬럼 ID
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Card id={id} content={content} dragHandleProps={listeners} />
    </div>
  );
}
