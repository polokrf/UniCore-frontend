import PageHeader from '@/components/shared/PageHeader';
import StudentProfile from '@/components/modules/student/StudentProfile';

export const metadata = { title: 'Student profile | UniCore' };

export default function StudentProfilePage() {
  return (
    <>
      <PageHeader title="Student Profile" description="Your details and settings." />
      <StudentProfile />
    </>
  );
}
