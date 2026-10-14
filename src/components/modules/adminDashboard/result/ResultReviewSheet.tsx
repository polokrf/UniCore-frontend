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
import {
  User,
  GraduationCap,
  Edit3,
  Eye,
  CheckCircle2,
  EyeOff,
} from 'lucide-react';

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
          toast.add({
            type: 'error',
            description: errorMessage(err, 'Could not update the result'),
          }),
      },
    );

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 hover:bg-accent hover:text-accent-foreground transition-all"
          >
            <Eye className="h-4 w-4" />
            <span>Review</span>
          </Button>
        }
      />
      <SheetContent className="flex w-full flex-col gap-6 overflow-y-auto p-4 sm:max-w-lg sm:p-6 bg-background">
        {/* Header Section */}
        <SheetHeader className="space-y-2 border-b pb-4 text-left">
          <div className="flex items-start justify-between gap-3">
            <div>
              <SheetTitle className="text-xl font-bold tracking-tight text-foreground">
                {student.user.firstName}
              </SheetTitle>
              <SheetDescription className="text-xs text-muted-foreground mt-0.5">
                {student.user.email}
              </SheetDescription>
            </div>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                result.published
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                  : 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
              }`}
            >
              {result.published ? (
                <CheckCircle2 className="h-3 w-3" />
              ) : (
                <EyeOff className="h-3 w-3" />
              )}
              {result.published ? 'Published' : 'Hidden'}
            </span>
          </div>
        </SheetHeader>

        <div className="space-y-5">
          {/* Result Details Card */}
          <section className="rounded-xl border border-border/60 bg-muted/20 p-4 space-y-3">
            <div className="flex items-center gap-2 text-primary font-semibold text-sm border-b pb-2">
              <User className="h-4 w-4" />
              <span>Academic Details</span>
            </div>
            <div className="space-y-2 text-sm">
              <DetailRow label="Student ID">{student.studentId}</DetailRow>
              <DetailRow label="Batch">{student.batch}</DetailRow>
              <DetailRow label="Course">
                {offering
                  ? `${offering.course.code} · ${offering.course.title}`
                  : '—'}
              </DetailRow>
              <DetailRow label="Semester">
                {offering
                  ? `${offering.semester.name} ${offering.semester.year}`
                  : '—'}
              </DetailRow>
              <DetailRow label="Result">
                {result.marks} marks · {gradeLabel(result.grade as TGrade)} ·{' '}
                {result.gradePoint} pts
              </DetailRow>
              <DetailRow label="Last updated">
                {formatDate(result.updatedAt)}
              </DetailRow>
            </div>
          </section>

          {/* Correct Result Card */}
          <section className="rounded-xl border border-border/60 bg-muted/20 p-4 space-y-3">
            <div className="flex items-center gap-2 text-primary font-semibold text-sm border-b pb-2">
              <Edit3 className="h-4 w-4" />
              <span>Correct this result</span>
            </div>
            <div className="bg-background p-3 rounded-lg border border-border/50">
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
          </section>

          {/* Visibility Management Card */}
          <section className="rounded-xl border border-border/60 bg-muted/20 p-4 space-y-3">
            <div className="flex items-center gap-2 text-primary font-semibold text-sm border-b pb-2">
              <GraduationCap className="h-4 w-4" />
              <span>Visibility Status</span>
            </div>
            <p className="text-muted-foreground text-xs bg-background p-2.5 rounded-md border border-border/40 leading-relaxed">
              {result.published
                ? '✓ The student can see this result and it counts toward their CGPA.'
                : '⚠ The student cannot see this result and it does not count toward their CGPA.'}
            </p>
            <Button
              variant={result.published ? 'outline' : 'default'}
              className="w-full font-medium"
              disabled={update.isPending}
              onClick={() =>
                save(
                  { published: !result.published },
                  result.published
                    ? 'Result hidden from the student'
                    : 'Result published',
                )
              }
            >
              {result.published ? 'Unpublish result' : 'Publish result'}
            </Button>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
