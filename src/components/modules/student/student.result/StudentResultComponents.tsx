'use client';
import React from 'react';
import ResultsTable from './ResultsTable';
import { useGetResults } from '@/hooks/admin-hook/admin.access.hooks';
import { useMyEnrollments, useMyResults } from '@/hooks/student.hook';

const StudentResultComponents = () => {
  const { data: results = [] } = useMyResults();
  const { data: enrollment = [] } = useMyEnrollments();
  return (
    <div>
      <ResultsTable results={results} enrollments={enrollment} />
    </div>
  );
};

export default StudentResultComponents;
