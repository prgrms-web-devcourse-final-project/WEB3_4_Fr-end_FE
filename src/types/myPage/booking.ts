export interface Booking {
  bookingId: number;
  accommodationName: string;
  accommodationAddress: string;
  accommodationImage: string;
  checkInDate: string;
  checkInTime: string;
  bookingStatus: string | null;
  paymentStatus: string;
  reservedAt: string;
  canCancel: boolean;
}
