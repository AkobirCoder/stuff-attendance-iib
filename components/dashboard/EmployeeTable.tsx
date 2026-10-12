'use client';

import React, { useState } from 'react';
import { Download, Printer, UserX, Shield, MapPin, Clock } from 'lucide-react';
import { Employee } from '@/types';
import { EmployeeRow } from './EmployeeRow';

interface EmployeeTableProps {
  employees: Employee[];
  isLoading?: boolean;
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  isLoading = false,
}) => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);

  // Skeleton Loader for Table
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <div className="w-36 h-4 bg-slate-200 dark:bg-slate-800 rounded-sm animate-pulse" />
          <div className="w-24 h-4 bg-slate-200 dark:bg-slate-800 rounded-sm animate-pulse" />
        </div>
        <div className="p-4 space-y-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-14 bg-slate-100 dark:bg-slate-800/60 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  // Empty State
  if (employees.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-12 text-center shadow-xs">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-4">
          <UserX className="w-7 h-7" />
        </div>
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
          Маълумот топилмади
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 max-w-sm mx-auto">
          Киритилган филтр ёки қидирув сўрови бўйича ҳеч қандай ходим топилмади. Илтимос, қидирувни ўзгартириб кўринг.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
      {/* Table Header Controls */}
      <div className="p-4 sm:px-6 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-900/50">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
            Кечки йўриқнома бўйича ходимлар рўйхати
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Давомат ва жойлашув назорати бўйича оператив маълумотнома
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 text-xs font-medium transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            Чоп этиш
          </button>
          <button
            type="button"
            onClick={() => {
              alert('Excel форматда юклаб олиш тайёрланмоқда (Демо режим)');
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Экспорт (Excel)
          </button>
        </div>
      </div>

      {/* Desktop View: Full Data Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-800/70 text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider sticky top-0 z-10 backdrop-blur-xs">
              <th scope="col" className="py-3.5 px-4 w-[28%]">
                Унвони, Ф.И.Ш
              </th>
              <th scope="col" className="py-3.5 px-4 w-[24%]">
                Эгаллаб турган лавозими
              </th>
              <th scope="col" className="py-3.5 px-4 w-[22%]">
                Кечки йўриқномада қаерда эканлиги
              </th>
              <th scope="col" className="py-3.5 px-4 w-[14%]">
                Муддати
              </th>
              <th scope="col" className="py-3.5 px-4 w-[12%]">
                Изоҳ
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {employees.map((emp) => (
              <EmployeeRow
                key={emp.id}
                employee={emp}
                isSelected={selectedEmployeeId === emp.id}
                onSelect={(selected) => setSelectedEmployeeId(selected.id)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet Card View (< 1024px) */}
      <div className="lg:hidden divide-y divide-slate-100 dark:divide-slate-800">
        {employees.map((emp) => (
          <div
            key={emp.id}
            onClick={() => setSelectedEmployeeId(emp.id)}
            className={`p-4 transition-colors ${
              selectedEmployeeId === emp.id
                ? 'bg-blue-50/60 dark:bg-blue-950/30'
                : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {emp.rank}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                    {emp.fullName}
                  </h4>
                </div>
              </div>
            </div>

            <div className="mt-3 space-y-2 text-xs">
              <div>
                <span className="text-[10px] font-semibold uppercase text-slate-400 block">
                  Лавозими:
                </span>
                <p className="font-medium text-slate-800 dark:text-slate-200">
                  {emp.position}
                </p>
                <p className="text-[11px] text-slate-400">{emp.departmentName}</p>
              </div>

              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-semibold uppercase text-slate-400 block">
                    Кечки йўриқнома жойлашуви:
                  </span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {emp.eveningInstructionLocation}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>{emp.duration}</span>
              </div>

              {emp.note && (
                <div className="pt-1 text-[11px] text-slate-500 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-800/40 p-2 rounded-md">
                  Изоҳ: &ldquo;{emp.note}&rdquo;
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Table Footer */}
      <div className="p-3.5 px-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
        <span>Жами кўрсатилмоқда: <b>{employees.length}</b> та ёзув</span>
        <span className="text-[11px]">Маълумотлар автоматик янгиланмоқда</span>
      </div>
    </div>
  );
};
