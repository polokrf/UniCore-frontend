'use client';

import DetailRow from '@/components/shared/DetailRow';
import StatusBadge from '@/components/shared/StatusBadge';
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
import { useCreateResult } from '@/hooks/admin-hook/result.hook';
import { errorMessage, formatBdt, formatDate, gradeLabel } from '@/lib/format';
import { IEnrollment } from '@/type/addminAccess/enrollments.type';
import { TGrade } from '@/type/api.type';
import ResultForm from '../result/ResultForm';
import {
  User,
  BookOpen,
  CreditCard,
  GraduationCap,
  Eye,
  Info,
  CheckCircle2,
} from 'lucide-react';

// Review ONE enrollment (the row that was clicked): student, course, payment,
// and the result. A confirmed enrollment without a result can get one here.
export function EnrollmentSheet({ enrollment }: { enrollment: IEnrollment }) {
  const create = useCreateResult();
  const { student, courseOffering: offering, result } = enrollment;
  const payment = enrollment.payments;
  const teacher = offering.teacher as unknown as {
    user?: { firstName?: string };
  } | null;

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
                {offering.course.code} · {offering.course.title}
              </SheetTitle>
              <SheetDescription className="text-xs text-muted-foreground mt-1">
                Enrolled on{' '}
                {formatDate(enrollment.enrolledAt ?? enrollment.createdAt)}
              </SheetDescription>
            </div>
            <StatusBadge status={enrollment.status} />
          </div>
        </SheetHeader>

        <div className="space-y-5">
          {/* Student Info Card */}
          <section className="rounded-xl border border-border/60 bg-muted/20 p-4 space-y-3">
            <div className="flex items-center gap-2 text-primary font-semibold text-sm border-b pb-2">
              <User className="h-4 w-4" />
              <span>Student Information</span>
            </div>
            <div className="space-y-2 text-sm">
              <DetailRow label="Name">{student.user.firstName}</DetailRow>
              <DetailRow label="Email">{student.user.email}</DetailRow>
              <DetailRow label="Student ID">{student.studentId}</DetailRow>
              <DetailRow label="Batch">{student.batch}</DetailRow>
            </div>
          </section>

          {/* Course Info Card */}
          <section className="rounded-xl border border-border/60 bg-muted/20 p-4 space-y-3">
            <div className="flex items-center gap-2 text-primary font-semibold text-sm border-b pb-2">
              <BookOpen className="h-4 w-4" />
              <span>Course Details</span>
            </div>
            <div className="space-y-2 text-sm">
              <DetailRow label="Semester">
                {offering.semester.name} {offering.semester.year}
              </DetailRow>
              <DetailRow label="Section">{offering.section}</DetailRow>
              <DetailRow label="Credits">{offering.course.credit}</DetailRow>
              <DetailRow label="Teacher">
                {teacher?.user?.firstName ?? 'Not assigned'}
              </DetailRow>
              <DetailRow label="Fee">{formatBdt(offering.fee)}</DetailRow>
            </div>
          </section>

          {/* Payment Info Card */}
          <section className="rounded-xl border border-border/60 bg-muted/20 p-4 space-y-3">
            <div className="flex items-center gap-2 text-primary font-semibold text-sm border-b pb-2">
              <CreditCard className="h-4 w-4" />
              <span>Payment Details</span>
            </div>
            {payment ? (
              <div className="space-y-2 text-sm">
                <DetailRow label="Status">{payment.status}</DetailRow>
                <DetailRow label="Amount">
                  {formatBdt(payment.amount)}
                </DetailRow>
                <DetailRow label="bKash Trx ID">{payment.bkashTrxId}</DetailRow>
                <DetailRow label="Paid at">
                  {formatDate(payment.paidAt)}
                </DetailRow>
              </div>
            ) : (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs">
                <Info className="h-4 w-4 shrink-0" />
                <span>The student has not started a payment yet.</span>
              </div>
            )}
          </section>

          {/* Result Info Card */}
          <section className="rounded-xl border border-border/60 bg-muted/20 p-4 space-y-3">
            <div className="flex items-center gap-2 text-primary font-semibold text-sm border-b pb-2">
              <GraduationCap className="h-4 w-4" />
              <span>Academic Result</span>
            </div>

            {result ? (
              <div className="space-y-3">
                <div className="space-y-2 text-sm">
                  <DetailRow label="Result">
                    {result.marks} marks · {gradeLabel(result.grade as TGrade)}{' '}
                    · {result.gradePoint} pts
                  </DetailRow>
                  <DetailRow label="Visibility">
                    {result.published ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Published
                      </span>
                    ) : (
                      'Hidden from student'
                    )}
                  </DetailRow>
                </div>
                <p className="text-muted-foreground text-xs bg-background p-2 rounded-md border border-border/40">
                  💡 To correct it or change its visibility, use{' '}
                  <strong>All-Results</strong> tab.
                </p>
              </div>
            ) : enrollment.status === 'CONFIRMED' ? (
              <div className="space-y-3 pt-1">
                <p className="text-muted-foreground text-xs">
                  No result yet. Publishing makes it visible to the student
                  right away.
                </p>
                <div className="bg-background p-3 rounded-lg border border-border/50">
                  <ResultForm
                    submitLabel="Publish result"
                    pending={create.isPending}
                    onSubmit={values =>
                      create.mutate(
                        { enrollmentId: enrollment.id, ...values },
                        {
                          onSuccess: () =>
                            toast.add({
                              type: 'success',
                              description: 'Result published',
                            }),
                          onError: err =>
                            toast.add({
                              type: 'error',
                              description: errorMessage(
                                err,
                                'Could not publish the result',
                              ),
                            }),
                        },
                      )
                    }
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted text-muted-foreground text-xs">
                <Info className="h-4 w-4 shrink-0" />
                <span>
                  A result can be added once the enrollment is confirmed (after
                  payment).
                </span>
              </div>
            )}
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
