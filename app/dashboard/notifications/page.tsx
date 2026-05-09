'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useNotificationStore } from '@/store/notificationStore';
import socket from '@/lib/socket';
import type { Notification } from '@/types/notification';

export default function NotificationsPage() {
  const { user } = useAuthStore();
  const notifications = useNotificationStore((state) => state.notifications);
  const unreadCount = useNotificationStore((state) => state.unreadCount);
  const isLoading = useNotificationStore((state) => state.isLoading);
  const fetchNotifications = useNotificationStore((state) => state.fetchNotifications);
  const addNotification = useNotificationStore((state) => state.addNotification);
  const markAsRead = useNotificationStore((state) => state.markAsRead);
  const dismissNotification = useNotificationStore((state) => state.dismissNotification);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    if (!user?.id || !socket) return;

    const socketClient = socket;
    const eventName = `notification-${user.id}`;

    const handleNotification = (notification: Notification) => {
      addNotification(notification);
    };

    socketClient.on(eventName, handleNotification);
    return () => {
      socketClient.off(eventName, handleNotification);
    };
  }, [user?.id, addNotification]);

  return (
    <div className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-card sm:p-10">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Notifications</p>
        <h1 className="text-3xl font-semibold text-slate-900">Recent alerts</h1>
        <p className="mt-2 text-sm text-slate-600">
          {unreadCount} unread — {notifications.length} total
        </p>
      </div>

      {isLoading ? (
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-600">
          Loading notifications...
        </div>
      ) : notifications.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-600">
          No notifications yet.
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`rounded-3xl border p-5 transition ${
                notification.read ? 'border-slate-200 bg-slate-50' : 'border-brand-500 bg-white shadow-sm'
              }`}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-slate-900">{notification.title}</p>
                  <p className="mt-2 text-sm text-slate-600">{notification.message}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => markAsRead(notification.id)}
                    className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                  >
                    Mark read
                  </button>
                  <button
                    type="button"
                    onClick={() => dismissNotification(notification.id)}
                    className="rounded-full bg-red-100 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-200"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
              <div className="mt-3 text-xs uppercase tracking-[0.22em] text-slate-500">
                {new Date(notification.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
