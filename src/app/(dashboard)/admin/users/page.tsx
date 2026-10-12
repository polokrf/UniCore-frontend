import { Suspense } from 'react';
import { SkeletonText } from '@/components/layout/loading/SkeletonText';
import { ManageUserTab } from '@/components/modules/adminDashboard/manageUser/MangeUserTab';

const UsersPage = () => {
  return (
    <div>
      <Suspense fallback={<SkeletonText />}><ManageUserTab /></Suspense>
    </div>
  );
};

export default UsersPage;
