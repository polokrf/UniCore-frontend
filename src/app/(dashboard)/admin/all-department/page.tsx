import { Suspense } from 'react';
import { SkeletonText } from '@/components/layout/loading/SkeletonText';
import AllDepartmentTab from '@/components/modules/adminDashboard/AllDepartment/AllDepartmentTab';
import AllDepartmentTable from '@/components/modules/adminDashboard/AllDepartment/AllDepartmentTable';
import React from 'react';

const AllDepartment = () => {
  return (
    <div>
      <Suspense fallback={<SkeletonText />}><AllDepartmentTab/></Suspense>
    </div>
  );
};

export default AllDepartment;