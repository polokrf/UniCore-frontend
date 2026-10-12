import OfferingTable from '@/components/modules/adminDashboard/courseOffering/OfferingTable';
import PageHeader from '@/components/shared/PageHeader';
import { Suspense } from 'react';

export const metadata = { title: 'Course offerings | UniCore' };

export default function AllCourseOfferingPage() {
  return (
    <div className="p-4">
      <PageHeader
        title="Course offerings"
        description="See every offering and assign or change its teacher."
      />
      {/* useSearchParams (URL-synced filters) must sit inside Suspense */}
      <Suspense fallback={null}>
        <OfferingTable />
      </Suspense>
    </div>
  );
}
