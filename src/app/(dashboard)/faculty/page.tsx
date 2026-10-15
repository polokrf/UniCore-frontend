import FacultyOverview from '@/components/modules/teacher/FacultyOverview';
import { Suspense } from 'react';

export const metadata = { title: 'Faculty dashboard | UniCore' };

export default function FacultyHomePage() {
  return (
    <Suspense>
      <FacultyOverview />
    </Suspense>
  );
}
