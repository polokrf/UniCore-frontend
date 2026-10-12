import StudentOverview from '@/components/modules/student/StudentOverview';
import { Suspense } from 'react';

export const metadata = { title: 'Student dashboard | UniCore' };

export default function StudentHomePage() {
  return (
    <Suspense>
      <StudentOverview />
    </Suspense>
  );
}
