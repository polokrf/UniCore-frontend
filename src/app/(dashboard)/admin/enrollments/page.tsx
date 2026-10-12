import { Suspense } from 'react';
import { SkeletonText } from '@/components/layout/loading/SkeletonText';

import EnrollmentTab from '@/components/modules/adminDashboard/enrollment/EnrollmentTab';
import React from 'react';

const EnrollmentsPage = () => {
  return (
    <div>
      <Suspense fallback={<SkeletonText />}><EnrollmentTab/></Suspense>
    </div>
  );
};

export default EnrollmentsPage;