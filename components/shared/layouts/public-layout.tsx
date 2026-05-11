'use client';

import { type PropsWithChildren, useState } from 'react';
import Footer from '@/components/shared/footer';
import Navbar from '@/components/shared/navbar';
import SidebarDrawer, { type SidebarItem } from '@/components/shared/sidebar-drawer';
import { Home, Briefcase, FileText, Phone, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const publicMenuItems: SidebarItem[] = [
  { label: 'Home', href: '/', icon: <Home className="h-5 w-5" /> },
  { label: 'Browse Jobs', href: '/jobs', icon: <Briefcase className="h-5 w-5" /> },
  { label: 'How It Works', href: '/how-it-works', icon: <FileText className="h-5 w-5" /> },
  { label: 'About', href: '/about', icon: <FileText className="h-5 w-5" /> },
  { label: 'Contact', href: '/contact', icon: <Phone className="h-5 w-5" /> },
  { label: 'Report Issue', href: '/report', icon: <AlertCircle className="h-5 w-5" /> },
];

export default function PublicLayout({ children }: PropsWithChildren<unknown>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        isAuthenticated={isAuthenticated}
        showNotifications={!isAuthenticated}
        showProfile={isAuthenticated}
        onLogout={isAuthenticated ? logout : undefined}
      />
      <SidebarDrawer
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        items={publicMenuItems}
        title="Navigation"
        onLogout={isAuthenticated ? logout : undefined}
      />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      <Footer />
    </div>
  );
}
