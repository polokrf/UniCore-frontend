import SemesterForm from '@/components/modules/adminDashboard/semester/SemesterForm';
import React from 'react';

const CreateSemesterPage = () => {
  return (
    <div className="sm:max-w-xl  w-full md:p-4  p-2 shadow-sm rounded-sm mx-auto">
      <SemesterForm/>
    </div>
  );
};

export default CreateSemesterPage;