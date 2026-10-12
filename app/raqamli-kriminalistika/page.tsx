import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DepartmentPage } from '@/components/common/DepartmentPage';

export default function RaqamliKriminalistikaPage() {
  return (
    <MainLayout>
      <DepartmentPage
        departmentId="raqamli-kriminalistika"
        title="РАҚАМЛИ КРИМИНАЛИСТИКА МАРКАЗИ"
        description="Суд-компьютер экспертизаси ва рақамли далилларни тадқиқ қилиш маркази экспертлари давомати"
        subTitle="Криминалистика маркази"
      />
    </MainLayout>
  );
}
