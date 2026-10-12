import DepartmentDetails from '@/components/modules/info/department/DepartmentDetails';
import React, { Suspense } from 'react';

const DepartmentDetailsPage =async ({params}:{
  params: Promise<{ id: string }>;
}) => {
const id = (await params).id
  return (
    <div>
      <Suspense fallback={<p>loading...</p>}>
        <DepartmentDetails id={id} />
      </Suspense>
    </div>
  );
};

export default DepartmentDetailsPage;