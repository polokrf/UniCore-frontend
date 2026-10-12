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
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course</TableHead>
            <TableHead>Marks</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Grade point</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map(r => {
            const course = byEnrollment.get(r.enrollmentId)?.courseOffering.course;
            return (
              <TableRow key={r.id}>
                <TableCell>
                  {course ? `${course.code} · ${course.title}` : 'Course'}
                </TableCell>
                <TableCell>{r.marks}</TableCell>
                <TableCell className="font-medium">{gradeLabel(r.grade)}</TableCell>
                <TableCell>{r.gradePoint.toFixed(2)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
