// notification.model.ts
export interface AppNotification {
  id: string;
  message: string;
  type: 'booking' | 'status' | 'system';
  read: boolean;
  timestamp: Date;
  data?: {
    bookingId?: string;
    status?: string;
  };
}
