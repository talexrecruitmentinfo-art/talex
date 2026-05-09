'use client';

import { create } from 'zustand';
import type { Notification } from '@/types/notification';
import { notificationService } from '@/services/apiService';

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  addNotification: (notification: Notification | Omit<Notification, 'id' | 'createdAt'>) => void;
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
        id: 'id' in notification && notification.id ? notification.id : Math.random().toString(36).substr(2, 9),
        createdAt:
          'createdAt' in notification && notification.createdAt
            ? notification.createdAt
            : new Date().toISOString(),
      };

      return {
        notifications: [newNotification, ...state.notifications],
        unreadCount: state.unreadCount + (notification.read ? 0 : 1),
      };
    });
  },

  markAsRead: async (id: string) => {
    try {
      await notificationService.markAsRead(id);
      set((state) => {
        const notification = state.notifications.find((n) => n.id === id);
        return {
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
          unreadCount: notification && !notification.read ? state.unreadCount - 1 : state.unreadCount,
        };
      });
    } catch (error) {
      // Handle error silently or show toast
    }
  },

  dismissNotification: async (id: string) => {
    try {
      await notificationService.markAsRead(id);
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
        unreadCount: state.notifications.find((n) => n.id === id && !n.read)
          ? state.unreadCount - 1
          : state.unreadCount,
      }));
    } catch (error) {
      // Handle error silently or show toast
    }
  },

  fetchNotifications: async () => {
    try {
      set({ isLoading: true });
      const notifications = await notificationService.getAll();
      const unreadCount = notifications.filter((n) => !n.read).length;
      set({ notifications, unreadCount, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
    }
  },

  clearAll: () => {
    set({ notifications: [], unreadCount: 0 });
  },
}));
