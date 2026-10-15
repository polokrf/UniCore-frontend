import FacultyLoad from '@/components/modules/teacher/FacultyLoad';
import PageHeader from '@/components/shared/PageHeader';

export const metadata = { title: 'Course load | UniCore' };

export default function FacultyLoadPage() {
  return (
    <>
      <PageHeader
        title="Course Load"
        description="Your teaching load: credits and weekly contact hours per course."
      />
      <FacultyLoad />
    </>
  );
}
