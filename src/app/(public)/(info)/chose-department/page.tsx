
import Department from '@/components/modules/info/department/Department';
import { useGetDepartment } from '@/hooks/department.hook';
import React, { Suspense } from 'react';

const DepartmentPage = () => {
  
  return (
    <div>
      <Suspense fallback={<p>loading...</p>}>
        <Department />
      </Suspense>
    </div>
  );
};

export default DepartmentPage;