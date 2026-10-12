import React from 'react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  subtitle?: string;
  colorScheme?: 'blue' | 'green' | 'amber' | 'rose' | 'purple';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  subtitle,
  colorScheme = 'blue',
}) => {
  const schemeStyles = {
    blue: {
      border: 'border-blue-100 dark:border-blue-900/40',
      iconBg: 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400',
      accent: 'text-blue-600 dark:text-blue-400',
    },
    green: {
      border: 'border-emerald-100 dark:border-emerald-900/40',
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400',
      accent: 'text-emerald-600 dark:text-emerald-400',
    },
    amber: {
      border: 'border-amber-100 dark:border-amber-900/40',
      iconBg: 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400',
      accent: 'text-amber-600 dark:text-amber-400',
    },
    rose: {
      border: 'border-rose-100 dark:border-rose-900/40',
      iconBg: 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400',
      accent: 'text-rose-600 dark:text-rose-400',
    },
    purple: {
      border: 'border-purple-100 dark:border-purple-900/40',
      iconBg: 'bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400',
      accent: 'text-purple-600 dark:text-purple-400',
    },
  };

  const current = schemeStyles[colorScheme];

  return (
    <div
      className={`bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-5 border ${current.border} shadow-xs hover:shadow-md transition-shadow relative overflow-hidden`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {value}
            </span>
            {subtitle && (
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {subtitle}
              </span>
            )}
          </div>
        </div>

        <div className={`p-3 rounded-xl ${current.iconBg} shrink-0`}>
          {icon}
        </div>
      </div>
    </div>
  );
};
