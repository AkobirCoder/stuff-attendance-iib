import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DepartmentPage } from '@/components/common/DepartmentPage';

export default function PaxtachiPage() {
  return (
    <MainLayout>
      <DepartmentPage
        departmentId="paxtachi"
        title="ПАХТАЧИ ТУМАНИ"
        description="Пахтачи тумани бўйича тезкор ва профилактик хизмат ходимлари давомати"
        subTitle="Туманлараро бўлинмаси"
        parentTitle="Туманлараро бўлинмасига қайтиш"
        parentRoute="/tumanlararo"
      />
    </MainLayout>
  );
}
