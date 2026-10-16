import ApplicationStatus from '@/components/modules/application/ApplicationStatus';
import PageHeader from '@/components/shared/PageHeader';

export const metadata = { title: 'My application | UniCore' };

export default function ApplicationPage() {
  return (
    <div className="mx-auto w-full max-w-xl my-16">
      <PageHeader
        title="My application"
        description="Track your student or faculty application."
      />
      <ApplicationStatus />
    </div>
  );
}
