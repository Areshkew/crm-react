export type NotificationType = 'success' | 'error';

export interface NotificationState {
    type: NotificationType,
    message: string
  }