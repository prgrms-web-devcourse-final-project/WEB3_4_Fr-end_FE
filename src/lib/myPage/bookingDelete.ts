import api from "@/lib/auth/axios";

export const deleteBooking = async (bookingId: number) => {
  return await api.delete(`/api/v1/bookings/${bookingId}`);
};
