"use client";

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

const FCalendar = () => {
  const handleDateClick = (arg: DateClickArg) => {
    alert(`날짜 클릭됨: ${arg.dateStr}`);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}        // 드래그 앤 드롭 활성화
        selectable={true}      // 날짜 선택 가능
        dateClick={handleDateClick}
        events={[
          { title: '부산', start: '2025-04-12', end: '2025-04-15' },
          { title: '프로젝트 마감', date: '2025-04-20' },
        ]}
        height="auto"
        contentHeight="auto"
      />
    </div>
  );
};

export default FCalendar;
