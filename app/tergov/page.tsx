import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DepartmentPage } from '@/components/common/DepartmentPage';

export default function TergovPage() {
  return (
    <MainLayout>
      <DepartmentPage
        departmentId="tergov"
        title="ТЕРГОВ БЎЛИМИ"
        description="Тергов бўлими терговчилари, навбатчи тергов гуруҳлари ва тергов ҳаракатлари давомати"
        subTitle="Тергов бошқармаси"
      />
    </MainLayout>
  );
}
