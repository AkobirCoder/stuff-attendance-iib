import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DepartmentPage } from '@/components/common/DepartmentPage';

export default function TashkiliyMuvofiqlashtirishPage() {
  return (
    <MainLayout>
      <DepartmentPage
        departmentId="tashkiliy-muvofiqlashtirish"
        title="ТАШКИЛИЙ-МУВОФИҚЛАШТИРИШ БЎЛИМИ"
        description="Ташкилий-мувофиқлаштириш бўлими ходимлари, навбатчилик ва режавий тадбирлар мувофиқлаштируви"
        subTitle="Мувофиқлаштириш бошқармаси"
      />
    </MainLayout>
  );
}
