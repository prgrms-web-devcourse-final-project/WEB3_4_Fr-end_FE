import CalendarNavTree from "@/components/calendar/CalendarNavTree"
import FCalendar from "@/components/calendar/FCalendar"

export default function CalendarPage() {
  return (
    <div>
      <div className="flex h-screen">
   <CalendarNavTree />
   <FCalendar/>
   </div>
    </div>
  )
}

