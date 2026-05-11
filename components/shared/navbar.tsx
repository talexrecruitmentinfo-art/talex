'use client';

import Link from 'next/link';
import { Menu, Bell, User } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  onMenuClick?: () => void;
  showNotifications?: boolean;
  showProfile?: boolean;
}

export default function Navbar({ onMenuClick, showNotifications = true, showProfile = true }: NavbarProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleMenuClick = () => {
    setShowMobileMenu(!showMobileMenu);
    onMenuClick?.();
  };

  return (
    <header className="sticky top-0 z-40 h-navbar border-b border-slate-200 bg-navy-500">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Left: Hamburger Menu */}
        <button
          onClick={handleMenuClick}
          className="inline-flex items-center justify-center rounded-lg p-2 text-white hover:bg-navy-600 transition"
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Center: Logo */}
        <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg sm:text-xl">
          <span className="hidden sm:inline">Talex</span>
          <span className="sm:hidden">T</span>
          <span className="text-brand-500 ml-1">Jobs</span>
        </Link>

        {/* Right: Notifications & Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          {showNotifications && (
            <button
              className="relative inline-flex items-center justify-center rounded-lg p-2 text-white hover:bg-navy-600 transition"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-brand-500 rounded-full"></span>
            </button>
          )}

          {showProfile && (
            <button
              className="inline-flex items-center justify-center rounded-lg p-2 text-white hover:bg-navy-600 transition"
              aria-label="Profile"
            >
              <div className="h-8 w-8 rounded-full bg-brand-500 flex items-center justify-center">
                <User className="h-5 w-5" />
              </div>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
