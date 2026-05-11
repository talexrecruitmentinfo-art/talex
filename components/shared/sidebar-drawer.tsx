'use client';

import Link from 'next/link';
import { X, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';

export interface SidebarItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: SidebarItem[];
  title?: string;
  onLogout?: () => void;
}

export default function SidebarDrawer({
  isOpen,
  onClose,
  items,
  title = 'Menu',
  onLogout,
}: SidebarDrawerProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 pt-navbar"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed left-0 top-navbar z-40 flex h-screen w-[75%] max-w-sm flex-col gap-4 bg-white shadow-lg transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <h2 className="text-lg font-semibold text-navy-900">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 transition"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto px-2">
          <div className="space-y-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-700 hover:bg-navy-50 hover:text-navy-700 transition"
                onClick={onClose}
              >
                {item.icon && <div className="h-5 w-5">{item.icon}</div>}
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-200 px-4 py-4">
          {onLogout && (
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full flex items-center gap-3 rounded-lg px-4 py-3 text-brand-500 hover:bg-brand-50 transition font-medium text-sm"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
