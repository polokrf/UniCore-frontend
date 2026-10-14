'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { toast } from '@/components/ui/toast';
import {
  useApprovedRejectedTeacher,
  useGetSingleTeacher,
} from '@/hooks/admin-hook/approved.teacher.student.hook';
import { useQueryClient } from '@tanstack/react-query';
import {
  BadgeCheck,
  Briefcase,
  GraduationCap,
  PhoneCall,
  Sparkles,
} from 'lucide-react';

export function TeacherApprovedSheet({ approvedId }: { approvedId: string }) {
  const payload = {
    id: approvedId as string,
  };
  const { data } = useGetSingleTeacher(payload);

  const teacher = data?.data;

  const { mutate, isPending } = useApprovedRejectedTeacher();
  const queryClient = useQueryClient();

  const handleUpadeStatus = (id: string, status: string) => {
    const payload = {
      status,
      id,
    };
    mutate(payload, {
      onSuccess: res => {
        toast.add({
          type: 'success',
          title: `${res.message}`,
        });
        queryClient.invalidateQueries({
          queryKey: ['get-single-teacher', 'getTeacher'],
        });
      },
      onError: err => {
        toast.add({
          type: 'error',
          title: `${err.message}`,
        });
      },
    });
  };

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 shadow-xs transition-all hover:bg-primary/5"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Review
          </Button>
        }
      />

      <SheetContent className="flex flex-col justify-between w-screen h-screen sm:w-full sm:max-w-md sm:h-full p-4 sm:p-6 overflow-y-auto border-none sm:border-solid">
        <div className="space-y-6">
          {/* Header Section */}
          <SheetHeader className="space-y-3 pb-4 border-b border-border/60 text-left">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary uppercase tracking-wider">
                {teacher?.status || 'Invalid'}
              </span>
              <div className="flex items-center gap-1.5 text-xs font-medium">
                <span
                  className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                    teacher?.isActive
                      ? 'bg-emerald-500 animate-pulse'
                      : 'bg-rose-500'
                  }`}
                />
                <span
                  className={
                    teacher?.isActive ? 'text-emerald-600' : 'text-rose-600'
                  }
                >
                  {teacher?.isActive ? 'Active Account' : 'Blocked'}
                </span>
              </div>
            </div>

            <SheetTitle className="text-xl sm:text-2xl font-bold tracking-tight text-foreground break-words">
              {teacher?.designation || 'Teacher Profile'}
            </SheetTitle>

            <SheetDescription className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
              Review professional details, qualifications, and approve or reject
              the instructor application.
            </SheetDescription>
          </SheetHeader>

          {/* Body Information Cards */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3">
              {/* Designation */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-muted/40 border border-border/60 shadow-2xs">
                <div className="p-2 rounded-lg bg-background shadow-xs text-primary shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    Designation
                  </p>
                  <p className="text-sm font-semibold text-foreground mt-0.5 break-words">
                    {teacher?.designation || 'Not Provided'}
                  </p>
                </div>
              </div>

              {/* Qualification */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-muted/40 border border-border/60 shadow-2xs">
                <div className="p-2 rounded-lg bg-background shadow-xs text-primary shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    Qualification
                  </p>
                  <p className="text-sm font-semibold text-foreground mt-0.5 break-words">
                    {teacher?.qualification || 'Not Provided'}
                  </p>
                </div>
              </div>

              {/* Specialization */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-muted/40 border border-border/60 shadow-2xs">
                <div className="p-2 rounded-lg bg-background shadow-xs text-primary shrink-0">
                  <BadgeCheck className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    Specialization
                  </p>
                  <p className="text-sm font-semibold text-foreground mt-0.5 break-words">
                    {teacher?.specialization || 'Not Provided'}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-muted/40 border border-border/60 shadow-2xs">
                <div className="p-2 rounded-lg bg-background shadow-xs text-primary shrink-0">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    Contact Phone
                  </p>
                  <p className="text-sm font-semibold text-foreground mt-0.5 break-words">
                    {teacher?.phone || 'No phone number'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <SheetFooter className="pt-4 mt-6 border-t border-border/60 flex flex-col-reverse sm:flex-row gap-2.5 sm:justify-between">
          <SheetClose
            render={
              <Button
                variant="outline"
                className={
                  teacher?.status === 'REJECTED' || !teacher?.status
                    ? 'w-full'
                    : 'w-full sm:flex-1'
                }
              >
                Cancel
              </Button>
            }
          />

          <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:flex-1">
            {teacher?.status === 'PENDING' ? (
              <>
                <Button
                  onClick={() => handleUpadeStatus(teacher.id, 'REJECTED')}
                  disabled={isPending}
                  type="button"
                  variant="destructive"
                  className="w-full sm:flex-1 font-medium shadow-xs"
                >
                  Reject
                </Button>

                <Button
                  type="button"
                  onClick={() => handleUpadeStatus(teacher.id, 'APPROVED')}
                  disabled={isPending}
                  className="w-full sm:flex-1 font-medium shadow-xs bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Approve
                </Button>
              </>
            ) : teacher?.status === 'APPROVED' ? (
              <Button
                onClick={() => handleUpadeStatus(teacher.id, 'REJECTED')}
                disabled={isPending}
                type="button"
                variant="destructive"
                className="w-full sm:flex-1 font-medium shadow-xs"
              >
                Reject
              </Button>
            ) : null}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
