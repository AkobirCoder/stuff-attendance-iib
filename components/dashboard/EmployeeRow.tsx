'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin, Clock, Shield, Phone } from 'lucide-react';
import { Employee } from '@/types';

interface EmployeeRowProps {
  employee: Employee;
  isSelected?: boolean;
  onSelect?: (employee: Employee) => void;
}

export const EmployeeRow: React.FC<EmployeeRowProps> = ({
  employee,
  isSelected = false,
  onSelect,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Rank badge styling helper
  const getRankBadgeStyle = (rank: string) => {
    if (rank.includes('Полковник') || rank.includes('Подполковник')) {
      return 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800';
    }
    if (rank.includes('Майор')) {
      return 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';
    }
    if (rank.includes('Капитан')) {
      return 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
    }
    return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
  };

  return (
    <>
      <tr
        onClick={() => {
          onSelect?.(employee);
          setIsExpanded((prev) => !prev);
        }}
        className={`group cursor-pointer transition-colors border-b border-slate-100 dark:border-slate-800/80 ${
          isSelected
            ? 'bg-blue-50/70 dark:bg-blue-950/30'
            : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
        }`}
      >
        {/* 1. Унвони, Ф.И.Ш */}
        <td className="py-3.5 px-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Shield className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-sm border ${getRankBadgeStyle(
                    employee.rank
                  )}`}
                >
                  {employee.rank}
                </span>
                {employee.badgeNumber && (
                  <span className="text-[10px] text-slate-400 font-mono">
                    #{employee.badgeNumber}
                  </span>
                )}
              </div>
              <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight mt-1 truncate">
                {employee.fullName}
              </p>
            </div>
          </div>
        </td>

        {/* 2. Эгаллаб турган лавозими */}
        <td className="py-3.5 px-4 text-xs text-slate-700 dark:text-slate-300">
          <p className="font-medium text-slate-800 dark:text-slate-200 line-clamp-2">
            {employee.position}
          </p>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 block mt-0.5 truncate">
            {employee.departmentName}
          </span>
        </td>

        {/* 3. Кечки йўриқномада қаерда эканлиги */}
        <td className="py-3.5 px-4 text-xs">
          <div className="flex items-start gap-1.5 text-slate-800 dark:text-slate-200">
            <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
            <span className="font-medium">{employee.eveningInstructionLocation}</span>
          </div>
        </td>

        {/* 4. Муддати */}
        <td className="py-3.5 px-4 text-xs text-slate-600 dark:text-slate-300 whitespace-nowrap">
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span>{employee.duration}</span>
          </div>
        </td>

        {/* 5. Изоҳ */}
        <td className="py-3.5 px-4 text-xs text-slate-500 dark:text-slate-400 max-w-xs">
          <div className="flex items-center justify-between gap-2">
            <span className="truncate block" title={employee.note}>
              {employee.note || '—'}
            </span>
            <button
              type="button"
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 shrink-0"
              aria-label="Expand details"
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        </td>
      </tr>

      {/* Expanded Accordion Details */}
      {isExpanded && (
        <tr className="bg-slate-50/80 dark:bg-slate-800/20 border-b border-slate-200 dark:border-slate-800">
          <td colSpan={5} className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Алоқа ва гувоҳнома:
                </span>
                <p className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-medium">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {employee.phone || 'Кўрсатилмаган'}
                </p>
                <p className="text-slate-500 dark:text-slate-400">
                  Жетон / Рақам: {employee.badgeNumber || 'IIB-XXXX'}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Йўриқнома тафсилоти:
                </span>
                <p className="text-slate-700 dark:text-slate-200">
                  Жойлашув: <b>{employee.eveningInstructionLocation}</b>
                </p>
                <p className="text-slate-500 dark:text-slate-400">
                  Белгиланган муддат: <b>{employee.duration}</b>
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Тўлиқ изоҳ ва кўрсатма:
                </span>
                <p className="text-slate-700 dark:text-slate-200 italic">
                  &ldquo;{employee.note}&rdquo;
                </p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};
