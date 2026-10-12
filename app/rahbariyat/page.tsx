import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DepartmentPage } from '@/components/common/DepartmentPage';

export default function RahbariyatPage() {
  return (
    <MainLayout>
      <DepartmentPage
        departmentId="rahbariyat"
        title="РАҲБАРИЯТ"
        description="Бошқарма раҳбарияти, кунлик йўриқномалар ва масъул раҳбарлар давомати назорати"
        subTitle="Бошқарма аппарати"
      />
    </MainLayout>
  );
}
