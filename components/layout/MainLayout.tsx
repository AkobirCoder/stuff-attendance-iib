'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useSidebar } from '@/context/SidebarContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { width, isResizing } = useSidebar();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
      {/* Sidebar (Desktop fixed / Mobile drawer) */}
      <Sidebar />

      {/* Main Container - dynamically shifted by desktop sidebar width */}
      <div
        style={{ paddingLeft: `${width}px` }}
        className={`flex-1 flex flex-col min-h-screen max-lg:!pl-0 ${
          isResizing ? '' : 'transition-[padding] duration-200 ease-in-out'
        }`}
      >
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
