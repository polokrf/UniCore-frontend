'use client';

import { useState } from 'react';
import { Loader2, Pencil, Trash2 } from 'lucide-react';


import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';




import { IClassRoutine } from '@/type/addminAccess/get.class.routine.type';

import {  useGetSingleClassRoutine } from '@/hooks/admin-hook/class.routin.hook';


interface Props {
 id: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
 
}

export default function TeacherClassRoutineSheet({
  id,
  open,
  onOpenChange,
  
}: Props) {
 
  

   const{ data }= useGetSingleClassRoutine(id as string) 
   const routine = data?.data as IClassRoutine || {}
   
   if(!routine){
    return <Loader2/>
   }

  //  console.log(routine)

  const offering = routine?.courseOffering;
  const course = offering?.course;
  const semester = offering?.semester;
  const teacher = offering?.teacher;



  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Class Routine Details</SheetTitle>
            <SheetDescription>
              Complete course, teacher, and schedule information.
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-6 p-4">
            <div className="rounded-xl bg-muted/50 p-4">
              <div className="flex items-center justify-between gap-3">
                <Badge variant="outline">{course?.code}</Badge>

                <Badge variant={routine?.isActive ? 'default' : 'secondary'}>
                  {routine?.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              <h3 className="mt-3 text-xl font-bold">{course?.title}</h3>

              <p className="mt-2 text-sm text-muted-foreground">
                {course?.description}
              </p>
            </div>

            <div className="space-y-4">
              <Detail label="Course Code" value={course?.code} />
              <Detail label="Course Title" value={course?.title} />
              <Detail label="Course Credit" value={String(course?.credit)} />

              <Detail
                label="Semester"
                value={`${semester?.name} ${semester?.year}`}
              />

              <Detail label="Section" value={offering?.section} />
              <Detail label="Capacity" value={String(offering?.capacity)} />
              <Detail label="Fee" value={`৳${offering?.fee}`} />

              <Detail label="Teacher" value={teacher?.user?.firstName} />

              <Detail label="Teacher Email" value={teacher?.user?.email} />
              <Detail label="Employee ID" value={teacher?.employeeId} />
              <Detail label="Designation" value={teacher?.designation} />
              <Detail label="Specialization" value={teacher?.specialization} />

              <Detail label="Day" value={routine?.day} />
              <Detail label="Start Time" value={routine?.startTime} />
              <Detail label="End Time" value={routine?.endTime} />
              <Detail label="Room" value={routine?.room} />

              

              <Detail
                label="Created At"
                value={new Date(routine?.createdAt).toLocaleString()}
              />

              <Detail
                label="Updated At"
                value={new Date(routine?.updatedAt).toLocaleString()}
              />
            </div>

            <div >
              <Button className="w-full" onClick={() => onOpenChange(false)}>
               
                Cancel
              </Button>

             
            </div>
          </div>
        </SheetContent>
      </Sheet>

    

    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1 border-b pb-3">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>

      <p className="break-all text-sm font-medium">{value}</p>
    </div>
  );
}
