import CreateDepartmentForm from '@/components/modules/adminDashboard/create-department/CreateDepartmentForm';
import React from 'react';

const CreateDepartmentPage = () => {
  return (
    <div className="sm:max-w-xl  w-full md:p-4  p-2 shadow-sm rounded-sm mx-auto">
      <CreateDepartmentForm/>
    </div>
  );
};

export default CreateDepartmentPage;