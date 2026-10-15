'use client';

import EmptyState from '@/components/shared/EmptyState';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { gradeLabel } from '@/lib/format';
import { TMyEnrollment, TMyResult } from '@/type/domain.type';

export default function ResultsTable({
  results,
  enrollments,
}: {
  results: TMyResult[];
  enrollments: TMyEnrollment[];
}) {
  if (results.length === 0) {
    return (
      <EmptyState
        title="No published results yet"
        description="Results show up here after your teacher's marks are published."
      />
    );
  }

  const byEnrollment = new Map(enrollments.map(e => [e.id, e]));

  return (
    <div className="space-y-6">
      {/* Header Title & Subtitle */}
      <div className="flex flex-col space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Academic Results
        </h2>
        <p className="text-sm text-slate-500">
          Overview of your published marks, grades, and grade points for current
          enrollments.
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
                Marks
              </TableHead>
              <TableHead className="py-4 text-xs font-semibold uppercase tracking-wider text-slate-600">
                Grade
              </TableHead>
              <TableHead className="py-4 text-xs font-semibold uppercase tracking-wider text-slate-600">
                Grade Point
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-100">
            {results.map(r => {
              const course = byEnrollment.get(r.enrollmentId)?.courseOffering
                .course;

              return (
                <TableRow
                  key={r.id}
                  className="transition-colors duration-150 hover:bg-slate-50/60"
                >
                  {/* Course Details */}
                  <TableCell className="py-4">
                    {course ? (
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-900">
                          {course.title}
                        </span>
                        <span className="text-xs font-medium text-slate-400">
                          {course.code}
                        </span>
                      </div>
                    ) : (
                      <span className="italic text-slate-400">
                        Unknown Course
                      </span>
                    )}
                  </TableCell>

                  {/* Marks */}
                  <TableCell className="py-4 font-medium text-slate-700">
                    {r.marks}
                  </TableCell>

                  {/* Grade Badge */}
                  <TableCell className="py-4">
                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10">
                      {gradeLabel(r.grade)}
                    </span>
                  </TableCell>

                  {/* Grade Point */}
                  <TableCell className="py-4 font-semibold text-slate-900">
                    {r.gradePoint.toFixed(2)}
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
