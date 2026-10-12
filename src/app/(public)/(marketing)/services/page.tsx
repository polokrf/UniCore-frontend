import PageHeader from '@/components/shared/PageHeader';

export const metadata = { title: 'Academic Programs | UniCore' };

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Academic Programs & Courses"
        description="Browse departments and the courses they offer."
      />
    </div>
  );
}
