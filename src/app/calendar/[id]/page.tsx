"use client";

import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg, EventDragStopArg } from '@fullcalendar/interaction';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import CalendarNav from '@/components/calendar/CalendarNav';

interface Event {
  id: string;
  title: string;
  start: string;
  end?: string;
  color: string;
}

interface CalendarPageProps {
  params: Promise<{ id: string }>;
}

export default function CalendarPage({ params }: CalendarPageProps) {
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [calendarId, setCalendarId] = useState<string>('');
  const [eventTitle, setEventTitle] = useState<string>('');
  const [eventColor, setEventColor] = useState<string>('#3b82f6');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await params;
      setCalendarId(resolvedParams.id);
    }
    fetchParams();
  }, [params]);

  useEffect(() => {
    if (calendarId) {
      const storedEvents = localStorage.getItem(`calendarEvents-${calendarId}`);
      setEvents(storedEvents ? JSON.parse(storedEvents) : []);
    }
  }, [calendarId]);

  const dateClick = (arg: DateClickArg) => {
    setStartDate(arg.dateStr);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addNewEvent = () => {
    if (!calendarId || !eventTitle.trim()) return;
    const newEvent: Event = {
      id: Date.now().toString(),
      title: eventTitle,
      start: startDate,
      end: endDate,
      color: eventColor,
    };
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem(`calendarEvents-${calendarId}`, JSON.stringify(updatedEvents));
    closeModal();
  };

  // 드래그 종료 시, 쓰레기통 영역 내에 드롭되면 바로 삭제
  const handleEventDragStop = (dragInfo: EventDragStopArg) => {
    const trashEl = document.getElementById('trash-drop-zone');
    if (!trashEl) return;
    const trashRect = trashEl.getBoundingClientRect();
    const { clientX, clientY } = dragInfo.jsEvent;
    if (
      clientX >= trashRect.left &&
      clientX <= trashRect.right &&
      clientY >= trashRect.top &&
      clientY <= trashRect.bottom
    ) {
      const updatedEvents = events.filter(e => e.id !== dragInfo.event.id);
      setEvents(updatedEvents);
      localStorage.setItem(`calendarEvents-${calendarId}`, JSON.stringify(updatedEvents));
      dragInfo.event.remove();
    }
  };

  if (!mounted) return <div />;

  return (
    <div className="flex h-screen relative">
      <CalendarNav />
      <div className="h-full w-full overflow-hidden">
        {/* 캘린더 이름(label) 영역 삭제 */}
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          dateClick={dateClick}
          eventDragStop={handleEventDragStop}
          events={events}
          height="100%"
          contentHeight="auto"
          headerToolbar={{
            start: 'prev today next',
            center: 'title',
            end: 'dayGridMonth',
          }}
        />

        {/* 모달: 이벤트 생성 */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-[520px]">
              <div className="flex items-center -mt-2">
                <div className="flex items-center justify-center w-12 h-12 border-2 border-gray-300 rounded-lg mr-3">
                  <Image src="/svg/calendar.svg" alt="calendar" width={24} height={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">일정 생성하기</h2>
                  <p className="text-sm text-gray-500">
                    친구와 공유할 수 있는 여행 일정을 만들어보세요!
                  </p>
                </div>
              </div>
              <div className="mt-4 -mx-8 bg-gray-300 h-[2px] mb-4" />
              <div className="flex gap-4 mb-5">
                <div className="w-1/2">
                  <label className="block text-sm mb-1 font-semibold">
                    이벤트 타입
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option>친구와 함께</option>
                    <option>일반 일정</option>
                    <option>여행</option>
                    <option>공부</option>
                    <option>운동</option>
                  </select>
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-semibold mb-1">
                    색상
                  </label>
                  <div className="w-full p-2 border border-gray-300 rounded-md flex items-center">
                    <input
                      type="color"
                      value={eventColor}
                      onChange={(e) => setEventColor(e.target.value)}
                      className="w-6 h-6 p-0 border-0 mr-2"
                      style={{ WebkitAppearance: 'none', appearance: 'none' }}
                    />
                    <span className="text-gray-800">{eventColor}</span>
                  </div>
                </div>
              </div>
              <label className="block text-sm font-semibold mb-1">
                일정 제목
              </label>
              <input
                type="text"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              />
              <div className="flex gap-4 mb-4">
                <div className="w-1/2">
                  <label className="block text-sm font-semibold mb-1">
                    시작일
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-semibold mb-1">
                    종료일
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center mt-8">
                <div className="flex gap-3 items-center ml-2">
                  <span className="h-3 w-40 rounded-full" style={{ backgroundColor: eventColor }} />
                  <span className="h-3 w-3 bg-gray-300 rounded-full" />
                  <span className="h-3 w-3 bg-gray-300 rounded-full" />
                </div>
                <div className="flex gap-4 mr-2">
                  <Button
                    onClick={closeModal}
                    className="w-[90px] bg-customGray-100 text-customBlack-200 hover:bg-customGray-400 transition-transform duration-300 ease-in-out hover:scale-105 font-bold rounded-lg"
                  >
                    취소
                  </Button>
                  <Button
                    onClick={addNewEvent}
                    className="rounded-lg w-[90px] font-bold bg-customBlack-300 transition-transform duration-300 ease-in-out hover:scale-105"
                  >
                    확인
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          id="trash-drop-zone"
          className="fixed bottom-5 right-5 w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
        >
          <Image src="/svg/trash.svg" alt="trash" width={40} height={40} />
        </div>
      </div>
    </div>
  );
}
