'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Menu,
  Bell,
  LogOut,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { useSidebar } from '@/context/SidebarContext';
import { useAuth } from '@/context/AuthContext';
import { navigationItems } from '@/config/navigation';

export const Header: React.FC = () => {
  const { toggleMobileOpen } = useSidebar();
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);

  // Live Clock (Tashkent local time)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('uz-UZ', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
      setCurrentDate(
        now.toLocaleDateString('uz-UZ', {
          weekday: 'short',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Compute Breadcrumb
  const getBreadcrumbTitle = () => {
    if (pathname === '/dashboard') return 'Асосий дашборд';

    // Check main navigation items
    for (const item of navigationItems) {
      if (item.route === pathname) return item.title;
      if (item.children) {
        for (const child of item.children) {
          if (child.route === pathname) {
            return `${item.shortTitle || item.title} / ${child.title}`;
          }
        }
      }
    }

    return 'Саҳифа';
  };

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
      {/* Left side: Hamburger + Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={toggleMobileOpen}
          className="p-2 -ml-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 truncate">
          <Link
            href="/dashboard"
            className="hover:text-slate-900 dark:hover:text-slate-200 font-medium transition-colors"
          >
            Бош саҳифа
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="font-semibold text-slate-800 dark:text-slate-200 truncate uppercase">
            {getBreadcrumbTitle()}
          </span>
        </nav>
      </div>

      {/* Right side: Time, Notifications, User profile */}
      <div className="flex items-center gap-3">
        {/* Live Clock Badge (Hidden on very small screens) */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300">
          <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
          <span className="font-mono font-semibold">{currentTime}</span>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <span className="text-slate-500 dark:text-slate-400 capitalize">
            {currentDate}
          </span>
        </div>

        {/* Notifications Icon */}
        <button
          type="button"
          className="relative p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Билдиришномалар"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900" />
        </button>

        {/* User Profile dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowUserMenu((prev) => !prev)}
            className="flex items-center gap-2.5 p-1 pl-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-700 dark:text-blue-400 flex items-center justify-center font-bold text-xs border border-blue-200/50 dark:border-blue-800/50">
              {user?.rank ? user.rank[0] : 'А'}
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 leading-tight">
                {user?.rank ? `${user.rank} ${user.name}` : 'Подполковник Азизбек'}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                {user?.role || 'Масъул навбатчи'}
              </span>
            </div>
          </button>

          {/* User Menu Modal / Dropdown */}
          {showUserMenu && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setShowUserMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-1.5 z-40 text-xs">
                <div className="px-3.5 py-2 border-b border-slate-100 dark:border-slate-800">
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    {user?.name || 'Администратор'}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                    {user?.department || 'Тезкор бўлинма'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowUserMenu(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2 px-3.5 py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-left font-medium"
                >
                  <LogOut className="w-4 h-4 shrink-0" />
                  Тизимдан чиқиш
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
