'use client';

import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { motion } from 'framer-motion';

interface Props {
  id: string;
  label: string;
  isEditing: boolean;
}

const CalendarNavItem = ({ id, label }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-2 my-1 bg-gray-100 rounded-md cursor-grab hover:bg-gray-200 transition-all"
    >
      {label}
    </motion.div>
  );
};

export default CalendarNavItem;
