import { Suspense } from 'react';
import { SkeletonText } from '@/components/layout/loading/SkeletonText';
import ApprovedStudentTab from '@/components/modules/adminDashboard/approvedStudent/ApprovedStudentTab';
import React from 'react';

const ApprovedStudentPage = () => {
  return (
    <div>
      <Suspense fallback={<SkeletonText />}><ApprovedStudentTab/></Suspense>
    </div>
  );
};

export default ApprovedStudentPage;