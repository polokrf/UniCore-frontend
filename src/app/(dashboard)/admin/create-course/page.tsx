import CreateCourseForm from '@/components/modules/adminDashboard/create-course/CreateCourseForm';
import React from 'react';

const CreateCourse = () => {
  return (
    <div className="sm:max-w-xl  w-full md:p-4  p-2 shadow-sm rounded-sm mx-auto">
      <CreateCourseForm />
    </div>
  );
};

export default CreateCourse;