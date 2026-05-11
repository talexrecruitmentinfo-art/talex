'use client';

import { type PropsWithChildren, useState } from 'react';
import { ProtectedRoute } from '@/components/shared/protected-route';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/shared/navbar';
import SidebarDrawer, { type SidebarItem } from '@/components/shared/sidebar-drawer';
import {
  LayoutDashboard,
  Briefcase,
  FileCheck,
  Bookmark,
  Bell,
  User,
  Settings,
} from 'lucide-react';

const userMenuItems: SidebarItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: 'Browse Jobs', href: '/jobs', icon: <Briefcase className="h-5 w-5" /> },
  { label: 'Applications', href: '/dashboard/applications', icon: <FileCheck className="h-5 w-5" /> },
  { label: 'Saved Jobs', href: '/dashboard/saved-jobs', icon: <Bookmark className="h-5 w-5" /> },
  { label: 'Notifications', href: '/dashboard/notifications', icon: <Bell className="h-5 w-5" /> },
  { label: 'Profile', href: '/dashboard/profile', icon: <User className="h-5 w-5" /> },
  { label: 'Settings', href: '/dashboard/settings', icon: <Settings className="h-5 w-5" /> },
];

export default function DashboardLayout({ children }: PropsWithChildren<unknown>) {
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
          isAuthenticated={true}
          showProfile={true}
          onLogout={logout}
        />
        <SidebarDrawer
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          items={userMenuItems}
          title="My Portal"
          onLogout={logout}
        />
        <main className="pt-navbar mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
