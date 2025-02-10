export interface Booking {
  id?: number;  // Optional because it may not be assigned when creating a new booking
  carId: number;
  userId: number;
  fromDate: string;  // ISO format date (e.g., "2025-02-10")
  toDate: string;    // ISO format date (e.g., "2025-02-15")
  days: number;
  totalPrice: number;
  // Status can be "Pending", "Accepted", or "Refused"
  status: string;
}
