'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

interface SidebarContextType {
  isCollapsed: boolean;
  width: number;
  isResizing: boolean;
  isMobileOpen: boolean;
  toggleCollapse: () => void;
  setIsCollapsed: (collapsed: boolean) => void;
  toggleMobileOpen: () => void;
  closeMobile: () => void;
  startResizing: (e: React.MouseEvent) => void;
  resetWidth: () => void;
  minWidth: number;
  maxWidth: number;
  collapsedWidth: number;
}

const DEFAULT_WIDTH = 290;
const MIN_WIDTH = 230;
const MAX_WIDTH = 460;
const COLLAPSED_WIDTH = 76;

const STORAGE_COLLAPSED_KEY = 'stuff_sidebar_collapsed';
const STORAGE_WIDTH_KEY = 'stuff_sidebar_width';

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsedState] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(DEFAULT_WIDTH);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Initialize from localStorage on client mount
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const storedCollapsed = localStorage.getItem(STORAGE_COLLAPSED_KEY);
        if (storedCollapsed !== null) {
          setIsCollapsedState(storedCollapsed === 'true');
        }

        const storedWidth = localStorage.getItem(STORAGE_WIDTH_KEY);
        if (storedWidth !== null) {
          const parsed = parseInt(storedWidth, 10);
          if (!isNaN(parsed) && parsed >= MIN_WIDTH && parsed <= MAX_WIDTH) {
            setWidth(parsed);
          }
        }
      } catch {
        // Storage unavailable or disabled
      } finally {
        setIsLoaded(true);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const toggleCollapse = useCallback(() => {
    setIsCollapsedState((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_COLLAPSED_KEY, String(next));
      } catch {}
      return next;
    });
  }, []);

  const setIsCollapsed = useCallback((collapsed: boolean) => {
    setIsCollapsedState(collapsed);
    try {
      localStorage.setItem(STORAGE_COLLAPSED_KEY, String(collapsed));
    } catch {}
  }, []);

  const toggleMobileOpen = useCallback(() => {
    setIsMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  const resetWidth = useCallback(() => {
    setWidth(DEFAULT_WIDTH);
    try {
      localStorage.setItem(STORAGE_WIDTH_KEY, String(DEFAULT_WIDTH));
    } catch {}
  }, []);

  // Resize handler
  const startResizing = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (isCollapsed) return; // Cannot resize while collapsed

      setIsResizing(true);
      const startX = e.clientX;
      const startWidth = width;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const delta = moveEvent.clientX - startX;
        const newWidth = Math.min(Math.max(startWidth + delta, MIN_WIDTH), MAX_WIDTH);
        setWidth(newWidth);
      };

      const handleMouseUp = (upEvent: MouseEvent) => {
        const delta = upEvent.clientX - startX;
        const finalWidth = Math.min(Math.max(startWidth + delta, MIN_WIDTH), MAX_WIDTH);
        setWidth(finalWidth);
        setIsResizing(false);
        try {
          localStorage.setItem(STORAGE_WIDTH_KEY, String(finalWidth));
        } catch {}
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    },
    [isCollapsed, width]
  );

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        width: isCollapsed ? COLLAPSED_WIDTH : width,
        isResizing,
        isMobileOpen,
        toggleCollapse,
        setIsCollapsed,
        toggleMobileOpen,
        closeMobile,
        startResizing,
        resetWidth,
        minWidth: MIN_WIDTH,
        maxWidth: MAX_WIDTH,
        collapsedWidth: COLLAPSED_WIDTH,
      }}
    >
      {/* Suppress flash of unstyled width before hydration */}
      <div className={isLoaded ? '' : 'contents'}>{children}</div>
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
