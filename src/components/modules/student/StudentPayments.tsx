'use client';

import { SkeletonText } from '@/components/layout/loading/SkeletonText';
import EmptyState from '@/components/shared/EmptyState';
import StatCard from '@/components/shared/StatCard';
import StatusBadge from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCancelEnrollment, useCheckout, useMyEnrollments } from '@/hooks/student.hook';
import { formatBdt, formatDate } from '@/lib/format';

// The backend does not expose a payments list. A confirmed enrollment is, by
// design, one whose bKash payment succeeded (the callback flips PENDING ->
// CONFIRMED), so enrollments are shown as the fee ledger.
export default function StudentPayments() {
  const { data, isPending, isError } = useMyEnrollments();
  const { mutate: pay, isPending: paying, variables: payingId } = useCheckout();
  const { mutate: cancel, isPending: cancelling, variables: cancellingId } =
    useCancelEnrollment();

  if (isPending) return <SkeletonText />;
  if (isError || !data) {
    return <EmptyState title="Could not load your payments" description="Please refresh the page." />;
  }

  const rows = data.filter(e => e.courseOffering.fee !== null);
  const paid = rows
    .filter(e => e.status === 'CONFIRMED')
    .reduce((sum, e) => sum + Number(e.courseOffering.fee), 0);
  const due = rows
    .filter(e => e.status === 'PENDING')
    .reduce((sum, e) => sum + Number(e.courseOffering.fee), 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Total paid" value={formatBdt(paid)} />
        <StatCard label="Total due" value={formatBdt(due)} />
        <StatCard label="Payment method" value="bKash" hint="You are redirected to bKash to pay" />
      </div>

      {rows.length === 0 ? (
        <EmptyState
          title="No fees yet"
          description="Enroll in a course from your dashboard and its fee will show up here."
        />
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map(e => {
                const status =
                  e.status === 'CONFIRMED'
                    ? 'PAID'
                    : e.status === 'PENDING'
                      ? 'UNPAID'
                      : 'CANCELLED';
                return (
                  <TableRow key={e.id}>
                    <TableCell>
                      <p className="font-medium">
                        {e.courseOffering.course.code} ·{' '}
                        {e.courseOffering.course.title}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {e.courseOffering.semester.name}{' '}
                        {e.courseOffering.semester.year}
                      </p>
                    </TableCell>
                    <TableCell>{formatBdt(e.courseOffering.fee)}</TableCell>
                    <TableCell>
                      <StatusBadge status={status} />
                    </TableCell>
                    <TableCell>
                      {e.status === 'CONFIRMED' ? formatDate(e.updatedAt) : '—'}
                    </TableCell>
                    <TableCell className="text-right">
                      {e.status === 'PENDING' ? (
                        <div className="flex justify-end gap-2">
                          <Button
                           
                            size="sm"
                            disabled={paying && payingId === e.id}
                            onClick={() => pay(e.id)}
                          >
                            {paying && payingId === e.id
                              ? 'Redirecting…'
                              : 'Pay with bKash'}
                          </Button>
                          <Button
                         
                            size="sm"
                            variant="outline"
                            disabled={cancelling && cancellingId === e.id}
                            onClick={() => cancel(e.id)}
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : null}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
