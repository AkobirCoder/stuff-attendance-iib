import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DepartmentPage } from '@/components/common/DepartmentPage';

export default function TezkorIshlovPage() {
  return (
    <MainLayout>
      <DepartmentPage
        departmentId="tezkor-ishlov"
        title="ТЕЗКОР ИШЛОВГА ОЛИШ ГУРУҲИ"
        description="Тезкор ахборотларга ишлов бериш ва аналитик таҳлил гуруҳи ходимлари давомати"
        subTitle="Аналитика ва ишлов гуруҳи"
      />
    </MainLayout>
  );
}
