import PageHeader from '@/components/shared/PageHeader';
import StudentPayments from '@/components/modules/student/StudentPayments';

export const metadata = { title: 'Payments | UniCore' };

export default function StudentPaymentsPage() {
  return (
    <>
      <PageHeader
        title="Tuition Fee Payment"
        description="Pay course fees with bKash and see what you have already paid."
      />
      <StudentPayments />
    </>
  );
}
