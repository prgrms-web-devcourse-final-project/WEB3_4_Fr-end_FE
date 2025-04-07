'use client';

import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import EventModal from './EventModal';

export default function FCalendar() {
  const [events, setEvents] = useState([
    { title: '부산', start: '2025-04-13', end: '2025-04-14', color: '#3b82f6' },
    { title: '프로젝트 마감', date: '2025-04-20', color: '#10b981' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [eventTitle, setEventTitle] = useState<string>('');
  const [eventType, setEventType] = useState<string>('일반 일정');
  const [eventColor, setEventColor] = useState<string>('#3b82f6');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  // 날짜 클릭 시 모달 열기
  const handleDateClick = (arg: DateClickArg) => {
    setSelectedDate(arg.dateStr);
    setStartDate(arg.dateStr);
    setEndDate(arg.dateStr);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setEventTitle('');
  };

  // 일정 추가
  const addEvent = () => {
    if (eventTitle.trim()) {
      setEvents([
        ...events,
        { title: eventTitle, start: startDate, end: endDate, color: eventColor },
      ]);
      closeModal();
    }
  };

  return (
    <div className="-mx-24 h-full w-full overflow-hidden">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        dateClick={handleDateClick}
        events={events}
        height="100%"
        contentHeight="auto"
        headerToolbar={{
          start: 'prev today next',
          center: 'title',
          end: 'dayGridMonth',
        }}
      />

      {/* 모달 컴포넌트 */}
      <EventModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        eventTitle={eventTitle}
        setEventTitle={setEventTitle}
        eventType={eventType}
        setEventType={setEventType}
        eventColor={eventColor}
        setEventColor={setEventColor}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        addEvent={addEvent}
      />
    </div>
  );
}
