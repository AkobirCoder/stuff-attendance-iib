import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DepartmentPage } from '@/components/common/DepartmentPage';

export default function NarpayPage() {
  return (
    <MainLayout>
      <DepartmentPage
        departmentId="narpay"
        title="НАРПАЙ ТУМАНИ"
        description="Нарпай тумани бўйича тезкор ва профилактик хизмат ходимлари давомати"
        subTitle="Туманлараро бўлинмаси"
        parentTitle="Туманлараро бўлинмасига қайтиш"
        parentRoute="/tumanlararo"
      />
    </MainLayout>
  );
}
