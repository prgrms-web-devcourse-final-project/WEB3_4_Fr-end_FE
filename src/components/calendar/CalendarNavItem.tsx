import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface NavItemProps {
  id: string;
  label: string;
}

const CalendarNavItem = ({ id, label }: NavItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-2 my-1 bg-gray-100 rounded-md cursor-grab hover:bg-gray-200 transition-all"
    >
      {label}
    </div>
  );
};

export default CalendarNavItem;
