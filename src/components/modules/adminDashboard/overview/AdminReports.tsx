'use client';

import { SkeletonText } from '@/components/layout/loading/SkeletonText';
import EmptyState from '@/components/shared/EmptyState';
import StatCard from '@/components/shared/StatCard';
import StatusBadge from '@/components/shared/StatusBadge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAdminStats } from '@/hooks/admin-hook/admin.analytics.hook';
import { API_URL } from '@/lib/apiFetch';
import { formatBdt, formatDate } from '@/lib/format';

// The backend keeps no audit log, so "recent activity" is the latest enrollments.
export default function AdminReports() {
  const { data, isPending, isError } = useAdminStats();

  if (isPending) return <SkeletonText />;
  if (isError || !data) {
    return <EmptyState title="Could not load reports" description="Check that the API is running." />;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Pending faculty" value={data.pending.teachers} />
        <StatCard label="Pending students" value={data.pending.students} />
        <StatCard label="Unpaid enrollments" value={data.enrollments.pending} />
        <StatCard label="Total paid" value={formatBdt(data.revenue)} />
      </div>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Recent enrollment activity</h2>
        {data.recent.length === 0 ? (
          <EmptyState title="No activity yet" />
        ) : (
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.recent.map(e => (
                  <TableRow key={e.id}>
                    <TableCell className="font-medium">{e.student.user.firstName}</TableCell>
                    <TableCell>
                      {e.courseOffering.course.code} · {e.courseOffering.course.title}
                    </TableCell>
                    <TableCell>{formatBdt(e.courseOffering.fee)}</TableCell>
                    <TableCell>
                      <StatusBadge status={e.status} />
                    </TableCell>
                    <TableCell>{formatDate(e.createdAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">System</h2>
        <dl className="grid gap-3 text-sm sm:grid-cols-3">
          {[
            ['API base URL', API_URL],
            ['Payment gateway', 'bKash (tokenized checkout)'],
            ['Authentication', 'JWT in httpOnly cookies'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border p-3">
              <dt className="text-muted-foreground text-xs">{label}</dt>
              <dd className="font-medium break-all">{value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
