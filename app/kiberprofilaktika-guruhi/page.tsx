import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DepartmentPage } from '@/components/common/DepartmentPage';

export default function KiberprofilaktikaGuruhiPage() {
  return (
    <MainLayout>
      <DepartmentPage
        departmentId="kiberprofilaktika-guruhi"
        title="КИБЕРПРОФИЛАКТИКА ГУРУҲИ"
        description="Киберпрофилактика бўйича оператив ва жойларда тарғибот ўтказувчи гуруҳ ходимлари"
        subTitle="Профилактика гуруҳи"
      />
    </MainLayout>
  );
}
