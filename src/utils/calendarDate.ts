export const adjustEndDate = (endDate: string): string => {
  const date = new Date(endDate);
  date.setDate(date.getDate() + 1);
  return date.toISOString().slice(0, 10);
};