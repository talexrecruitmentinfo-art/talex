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
  Users,
  CreditCard,
  Settings,
  BarChart,
} from 'lucide-react';

const adminMenuItems: SidebarItem[] = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: 'Jobs', href: '/admin/jobs', icon: <Briefcase className="h-5 w-5" /> },
  { label: 'Applications', href: '/admin/applications', icon: <FileCheck className="h-5 w-5" /> },
  { label: 'Users', href: '/admin/users', icon: <Users className="h-5 w-5" /> },
  { label: 'Payments', href: '/admin/payments', icon: <CreditCard className="h-5 w-5" /> },
  { label: 'Reports', href: '/admin/reports', icon: <BarChart className="h-5 w-5" /> },
  { label: 'Settings', href: '/admin/settings', icon: <Settings className="h-5 w-5" /> },
];

export default function AdminLayout({ children }: PropsWithChildren<unknown>) {
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProtectedRoute requiredRole="ADMIN">
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
          items={adminMenuItems}
          title="Admin Portal"
          onLogout={logout}
        />
        <main className="pt-navbar mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
