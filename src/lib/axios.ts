import axios from 'axios';

const API_URL = 'http://api.sete.kr:8080/api/calendar';

export const fetchCalendars = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createCalendar = async (label: string) => {
  const now = new Date().toISOString();
  const body = {
    calendarTitle: label,
    startDate: now,
    endDate: now,
    time: now,
    alertTime: now,
    note: ''
  };
  const response = await axios.post(API_URL, body);
  return response.data;
};
