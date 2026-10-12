import ManageHub from '@/components/modules/adminDashboard/manage/ManageHub';
import PageHeader from '@/components/shared/PageHeader';
import { Suspense } from 'react';

export const metadata = { title: 'Manage | UniCore' };

export default function AdminManagePage() {
  return (
    <>
      <PageHeader title="Manage" description="Departments, class routine and every management section." />
      <Suspense>
        <ManageHub />
      </Suspense>
    </>
  );
}
