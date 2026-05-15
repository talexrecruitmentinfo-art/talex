'use client';

import Link from 'next/link';
import { Menu, Bell, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface NavbarProps {
  onMenuClick?: () => void;
  showNotifications?: boolean;
  showProfile?: boolean;
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

export default function Navbar({ onMenuClick, showNotifications = true, showProfile = true, isAuthenticated = false, onLogout }: NavbarProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user } = useAuth();

  const handleMenuClick = () => {
    setShowMobileMenu(!showMobileMenu);
    onMenuClick?.();
  };

  const handleLogout = async () => {
    if (onLogout) {
      await onLogout();
    }
  };

  return (
    <header className="sticky top-0 z-40 h-navbar border-b border-government-gray bg-government-primary shadow-government">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Left: Hamburger Menu */}
        <button
          onClick={handleMenuClick}
          className="inline-flex items-center justify-center rounded-lg p-2 text-white hover:bg-government-secondary transition"
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Center: Logo or Title */}
        {!isAuthenticated ? (
          <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg sm:text-xl">
            <span className="hidden sm:inline">Government of Canada</span>
            <span className="sm:hidden">GoC</span>
            <span className="text-government-accent ml-1">Employment Portal</span>
          </Link>
        ) : (
          <div className="text-white font-semibold text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-government-gray">Welcome</p>
            <p className="text-lg">{user?.firstName || 'Applicant'}</p>
          </div>
        )}

        {/* Right: Notifications, Register, Login, or Logout */}
        <div className="flex items-center gap-2 sm:gap-4">
          {!isAuthenticated && (
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-government-primary transition hover:bg-government-gray-light"
            >
              Register
            </Link>
          )}

          {!isAuthenticated && (
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full border border-white bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Login
            </Link>
          )}

          {isAuthenticated && showProfile && (
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-white hover:bg-government-secondary transition font-medium text-sm"
              aria-label="Logout"
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          )}

          {!isAuthenticated && showNotifications && (
            <button
              className="relative inline-flex items-center justify-center rounded-lg p-2 text-white hover:bg-government-secondary transition"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-government-accent rounded-full"></span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
