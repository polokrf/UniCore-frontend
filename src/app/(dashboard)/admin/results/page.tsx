import { Suspense } from 'react';
import { SkeletonText } from '@/components/layout/loading/SkeletonText';
import ResultTab from '@/components/modules/adminDashboard/result/ResultTab';
import React from 'react';

const ResultPage = () => {
  return (
    <div>
      <Suspense fallback={<SkeletonText />}><ResultTab/></Suspense>
    </div>
  );
};

export default ResultPage;