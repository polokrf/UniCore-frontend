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

// Review ONE enrollment (the row that was clicked): student, course, payment,
// and the result. A confirmed enrollment without a result can get one here.
export function EnrollmentSheet({ enrollment }: { enrollment: IEnrollment }) {
  const create = useCreateResult();
  const { student, courseOffering: offering, result } = enrollment;
  const payment = enrollment.payments;
  const teacher = offering.teacher as unknown as { user?: { firstName?: string } } | null;

  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline">Review</Button>} />
      <SheetContent className="flex w-full flex-col gap-5 overflow-y-auto p-4 sm:max-w-md sm:p-6">
        <SheetHeader className="space-y-1 border-b pb-4 text-left">
          <div className="flex items-center justify-between gap-2">
            <SheetTitle>
              {offering.course.code} · {offering.course.title}
            </SheetTitle>
            <StatusBadge status={enrollment.status} />
          </div>
          <SheetDescription>
            Enrolled {formatDate(enrollment.enrolledAt ?? enrollment.createdAt)}
          </SheetDescription>
        </SheetHeader>

        <section className="space-y-2">
          <p className="text-sm font-semibold">Student</p>
          <DetailRow label="Name">{student.user.firstName}</DetailRow>
          <DetailRow label="Email">{student.user.email}</DetailRow>
          <DetailRow label="Student ID">{student.studentId}</DetailRow>
          <DetailRow label="Batch">{student.batch}</DetailRow>
        </section>

        <section className="space-y-2 border-t pt-4">
          <p className="text-sm font-semibold">Course</p>
          <DetailRow label="Semester">
            {offering.semester.name} {offering.semester.year}
          </DetailRow>
          <DetailRow label="Section">{offering.section}</DetailRow>
          <DetailRow label="Credits">{offering.course.credit}</DetailRow>
          <DetailRow label="Teacher">{teacher?.user?.firstName ?? 'Not assigned'}</DetailRow>
          <DetailRow label="Fee">{formatBdt(offering.fee)}</DetailRow>
        </section>

        <section className="space-y-2 border-t pt-4">
          <p className="text-sm font-semibold">Payment</p>
          {payment ? (
            <>
              <DetailRow label="Status">{payment.status}</DetailRow>
              <DetailRow label="Amount">{formatBdt(payment.amount)}</DetailRow>
              <DetailRow label="bKash trx ID">{payment.bkashTrxId}</DetailRow>
              <DetailRow label="Paid at">{formatDate(payment.paidAt)}</DetailRow>
            </>
          ) : (
            <p className="text-muted-foreground text-sm">The student has not started a payment.</p>
          )}
        </section>

        <section className="space-y-2 border-t pt-4">
          <p className="text-sm font-semibold">Result</p>
          {result ? (
            <>
              <DetailRow label="Result">
                {result.marks} marks · {gradeLabel(result.grade as TGrade)} · {result.gradePoint} pts
              </DetailRow>
              <DetailRow label="Visibility">
                {result.published ? 'Published' : 'Hidden from student'}
              </DetailRow>
              <p className="text-muted-foreground text-xs">
                To correct it or change its visibility, use All-Results.
              </p>
            </>
          ) : enrollment.status === 'CONFIRMED' ? (
            <>
              <p className="text-muted-foreground text-xs">
                No result yet. Publishing makes it visible to the student right away.
              </p>
              <ResultForm
                submitLabel="Publish result"
                pending={create.isPending}
                onSubmit={values =>
                  create.mutate(
                    { enrollmentId: enrollment.id, ...values },
                    {
                      onSuccess: () =>
                        toast.add({ type: 'success', description: 'Result published' }),
                      onError: err =>
                        toast.add({
                          type: 'error',
                          description: errorMessage(err, 'Could not publish the result'),
                        }),
                    },
                  )
                }
              />
            </>
          ) : (
            <p className="text-muted-foreground text-sm">
              A result can be added once the enrollment is confirmed (after payment).
            </p>
          )}
        </section>
      </SheetContent>
    </Sheet>
  );
}
