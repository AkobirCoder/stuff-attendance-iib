import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DepartmentPage } from '@/components/common/DepartmentPage';

export default function TezkorQidiruvPage() {
  return (
    <MainLayout>
      <DepartmentPage
        departmentId="tezkor-qidiruv"
        title="ТЕЗКОР-ҚИДИРУВ БЎЛИМИ КИБЕРЖИНОЯТЛАРНИ ФОШ ЭТИШ БЎЛИНМАСИ"
        description="Кибержиноятларни фош этиш бўлинмаси тезкор ходимлари ва рейд тадбирлари давомати"
        subTitle="Тезкор бошқарма"
      />
    </MainLayout>
  );
}
