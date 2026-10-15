'use client'
import { useMyEnrollments } from '@/hooks/student.hook';
import React from 'react';
import MyCoursesTable from './MyCoursesTable';

const MyCourseComponents = () => {
  const {data:enrollments=[]}=useMyEnrollments()
  return (
    <div>
      <MyCoursesTable enrollments={enrollments}/>
    </div>
  );
};

export default MyCourseComponents;