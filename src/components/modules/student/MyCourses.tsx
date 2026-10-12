'use client';

import EmptyState from '@/components/shared/EmptyState';
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
import { useCancelEnrollment } from '@/hooks/student.hook';
import { formatBdt } from '@/lib/format';
import { TMyEnrollment } from '@/type/domain.type';
import Link from 'next/link';

export default function MyCourses({ enrollments }: { enrollments: TMyEnrollment[] }) {
  const { mutate: cancel, isPending, variables } = useCancelEnrollment();

  if (enrollments.length === 0) {
    return (
      <EmptyState
        title="You are not enrolled in any course yet"
        description="Open the Available courses tab to pick your courses for this semester."
      />
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course</TableHead>
            <TableHead>Semester</TableHead>
            <TableHead>Teacher</TableHead>
            <TableHead>Fee</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enrollments.map(e => {
            const o = e.courseOffering;
            return (
              <TableRow key={e.id}>
                <TableCell>
                  <p className="font-medium">
                    {o.course.code} · {o.course.title}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Section {o.section} · {o.course.credit} credits
                  </p>
                </TableCell>
                <TableCell>
                  {o.semester.name} {o.semester.year}
                </TableCell>
                <TableCell>{o.teacher?.designation ?? 'To be announced'}</TableCell>
                <TableCell>{formatBdt(o.fee)}</TableCell>
                <TableCell>
                  <StatusBadge status={e.status} />
                </TableCell>
                <TableCell className="text-right">
                  {e.status === 'PENDING' ? (
                    <div className="flex justify-end gap-2">
                      <Button size="sm" render={<Link href="/student/payments" />}>
                        Pay
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={isPending && variables === e.id}
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
  );
}
