export type NotificationType = 'payment' | 'application' | 'job' | 'alert';

export type Notification = {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
};
