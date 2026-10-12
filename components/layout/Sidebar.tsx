'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  Shield,
  GripVertical,
  X,
} from 'lucide-react';
import { useSidebar } from '@/context/SidebarContext';
import { navigationItems } from '@/config/navigation';
import { SidebarItem } from './SidebarItem';
import { Tooltip } from '@/components/ui/Tooltip';

export const Sidebar: React.FC = () => {
  const {
    isCollapsed,
    width,
    isResizing,
    isMobileOpen,
    toggleCollapse,
    closeMobile,
    startResizing,
  } = useSidebar();

  const pathname = usePathname();
  const isDashboardActive = pathname === '/dashboard';

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={closeMobile}
        />
      )}

      {/* Main Sidebar Element */}
      <aside
        style={{ width: `${width}px` }}
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 ${
          isResizing ? 'select-none pointer-events-auto' : 'transition-[width] duration-200 ease-in-out'
        } ${
          isMobileOpen
            ? 'translate-x-0 shadow-2xl'
            : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Header / Brand */}
        <div className="h-16 flex items-center justify-between px-3.5 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <Link
            href="/dashboard"
            onClick={closeMobile}
            className={`flex items-center gap-2.5 overflow-hidden transition-all ${
              isCollapsed ? 'justify-center w-full' : ''
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
              <Shield className="w-5 h-5" />
            </div>

            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white leading-none truncate">
                  STAFF ATTENDANCE
                </span>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider truncate">
                  Давомат тизими
                </span>
              </div>
            )}
          </Link>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={closeMobile}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List - Scrollable */}
        <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-1 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
          {/* Main Dashboard Link */}
          {isCollapsed ? (
            <div className="mb-2 flex justify-center">
              <Tooltip content="Асосий дашборд" side="right">
                <Link
                  href="/dashboard"
                  onClick={closeMobile}
                  className={`flex items-center justify-center w-11 h-11 rounded-xl transition-all ${
                    isDashboardActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <LayoutDashboard className="w-5 h-5 shrink-0" />
                </Link>
              </Tooltip>
            </div>
          ) : (
            <div className="mb-2">
              <Link
                href="/dashboard"
                onClick={closeMobile}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-medium text-sm ${
                  isDashboardActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    isDashboardActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                </div>
                <span className="font-semibold text-[13px] tracking-wide uppercase truncate">
                  Асосий Дашборд
                </span>
              </Link>
            </div>
          )}

          {/* Section Divider / Label */}
          {!isCollapsed && (
            <div className="px-3 pt-3 pb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Бўлимлар ва гуруҳлар (16 та)
              </span>
            </div>
          )}

          {/* 16 Departments Menu Items */}
          {navigationItems.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              isCollapsed={isCollapsed}
              onNavigate={closeMobile}
            />
          ))}
        </div>

        {/* Sidebar Footer with Collapse Toggle */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 shrink-0 bg-slate-50/50 dark:bg-slate-900/50">
          <div
            className={`flex items-center ${
              isCollapsed ? 'justify-center' : 'justify-between'
            }`}
          >
            {!isCollapsed && (
              <div className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 inline-block animate-pulse" />
                <span>Тизим онлайн</span>
              </div>
            )}

            <button
              type="button"
              onClick={toggleCollapse}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
              title={isCollapsed ? 'Кенгайтириш' : 'Кичрайтириш'}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Right Drag Handle for Resizing (Desktop only, when not collapsed) */}
        {!isCollapsed && (
          <div
            onMouseDown={startResizing}
            className={`absolute top-0 bottom-0 -right-1 w-2 cursor-col-resize group z-50 flex items-center justify-center hover:bg-blue-500/20 transition-colors ${
              isResizing ? 'bg-blue-500/30' : ''
            }`}
            title="Ҳажмни ўзгартириш учун тортинг"
          >
            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-400 dark:bg-slate-600 rounded-full p-0.5">
              <GripVertical className="w-3 h-3 text-white" />
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
