'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchCalendars } from '@/apis/Schedule/CalendarNav';
import { useAuthStore } from '@/store/useAuthStore';

export default function CalendarRedirectPage() {
  const router = useRouter();
  const userId = useAuthStore((state) => state.user?.id);

  useEffect(() => {
    const redirectToFirstCalendar = async () => {
      if (!userId) return;
  
      const calendarList = await fetchCalendars();
      const myCalendars = calendarList.filter(
        (item) => `${item.userId}` === `${userId}`
      );
  
      if (myCalendars.length > 0) {
        const firstId = myCalendars[0].id;
        router.replace(`/calendar/${firstId}`);
      } else {
        router.replace('/calendar/empty');
      }
    };
  
    redirectToFirstCalendar();
  }, [userId, router]); // ✅ 여기만 추가해주면 끝!
  
    

  return <div className="p-6 text-gray-700">캘린더를 불러오는 중입니다...</div>;
}
