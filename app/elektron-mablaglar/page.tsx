import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DepartmentPage } from '@/components/common/DepartmentPage';

export default function ElektronMablaglarPage() {
  return (
    <MainLayout>
      <DepartmentPage
        departmentId="elektron-mablaglar"
        title="ЭЛЕКТРОН МАБЛАҒЛАРНИ ТАЛОН-ТОРОЖ ҚИЛИНИШИГА ҚАРШИ КУРАШИШ БЎЛИНМАСИ"
        description="Банк карталари ва электрон тўлов тизимларидаги талон-торожликларга қарши курашиш бўлинмаси"
        subTitle="Молиявий хавфсизлик бўлинмаси"
      />
    </MainLayout>
  );
}
