import AdminReports from '@/components/modules/adminDashboard/overview/AdminReports';
import PageHeader from '@/components/shared/PageHeader';

export const metadata = { title: 'Reports | UniCore' };

export default function AdminReportsPage() {
  return (
    <>
      <PageHeader title="Reports" description="Approvals, payments, recent activity and system info." />
      <AdminReports />
    </>
  );
}
