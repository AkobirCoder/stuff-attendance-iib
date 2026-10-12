import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DepartmentPage } from '@/components/common/DepartmentPage';

export default function QoshrabotPage() {
  return (
    <MainLayout>
      <DepartmentPage
        departmentId="qoshrabot"
        title="ҚЎШРАБОТ ТУМАНИ"
        description="Қўшработ тумани бўйича тезкор ва профилактик хизмат ходимлари давомати"
        subTitle="Туманлараро бўлинмаси"
        parentTitle="Туманлараро бўлинмасига қайтиш"
        parentRoute="/tumanlararo"
      />
    </MainLayout>
  );
}
