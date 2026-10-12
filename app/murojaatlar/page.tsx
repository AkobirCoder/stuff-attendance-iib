import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DepartmentPage } from '@/components/common/DepartmentPage';

export default function MurojaatlarPage() {
  return (
    <MainLayout>
      <DepartmentPage
        departmentId="murojaatlar"
        title="МУРОЖААТЛАР БИЛАН ИШЛАШ ГУРУҲИ"
        description="Жисмоний ва юридик шахслар мурожаатлари билан ишлаш гуруҳи ходимлари давомати"
        subTitle="Мурожаатлар маркази"
      />
    </MainLayout>
  );
}
