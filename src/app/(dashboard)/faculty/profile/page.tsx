import FacultyProfile from '@/components/modules/faculty/FacultyProfile';
import PageHeader from '@/components/shared/PageHeader';

export const metadata = { title: 'Faculty profile | UniCore' };

export default function FacultyProfilePage() {
  return (
    <>
      <PageHeader title="Faculty Profile" description="Your details and settings." />
      <FacultyProfile />
    </>
  );
}
