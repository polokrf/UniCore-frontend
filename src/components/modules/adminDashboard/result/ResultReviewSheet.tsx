'use client';

import DetailRow from '@/components/shared/DetailRow';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { toast } from '@/components/ui/toast';
import { useUpdateResult } from '@/hooks/admin-hook/result.hook';
import { errorMessage, formatDate, gradeLabel } from '@/lib/format';
import { TResultResponse } from '@/type/addminAccess/result.type';
import { TGrade, TResultUpdatePayload } from '@/type/api.type';
import ResultForm from './ResultForm';

type TResultRow = TResultResponse['data']['data'][number];

// Review a published result: see who/what it is for, correct marks or grade,
// or hide it from (and show it again to) the student.
export function ResultReviewSheet({ result }: { result: TResultRow }) {
  const update = useUpdateResult();
  const student = result.enrollment.student;
  const offering = result.enrollment.courseOffering;

  const save = (payload: TResultUpdatePayload, done: string) =>
    update.mutate(
      { id: result.id, payload },
      {
        onSuccess: () => toast.add({ type: 'success', description: done }),
        onError: err =>
          toast.add({ type: 'error', description: errorMessage(err, 'Could not update the result') }),
      },
    );

  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline">Review</Button>} />
      <SheetContent className="flex w-full flex-col gap-5 overflow-y-auto p-4 sm:max-w-md sm:p-6">
        <SheetHeader className="space-y-1 border-b pb-4 text-left">
          <div className="flex items-center justify-between gap-2">
            <SheetTitle>{student.user.firstName}</SheetTitle>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                result.published
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-amber-100 text-amber-700'
              }`}
            >
              {result.published ? 'Published' : 'Hidden from student'}
            </span>
          </div>
          <SheetDescription>{student.user.email}</SheetDescription>
        </SheetHeader>

        <div className="space-y-2">
          <DetailRow label="Student ID">{student.studentId}</DetailRow>
          <DetailRow label="Batch">{student.batch}</DetailRow>
          <DetailRow label="Course">
            {offering ? `${offering.course.code} · ${offering.course.title}` : '—'}
          </DetailRow>
          <DetailRow label="Semester">
            {offering ? `${offering.semester.name} ${offering.semester.year}` : '—'}
          </DetailRow>
          <DetailRow label="Result">
            {result.marks} marks · {gradeLabel(result.grade as TGrade)} · {result.gradePoint} pts
          </DetailRow>
          <DetailRow label="Last updated">{formatDate(result.updatedAt)}</DetailRow>
        </div>

        <div className="space-y-2 border-t pt-4">
          <p className="text-sm font-semibold">Correct this result</p>
          <ResultForm
            // remount with fresh values after a save so the inputs match the row
            key={`${result.updatedAt}`}
            initial={{
              marks: result.marks,
              grade: result.grade as TGrade,
              gradePoint: result.gradePoint,
            }}
            submitLabel="Save correction"
            pending={update.isPending}
            onSubmit={values => save(values, 'Result updated')}
          />
        </div>

        <div className="space-y-2 border-t pt-4">
          <p className="text-sm font-semibold">Visibility</p>
          <p className="text-muted-foreground text-xs">
            {result.published
              ? 'The student can see this result and it counts toward their CGPA.'
              : 'The student cannot see this result and it does not count toward their CGPA.'}
          </p>
          <Button
            variant={result.published ? 'outline' : 'default'}
            className="w-full"
            disabled={update.isPending}
            onClick={() =>
              save(
                { published: !result.published },
                result.published ? 'Result hidden from the student' : 'Result published',
              )
            }
          >
            {result.published ? 'Unpublish result' : 'Publish result'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
