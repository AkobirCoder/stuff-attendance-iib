'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Users, Clock, Plus, Layers, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Employee } from '@/types';
import { attendanceService } from '@/services/attendanceService';
import { EmployeeTable } from '@/components/dashboard/EmployeeTable';
import { StatCard } from '@/components/dashboard/StatCard';

interface DepartmentPageProps {
  departmentId: string;
  title: string;
  description: string;
  subTitle?: string;
  parentTitle?: string;
  parentRoute?: string;
}

export const DepartmentPage: React.FC<DepartmentPageProps> = ({
  departmentId,
  title,
  description,
  subTitle,
  parentTitle,
  parentRoute,
}) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setIsLoading(true);
      try {
        const data = await attendanceService.getEmployees({
          departmentId,
        });
        if (isMounted) {
          setEmployees(data);
        }
      } catch (err) {
        console.error('Error fetching department employees:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [departmentId]);

  return (
    <div className="space-y-6">
      {/* Back button if nested */}
      {parentRoute && (
        <Link
          href={parentRoute}
          className="inline-flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {parentTitle || 'Ортга қайтиш'}
        </Link>
      )}

      {/* Page Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded-sm">
              Бўлим назорати
            </span>
            {subTitle && (
              <span className="text-xs text-slate-400">/ {subTitle}</span>
            )}
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => {
              alert('Янги ходим қўшиш модули (Демо режим)');
            }}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            Ходим бириктириш
          </button>
        </div>
      </div>

      {/* Department Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <StatCard
          title="Штатдаги ходимлар"
          value={employees.length > 0 ? employees.length : '12'}
          subtitle="штат бирлиги"
          colorScheme="blue"
          icon={<Users className="w-4 h-4" />}
        />
        <StatCard
          title="Йўриқномада"
          value={employees.length > 0 ? employees.length : '10'}
          subtitle="навбатчиликда"
          colorScheme="green"
          icon={<Clock className="w-4 h-4" />}
        />
        <StatCard
          title="Хизмат сафарида"
          value={departmentId === 'kiberprofilaktika' ? '1' : '0'}
          subtitle="сафарда"
          colorScheme="purple"
          icon={<Shield className="w-4 h-4" />}
        />
        <StatCard
          title="Тизим интеграцияси"
          value="API Ready"
          subtitle="тайёр ҳолатда"
          colorScheme="amber"
          icon={<Layers className="w-4 h-4" />}
        />
      </div>

      {/* Department Staff List Table or Empty Placeholder */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Бўлим бўйича бириктирилган ходимлар ва давомат
          </h2>
          <span className="text-xs text-slate-400">
            {employees.length} та ёзув топилди
          </span>
        </div>

        {employees.length > 0 ? (
          <EmployeeTable employees={employees} isLoading={isLoading} />
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-10 text-center shadow-xs">
            <div className="w-12 h-12 mx-auto rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white uppercase">
              {title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
              Ушбу бўлим учун ҳозирча алоҳида ходим бириктирилмаган ёки барча ходимлар асосий штаб навбатчилигида рўйхатга олинган.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300 font-medium">
              <span>Модул API уланишига тўлиқ тайёр</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
