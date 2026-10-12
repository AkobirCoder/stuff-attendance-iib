import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DepartmentPage } from '@/components/common/DepartmentPage';

export default function TezkorTexnikPage() {
  return (
    <MainLayout>
      <DepartmentPage
        departmentId="tezkor-texnik"
        title="ТЕЗКОР-ТЕХНИК ВА НООШКОРА ФАОЛИЯТНИ ТАЪМИНЛАШ ГУРУҲИ"
        description="Махсус техник воситалар ва ноошкора фаолиятни таъминлаш гуруҳи ходимлари рўйхати"
        subTitle="Техник таъминот гуруҳи"
      />
    </MainLayout>
  );
}
