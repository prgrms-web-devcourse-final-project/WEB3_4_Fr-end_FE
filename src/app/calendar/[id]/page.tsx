'use client';
import FCalendar from "@/components/calendar/FCalendar"
import dynamic from 'next/dynamic';
const CalendarNav = dynamic(() => import('@/components/calendar/CalendarNav'), { ssr: false });

export default function CalendarPage() {
  return (
    <div>
      <div className="flex h-screen">
   <CalendarNav/>
   <FCalendar/>
   </div>
    </div>
  )
}

