'use client';

import DetailRow from '@/components/shared/DetailRow';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Spinner } from '@/components/ui/spinner';
import { toast } from '@/components/ui/toast';
import { useAssignOfferingTeacher } from '@/hooks/admin-hook/courseOffering.hook';
import { errorMessage, formatBdt } from '@/lib/format';
import { ICourseOffering } from '@/type/addminAccess/courseOffering.type';
import { useState } from 'react';
import TeacherSelect from './TeacherSelect';

// Assign a teacher to an offering, or change the current one. The parent gives
// this component a `key` of the offering id, so its state starts fresh for
// every offering. The backend decides (404 / 409 / 400); its message is shown
// as it is, in the sheet (stays visible) and as a toast.
export default function AssignTeacherSheet({
  offering,
  semesterLabel,
  teacherName,
  onClose,
}: {
  offering: ICourseOffering | null;
  semesterLabel: string;
  teacherName: string | null;
  onClose: () => void;
}) {
  const assign = useAssignOfferingTeacher();
  const [teacherId, setTeacherId] = useState('');
  const [error, setError] = useState('');
  const changing = !!offering?.teacherId;

  const submit = () => {
    if (!offering || !teacherId) return;
    setError('');
    assign.mutate(
      { id: offering.id, teacherId },
      {
        onSuccess: () => {
          toast.add({
            type: 'success',
            title: changing ? 'Teacher changed' : 'Teacher assigned',
            description: `${offering.course.code} · Section ${offering.section}`,
          });
          onClose();
        },
        onError: err => {
          const message = errorMessage(err, 'Could not assign the teacher');
          setError(message);
          toast.add({ type: 'error', title: 'Could not assign the teacher', description: message });
        },
      },
    );
  };

  return (
    <Sheet open={!!offering} onOpenChange={open => !open && onClose()}>
      <SheetContent className="flex w-full flex-col gap-5 overflow-y-auto p-4 sm:max-w-md sm:p-6">
        {offering ? (
          <>
            <SheetHeader className="space-y-1 border-b pb-4 text-left">
              <SheetTitle>{changing ? 'Change teacher' : 'Assign teacher'}</SheetTitle>
              <SheetDescription>
                {offering.course.code} · {offering.course.title}
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-2">
              <DetailRow label="Semester">{semesterLabel}</DetailRow>
              <DetailRow label="Section">{offering.section}</DetailRow>
              <DetailRow label="Fee">{formatBdt(offering.fee)}</DetailRow>
              <DetailRow label="Current teacher">{teacherName ?? 'Not assigned'}</DetailRow>
            </div>

            <div className="space-y-2 border-t pt-4">
              <label htmlFor="assign-teacher" className="text-sm font-semibold">
                {changing ? 'New teacher' : 'Teacher'}
              </label>
              <TeacherSelect
                id="assign-teacher"
                departmentId={offering.course.departmentId}
                value={teacherId}
                onChange={id => {
                  setTeacherId(id);
                  setError('');
                }}
                currentTeacherId={offering.teacherId}
              />
              <p className="text-muted-foreground text-xs">
                Only approved, active teachers of this course&apos;s department are listed.
              </p>
            </div>

            {error ? (
              <p
                role="alert"
                data-testid="assign-error"
                className="border-destructive/40 bg-destructive/10 text-destructive rounded-md border p-3 text-sm"
              >
                {error}
              </p>
            ) : null}

            <Button onClick={submit} disabled={!teacherId || assign.isPending} className="w-full">
              {assign.isPending ? <Spinner /> : changing ? 'Change teacher' : 'Assign teacher'}
            </Button>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
