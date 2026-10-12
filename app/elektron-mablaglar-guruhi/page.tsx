import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DepartmentPage } from '@/components/common/DepartmentPage';

export default function ElektronMablaglarGuruhiPage() {
  return (
    <MainLayout>
      <DepartmentPage
        departmentId="elektron-mablaglar-guruhi"
        title="ЭЛЕКТРОН МАБЛАҒЛАРНИ ТАЛОН-ТОРОЖ ҚИЛИНИШИГА ҚАРШИ КУРАШИШ ГУРУҲИ"
        description="Ҳудудий электрон маблағлар талон-торожига қарши курашиш тезкор гуруҳи ходимлари давомати"
        subTitle="Тезкор гуруҳ"
      />
    </MainLayout>
  );
}
