import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DepartmentPage } from '@/components/common/DepartmentPage';

export default function KantselyariyaPage() {
  return (
    <MainLayout>
      <DepartmentPage
        departmentId="kantselyariya"
        title="КАНЦЕЛЯРИЯ"
        description="Девонхона ва ижро интизоми бўйича масъул ходимлар давомати"
        subTitle="Девонхона бўлинмаси"
      />
    </MainLayout>
  );
}
