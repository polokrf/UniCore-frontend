'use client';

import EmptyState from '@/components/shared/EmptyState';
import StatusBadge from '@/components/shared/StatusBadge';
import UrlPagination from '@/components/shared/UrlPagination';
import UrlSearch from '@/components/shared/UrlSearch';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useMyOfferings, useRoster } from '@/hooks/faculty.hook';
import { useUrlParams } from '@/hooks/use-url-params';
import { errorMessage, formatDate } from '@/lib/format';

const STATUSES = [
  { value: '', label: 'All' },
  { value: 'CONFIRMED', label: 'Confirmed' },
  { value: 'PENDING', label: 'Pending' },
];
const LIMIT = 10;

// Everything (course, search, status, page) lives in the URL:
//   /faculty?tab=roster&course=<offeringId>&status=PENDING&search=ali&page=2
export default function ClassRoster() {
  const { mine } = useMyOfferings();
  const { get, getNumber, set } = useUrlParams();

  const requested = get('course');
  const offeringId = mine.some(o => o.id === requested) ? requested : mine[0]?.id;
  const status = ['CONFIRMED', 'PENDING'].includes(get('status')) ? get('status') : '';
  const search = get('search');
  const page = getNumber('page', 1);

  const { data, isPending, isError, error, isPlaceholderData } = useRoster(offeringId, {
    page,
    limit: LIMIT,
    search,
    status,
  });

  if (mine.length === 0) {
    return (
      <EmptyState
        title="No courses assigned yet"
        description="Once an admin assigns you to a course, its class roster appears here."
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3">
        <label className="grid gap-1 text-xs font-medium">
          Course
          <select
            value={offeringId}
            onChange={e => set({ course: e.target.value })}
            className="border-input bg-background h-8 min-w-56 rounded-lg border px-2 text-sm"
          >
            {mine.map(o => (
              <option key={o.id} value={o.id}>
                {o.course?.code} · {o.course?.title} (Sec {o.section})
              </option>
            ))}
          </select>
        </label>
        <div className="grid gap-1 text-xs font-medium">
          Status
          <div className="flex gap-1">
            {STATUSES.map(s => (
              <Button
                key={s.value || 'all'}
                size="sm"
                variant={status === s.value ? 'default' : 'outline'}
                onClick={() => set({ status: s.value })}
              >
                {s.label}
              </Button>
            ))}
          </div>
        </div>
        <UrlSearch placeholder="Search name, email or student ID" className="w-64" />
      </div>

      {data ? (
        <p className="text-muted-foreground text-sm">
          {data.summary.capacity !== null
            ? `${data.summary.total} of ${data.summary.capacity} seats taken`
            : `${data.summary.total} students`}{' '}
          · {data.summary.confirmed} confirmed · {data.summary.pending} pending payment
        </p>
      ) : null}

      {isError ? (
        <EmptyState
          title="Could not load the roster"
          description={errorMessage(error, 'Please try again.')}
        />
      ) : isPending ? (
        <div className="space-y-2">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </div>
      ) : data.data.length === 0 ? (
        <EmptyState
          title={search || status ? 'No students match' : 'No students enrolled yet'}
          description={
            search || status
              ? 'Try a different search or status.'
              : 'Students appear here after they enroll in this course.'
          }
        />
      ) : (
        <>
          <div
            className={`overflow-x-auto rounded-lg border transition-opacity ${
              isPlaceholderData ? 'opacity-60' : ''
            }`}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Batch</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Enrolled</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.data.map((row, i) => (
                  <TableRow key={row.id}>
                    <TableCell className="text-muted-foreground">
                      {(data.meta.page - 1) * data.meta.limit + i + 1}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{row.student.user.firstName}</div>
                      <div className="text-muted-foreground text-xs">
                        {row.student.user.email}
                      </div>
                    </TableCell>
                    <TableCell>{row.student.studentId ?? '—'}</TableCell>
                    <TableCell>{row.student.batch}</TableCell>
                    <TableCell>{row.student.semester ?? '—'}</TableCell>
                    <TableCell>
                      <StatusBadge status={row.status} />
                    </TableCell>
                    <TableCell>{formatDate(row.enrolledAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <UrlPagination page={data.meta.page} totalPage={data.meta.totalPage} />
        </>
      )}
    </div>
  );
}
