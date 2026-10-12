import React from 'react';
import Link from 'next/link';
import { MapPin, ChevronRight, Users } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DepartmentPage } from '@/components/common/DepartmentPage';

const subDistricts = [
  {
    title: 'Каттақўрғон шаҳар',
    route: '/tumanlararo/kattaqorgon-shahar',
    staffCount: '6 та ходим',
  },
  {
    title: 'Каттақўрғон тумани',
    route: '/tumanlararo/kattaqorgon',
    staffCount: '8 та ходим',
  },
  {
    title: 'Нарпай тумани',
    route: '/tumanlararo/narpay',
    staffCount: '7 та ходим',
  },
  {
    title: 'Пахтачи тумани',
    route: '/tumanlararo/paxtachi',
    staffCount: '5 та ходим',
  },
  {
    title: 'Қўшработ тумани',
    route: '/tumanlararo/qoshrabot',
    staffCount: '5 та ходим',
  },
];

export default function TumanlararoPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <DepartmentPage
          departmentId="tumanlararo"
          title="ТУМАНЛАРАРО БЎЛИНМАСИ"
          description="Ҳудудий туманлараро бўлинмалар мувофиқлаштируви ва ҳудудлар кесимида давомат"
          subTitle="Ҳудудий мувофиқлаштирув"
        />

        {/* Sub-districts quick navigation grid */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            Ҳудудий бўлинмалар таркиби
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {subDistricts.map((sub) => (
              <Link
                key={sub.route}
                href={sub.route}
                className="group flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 transition-all shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {sub.title}
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      {sub.staffCount}
                    </span>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
