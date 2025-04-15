import api from "@/lib/auth/axios";

export const cancelBooking = async (bookingId: number) => {
  return await api.put(`/api/v1/bookings/cancel/${bookingId}`);
};
