export interface AppNotification {
  id: number;
  message: string;
  read: boolean;
  createdAt?: string; // Should be a valid date string (ISO or parseable by JS Date)
}
