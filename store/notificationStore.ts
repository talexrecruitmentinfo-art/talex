'use client';

import { create } from 'zustand';
import type { Notification } from '@/types/notification';

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  dismissNotification: (id: string) => void;
  fetchNotifications: () => Promise<void>;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,

  addNotification: (notification) => {
    set((state) => {
      const newNotification: Notification = {
        ...notification,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
      };

      return {
        notifications: [newNotification, ...state.notifications],
        unreadCount: state.unreadCount + (notification.read ? 0 : 1),
      };
    });
  },

  markAsRead: (id: string) => {
    set((state) => {
      const notification = state.notifications.find((n) => n.id === id);
      return {
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        ),
        unreadCount: notification && !notification.read ? state.unreadCount - 1 : state.unreadCount,
      };
    });
  },

  dismissNotification: (id: string) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },

  fetchNotifications: async () => {
    try {
      set({ isLoading: true });
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mock notifications
      const mockNotifications: Notification[] = [
        {
          id: '1',
          userId: '1',
          type: 'payment',
          title: 'Payment Successful',
          message: 'KES 500 application fee processed.',
          read: false,
          createdAt: new Date().toISOString(),
        },
      ];

      set({ notifications: mockNotifications, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
    }
  },

  clearAll: () => {
    set({ notifications: [], unreadCount: 0 });
  },
}));
