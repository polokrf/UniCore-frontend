import { Suspense } from 'react';
import { SkeletonText } from '@/components/layout/loading/SkeletonText';
import ApprovedTeacherTab from '@/components/modules/adminDashboard/approvedTeacher/ApprovedTeacherTab';
import React from 'react';

const ApprovedTeacherPage = () => {
  return (
    <div>
      <Suspense fallback={<SkeletonText />}><ApprovedTeacherTab/></Suspense>
    </div>
  );
};

export default ApprovedTeacherPage;