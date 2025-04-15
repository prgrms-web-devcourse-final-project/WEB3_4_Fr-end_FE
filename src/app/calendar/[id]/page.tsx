import CalendarClient from "@/components/calendar/CalendarClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CalendarPage({ params }: PageProps) {
  const resolvedParams = await params;
  const calendarId = resolvedParams.id;

  return <CalendarClient calendarId={calendarId} />;
}
