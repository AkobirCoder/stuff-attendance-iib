'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShieldAlert,
  Network,
  FileText,
  Clock,
  FolderArchive,
  SearchCheck,
  Globe,
  Zap,
  Cpu,
  CreditCard,
  ShieldCheck,
  Scale,
  Fingerprint,
  MapPin,
  Landmark,
  Users,
  LayoutDashboard,
  ChevronDown,
  ChevronRight,
  Folder,
} from 'lucide-react';
import { NavigationItem } from '@/types';
import { Tooltip } from '@/components/ui/Tooltip';

// Map string icon names to Lucide icon components
const iconMap: Record<string, React.ElementType> = {
  ShieldAlert,
  Network,
  FileText,
  Clock,
  FolderArchive,
  SearchCheck,
  Globe,
  Zap,
  Cpu,
  CreditCard,
  ShieldCheck,
  Scale,
  Fingerprint,
  MapPin,
  Landmark,
  Users,
  LayoutDashboard,
  Folder,
};

interface SidebarItemProps {
  item: NavigationItem;
  isCollapsed: boolean;
  onNavigate?: () => void;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  isCollapsed,
  onNavigate,
}) => {
  const pathname = usePathname();
  const hasChildren = Boolean(item.children && item.children.length > 0);
  const isChildActive = hasChildren
    ? item.children!.some((child) => pathname === child.route)
    : false;
  const isActive = pathname === item.route || isChildActive;

  // Submenu open/close state
  const [isOpen, setIsOpen] = useState<boolean>(isChildActive);

  const IconComponent = iconMap[item.iconName] || Folder;

  // Render when collapsed
  if (isCollapsed) {
    return (
      <div className="my-1 flex justify-center">
        <Tooltip content={item.title} side="right">
          <Link
            href={item.route}
            onClick={onNavigate}
            className={`flex items-center justify-center w-11 h-11 rounded-xl transition-all ${
              isActive
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <IconComponent className="w-5 h-5 shrink-0" />
          </Link>
        </Tooltip>
      </div>
    );
  }

  // Render when expanded
  return (
    <div className="my-0.5">
      <div
        className={`group flex items-center justify-between rounded-xl transition-all select-none ${
          isActive
            ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 font-semibold border border-blue-200/60 dark:border-blue-900/50'
            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:text-slate-950 dark:hover:text-white'
        }`}
      >
        <Link
          href={item.route}
          onClick={onNavigate}
          className="flex items-center gap-3 px-3 py-2.5 flex-1 min-w-0"
        >
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
              isActive
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200'
            }`}
          >
            <IconComponent className="w-4 h-4" />
          </div>

          <div className="flex-1 min-w-0 leading-tight">
            <span className="text-[13px] tracking-tight block truncate uppercase">
              {item.title}
            </span>
          </div>
        </Link>

        {hasChildren && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen((prev) => !prev);
            }}
            className="p-2 mr-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md transition-colors"
            aria-label="Toggle submenu"
          >
            {isOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {/* Submenu for nested children */}
      {hasChildren && isOpen && (
        <div className="pl-6 pr-1 py-1 space-y-1 mt-0.5 border-l-2 border-slate-200 dark:border-slate-800 ml-5">
          {item.children!.map((child) => {
            const isSubActive = pathname === child.route;
            return (
              <Link
                key={child.id}
                href={child.route}
                onClick={onNavigate}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-colors truncate ${
                  isSubActive
                    ? 'bg-blue-600 text-white font-medium shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isSubActive ? 'bg-white' : 'bg-slate-400'
                  }`}
                />
                <span className="truncate">{child.title}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};
