import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DepartmentPage } from '@/components/common/DepartmentPage';

export default function KattaqorgonShaharPage() {
  return (
    <MainLayout>
      <DepartmentPage
        departmentId="kattaqorgon-shahar"
        title="КАТТАҚЎРҒОН ШАҲАР"
        description="Каттақўрғон шаҳар ҳудуди бўйича тезкор ва профилактик хизмат ходимлари давомати"
        subTitle="Туманлараро бўлинмаси"
        parentTitle="Туманлараро бўлинмасига қайтиш"
        parentRoute="/tumanlararo"
      />
    </MainLayout>
  );
}
