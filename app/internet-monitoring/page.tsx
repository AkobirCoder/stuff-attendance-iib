import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DepartmentPage } from '@/components/common/DepartmentPage';

export default function InternetMonitoringPage() {
  return (
    <MainLayout>
      <DepartmentPage
        departmentId="internet-monitoring"
        title="ИНТЕРНЕТ МОНИТОРИНГИ ГУРУҲИ"
        description="Интернет тармоғи ва ижтимоий тармоқлар мониторинги бўйича мутахассисларнинг кунлик сменаси"
        subTitle="Мониторинг маркази"
      />
    </MainLayout>
  );
}
