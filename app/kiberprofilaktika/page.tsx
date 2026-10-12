import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DepartmentPage } from '@/components/common/DepartmentPage';

export default function KiberprofilaktikaPage() {
  return (
    <MainLayout>
      <DepartmentPage
        departmentId="kiberprofilaktika"
        title="КИБЕРПРОФИЛАКТИКА БЎЛИМИ"
        description="Кибержиноятчилик профилактикаси бўлими ходимлари, хизмат сафарлари ва тарғибот тадбирлари"
        subTitle="Профилактика бошқармаси"
      />
    </MainLayout>
  );
}
