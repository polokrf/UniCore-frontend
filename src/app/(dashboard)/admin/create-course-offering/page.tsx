'use client'

import CourseOfferingForm from '@/components/modules/adminDashboard/courseOffering/CourseOfferingForm';
import React from 'react';

const CreateCourseOffering = () => {
  return (
    <div className="sm:max-w-xl  w-full md:p-4  p-2 shadow-sm rounded-sm mx-auto">
      <CourseOfferingForm/>
    </div>
  );
};

export default CreateCourseOffering;