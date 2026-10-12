import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DepartmentPage } from '@/components/common/DepartmentPage';

export default function KattaqorgonTumanPage() {
  return (
    <MainLayout>
      <DepartmentPage
        departmentId="kattaqorgon"
        title="КАТТАҚЎРҒОН ТУМАНИ"
        description="Каттақўрғон тумани бўйича тезкор ва профилактик хизмат ходимлари давомати"
        subTitle="Туманлараро бўлинмаси"
        parentTitle="Туманлараро бўлинмасига қайтиш"
        parentRoute="/tumanlararo"
      />
    </MainLayout>
  );
}
