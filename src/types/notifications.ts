export type NotificationType = "activity" | "deal" | "system";

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  subtitle?: string;
  createdAt: string;
  read: boolean;
  href?: string;
}

export const countUnreadNotifications = (items: NotificationItem[]) =>
  items.reduce((acc, it) => acc + (it.read ? 0 : 1), 0);