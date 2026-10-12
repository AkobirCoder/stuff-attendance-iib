import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DepartmentPage } from '@/components/common/DepartmentPage';

export default function NavbatchilikPage() {
  return (
    <MainLayout>
      <DepartmentPage
        departmentId="navbatchilik"
        title="НАВБАТЧИЛИК ҚИСМИ"
        description="Марказий навбатчилик қисми суткалик навбатчи ходимлари ва сменалар тақсимоти"
        subTitle="Марказий пункт"
      />
    </MainLayout>
  );
}
