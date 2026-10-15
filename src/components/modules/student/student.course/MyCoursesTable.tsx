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

export default function MyCoursesTable({
  enrollments,
}: {
  enrollments: TMyEnrollment[];
}) {
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
    <div className="space-y-6">
      {/* Title & Subtitle Header */}
      <div className="flex flex-col space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Enrolled Courses
        </h2>
        <p className="text-sm text-slate-500">
          Manage your course enrollments, active statuses, payment obligations,
          and actions for this term.
        </p>
      </div>

      {/* Modern Table Container */}
      <div className="overflow-hidden rounded-xl border border-slate-200/80 shadow-sm backdrop-blur-sm transition-all">
        <Table>
          <TableHeader className="bg-slate-50/80 border-b border-slate-200">
            <TableRow className="hover:bg-transparent">
              <TableHead className="py-4 text-xs font-semibold uppercase tracking-wider text-slate-600">
                Course
              </TableHead>
              <TableHead className="py-4 text-xs font-semibold uppercase tracking-wider text-slate-600">
                Semester
              </TableHead>
              <TableHead className="py-4 text-xs font-semibold uppercase tracking-wider text-slate-600">
                Teacher
              </TableHead>
              <TableHead className="py-4 text-xs font-semibold uppercase tracking-wider text-slate-600">
                Fee
              </TableHead>
              <TableHead className="py-4 text-xs font-semibold uppercase tracking-wider text-slate-600">
                Status
              </TableHead>
              <TableHead className="py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-slate-100">
            {enrollments.map(e => {
              const o = e.courseOffering;

              return (
                <TableRow
                  key={e.id}
                  className="transition-colors duration-150 hover:bg-slate-50/60"
                >
                  {/* Course Info */}
                  <TableCell className="py-4">
                    <div className="flex flex-col space-y-0.5">
                      <span className="font-semibold text-slate-900">
                        {o.course.title}
                      </span>
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                        <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] text-slate-700">
                          {o.course.code}
                        </span>
                        <span>•</span>
                        <span>Section {o.section}</span>
                        <span>•</span>
                        <span>{o.course.credit} credits</span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Semester */}
                  <TableCell className="py-4 font-medium text-slate-700">
                    {o.semester.name} {o.semester.year}
                  </TableCell>

                  {/* Teacher */}
                  <TableCell className="py-4 text-sm text-slate-600">
                    {o.teacher?.designation ? (
                      <span className="font-medium text-slate-800">
                        {o.teacher.designation}
                      </span>
                    ) : (
                      <span className="italic text-slate-400">
                        To be announced
                      </span>
                    )}
                  </TableCell>

                  {/* Fee */}
                  <TableCell className="py-4 font-semibold text-slate-900">
                    {formatBdt(o.fee)}
                  </TableCell>

                  {/* Status Badge */}
                  <TableCell className="py-4">
                    <StatusBadge status={e.status} />
                  </TableCell>

                  {/* Action Buttons */}
                  <TableCell className="py-4 text-right">
                    {e.status === 'PENDING' ? (
                      <div className="flex justify-end items-center gap-2">
                        <Button
                          nativeButton={false}
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white shadow-xs font-medium transition-all"
                          render={<Link href="/student/payments" />}
                        >
                          Pay
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-slate-200 text-slate-700 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors"
                          disabled={isPending && variables === e.id}
                          onClick={() => cancel(e.id)}
                        >
                          {isPending && variables === e.id
                            ? 'Cancelling...'
                            : 'Cancel'}
                        </Button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 italic">
                        No action
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
