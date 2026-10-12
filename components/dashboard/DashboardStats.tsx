import React from 'react';
import { Users, UserCheck, Clock, UserX, CalendarOff } from 'lucide-react';
import { DashboardStats as StatsType } from '@/types';
import { StatCard } from './StatCard';

interface DashboardStatsProps {
  stats: StatsType;
  isLoading?: boolean;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  stats,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 mb-6">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 animate-pulse h-28"
          >
            <div className="w-1/2 h-3 bg-slate-200 dark:bg-slate-800 rounded-sm mb-4" />
            <div className="w-3/4 h-7 bg-slate-200 dark:bg-slate-800 rounded-sm" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 mb-6">
      <StatCard
        title="Жами ходимлар"
        value={stats.totalEmployees}
        subtitle="100%"
        colorScheme="blue"
        icon={<Users className="w-5 h-5" />}
      />

      <StatCard
        title="Бугун ишда"
        value={stats.presentToday}
        subtitle="фаол"
        colorScheme="green"
        icon={<UserCheck className="w-5 h-5" />}
      />

      <StatCard
        title="Кечикканлар"
        value={stats.lateToday}
        subtitle="назоратда"
        colorScheme="amber"
        icon={<Clock className="w-5 h-5" />}
      />

      <StatCard
        title="Ишда йўқлар"
        value={stats.absentToday}
        subtitle="сабабли"
        colorScheme="rose"
        icon={<UserX className="w-5 h-5" />}
      />

      <StatCard
        title="Таътилдагилар"
        value={stats.onVacation}
        subtitle="режавий"
        colorScheme="purple"
        icon={<CalendarOff className="w-5 h-5" />}
      />
    </div>
  );
};
