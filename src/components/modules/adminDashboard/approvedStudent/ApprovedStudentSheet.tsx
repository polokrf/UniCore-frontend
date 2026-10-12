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
  useApprovedRejectedStudent,
  useApprovedRejectedTeacher,
  useGetSingleStudent,
} from '@/hooks/admin-hook/approved.teacher.student.hook';
import { useQueryClient } from '@tanstack/react-query';
import {
  BookOpen,
  Mail,
  MapPin,
  PhoneCall,
  Sparkles,
  User,
} from 'lucide-react';

export function StudentApprovedSheet({ approvedId }: { approvedId: string }) {
const queryClient = useQueryClient();
  const payload = {
    id: approvedId as string,
  };
  const { data } = useGetSingleStudent(payload);

  const student = data?.data;

  const { mutate, isPending } = useApprovedRejectedStudent();
 

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
           queryKey: ['get-single-student'],
         });

         queryClient.invalidateQueries({
           queryKey: ['getStudent'],
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
            className="gap-2 shadow-xs transition-all hover:bg-primary/5"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            Review
          </Button>
        }
      />

      <SheetContent className="flex flex-col justify-between w-screen h-screen sm:w-full sm:max-w-md sm:h-full p-4 sm:p-6 overflow-y-auto border-none sm:border-solid">
        <div className="space-y-6">
          {/* Header Section */}
          <SheetHeader className="space-y-3 pb-4 border-b border-border text-left">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary uppercase tracking-wider">
                {student?.status || 'Invalid'}
              </span>
              <div className="flex items-center gap-1.5 text-xs font-medium">
                <span
                  className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                    student?.isActive
                      ? 'bg-emerald-500 animate-pulse'
                      : 'bg-rose-500'
                  }`}
                />
                <span
                  className={
                    student?.isActive ? 'text-emerald-600' : 'text-rose-600'
                  }
                >
                  {student?.isActive ? 'Active Account' : 'Blocked'}
                </span>
              </div>
            </div>

           

            <SheetDescription className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
              Review student profile details, academic information, and update
              application status.
            </SheetDescription>
          </SheetHeader>

          {/* Body Information Cards */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3">
              {/* Gender */}
              <div className="flex items-start gap-3 p-3 sm:p-3.5 rounded-xl bg-muted/50 border border-border/60">
                <div className="p-2 rounded-lg bg-background shadow-xs text-primary shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    Gender
                  </p>
                  <p className="text-sm font-semibold text-foreground mt-0.5 break-words capitalize">
                    {student?.gender || 'Not Specified'}
                  </p>
                </div>
              </div>

              
              {/* Semester */}
              <div className="flex items-start gap-3 p-3 sm:p-3.5 rounded-xl bg-muted/50 border border-border/60">
                <div className="p-2 rounded-lg bg-background shadow-xs text-primary shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    Semester
                  </p>
                  <p className="text-sm font-semibold text-foreground mt-0.5 break-words">
                    {student?.semester || 'Not Assigned'}
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 p-3 sm:p-3.5 rounded-xl bg-muted/50 border border-border/60">
                <div className="p-2 rounded-lg bg-background shadow-xs text-primary shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    Address
                  </p>
                  <p className="text-sm font-semibold text-foreground mt-0.5 break-words">
                    {student?.address || 'Not Provided'}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3 p-3 sm:p-3.5 rounded-xl bg-muted/50 border border-border/60">
                <div className="p-2 rounded-lg bg-background shadow-xs text-primary shrink-0">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    Contact Phone
                  </p>
                  <p className="text-sm font-semibold text-foreground mt-0.5 break-words">
                    {student?.phone || 'No phone number'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <SheetFooter className="pt-4 mt-6 border-t border-border flex flex-col-reverse sm:flex-row gap-2.5 sm:justify-between">
          <SheetClose
            render={
              <Button
                variant="outline"
                className={
                  student?.status === 'REJECTED' || !student?.status
                    ? 'w-full'
                    : 'w-full sm:flex-1'
                }
              >
                Cancel
              </Button>
            }
          />

          <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:flex-1">
            {student?.status === 'PENDING' ? (
              <>
                <Button
                  onClick={() => handleUpadeStatus(student.id, 'REJECTED')}
                  disabled={isPending}
                  type="button"
                  variant="destructive"
                  className="w-full sm:flex-1 font-medium shadow-xs"
                >
                  Reject
                </Button>

                <Button
                  type="button"
                  onClick={() => handleUpadeStatus(student.id, 'APPROVED')}
                  disabled={isPending}
                  className="w-full sm:flex-1 font-medium shadow-xs bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Approve
                </Button>
              </>
            ) : student?.status === 'APPROVED' ? (
              <Button
                onClick={() => handleUpadeStatus(student.id, 'REJECTED')}
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
