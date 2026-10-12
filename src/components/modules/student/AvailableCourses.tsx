'use client';

import EmptyState from '@/components/shared/EmptyState';
import UrlPagination from '@/components/shared/UrlPagination';
import UrlSearch from '@/components/shared/UrlSearch';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SkeletonText } from '@/components/layout/loading/SkeletonText';
import { useOfferings } from '@/hooks/catalog.hook';
import { useEnrollNow } from '@/hooks/student.hook';
import { useUrlParams } from '@/hooks/use-url-params';
import { formatBdt } from '@/lib/format';
import { TMyEnrollment } from '@/type/domain.type';

const PAGE_SIZE = 6;

const SORTS = [
  { value: 'code', label: 'Course code' },
  { value: 'fee-asc', label: 'Fee: low to high' },
  { value: 'fee-desc', label: 'Fee: high to low' },
];

// Search, sort and page all live in the URL: ?search=data&sort=fee-asc&page=2
export default function AvailableCourses({
  enrollments,
}: {
  enrollments: TMyEnrollment[];
}) {
  const { data: offerings, isPending, isError } = useOfferings();
  const { mutate: enroll, isPending: enrolling, variables } = useEnrollNow();
  const { get, getNumber, set } = useUrlParams();

  const search = get('search').toLowerCase();
  const sort = get('sort', 'code');
  const page = getNumber('page', 1);

  if (isPending) return <SkeletonText />;
  if (isError || !offerings) {
    return <EmptyState title="Could not load courses" description="Please refresh the page." />;
  }

  // The backend refuses a second enrollment for the same offering (even a
  // cancelled one), so anything already enrolled is left out of this list.
  const taken = new Set(enrollments.map(e => e.courseOfferingId));
  const filtered = offerings
    .filter(o => !taken.has(o.id))
    .filter(
      o =>
        !search ||
        o.course?.code.toLowerCase().includes(search) ||
        o.course?.title.toLowerCase().includes(search),
    )
    .sort((a, b) => {
      if (sort === 'fee-asc') return Number(a.fee) - Number(b.fee);
      if (sort === 'fee-desc') return Number(b.fee) - Number(a.fee);
      return (a.course?.code ?? '').localeCompare(b.course?.code ?? '');
    });

  const totalPage = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPage);
  const rows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <UrlSearch placeholder="Search by course code or title" className="sm:max-w-xs" />
        <select
          aria-label="Sort courses"
          value={sort}
          onChange={e => set({ sort: e.target.value === 'code' ? '' : e.target.value })}
          className="bg-background h-8 rounded-md border px-2 text-xs"
        >
          {SORTS.map(s => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {rows.length === 0 ? (
        <EmptyState
          title="No courses to show"
          description="Try a different search, or you may already be enrolled in everything on offer."
        />
      ) : (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {rows.map(o => (
            <Card key={o.id}>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-semibold">
                    {o.course?.code} · {o.course?.title}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Section {o.section} · {o.course?.credit} credits · Capacity{' '}
                    {o.capacity ?? '—'}
                  </p>
                </div>
                <p className="text-muted-foreground line-clamp-2 text-xs">
                  {o.course?.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{formatBdt(o.fee)}</span>
                  <Button
                    size="sm"
                    disabled={enrolling && variables === o.id}
                    onClick={() => enroll(o.id)}
                  >
                    {enrolling && variables === o.id ? 'Enrolling…' : 'Enroll'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <UrlPagination page={current} totalPage={totalPage} />
    </div>
  );
}
