'use client';

import { useState } from 'react';
import { Eye } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { IClassRoutine } from '@/type/addminAccess/get.class.routine.type';
import ClassRoutineSheet from './ClassRoutineSheet';
import { useClassRoutines } from '@/hooks/catalog.hook';




interface Props {
  
  view: 'table' | 'sheet';

}

export default function ClassRoutineTable({
 
  view,
  
}: Props) {
  const [selectedRoutine, setSelectedRoutine] = useState<string | null>(
    null,
  );

  const [open, setOpen] = useState(false);

  const handleView = (routine:string) => {
    setSelectedRoutine(routine);
    setOpen(true);
  };

  const {data:routines =[]}=useClassRoutines()

  if (view === 'sheet') {
    return (
      <>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {routines.map(routine => (
            <div
              key={routine.id}
              className="rounded-xl border p-5 transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Badge variant="outline">
                    {routine.courseOffering.course.code}
                  </Badge>

                  <h3 className="mt-3 font-semibold">
                    {routine.courseOffering.course.title}
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {routine.courseOffering.semester.name}{' '}
                    {routine.courseOffering.semester.year}
                  </p>
                </div>

                <Badge variant={routine.isActive ? 'default' : 'secondary'}>
                  {routine.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <p>Day: {routine.day}</p>
                <p>
                  Time: {routine.startTime} - {routine.endTime}
                </p>
                <p>Room: {routine.room}</p>
                <p>Teacher: {routine.courseOffering.teacher.user.firstName}</p>
              </div>

              <Button
                className="mt-5 w-full"
                variant="outline"
                onClick={() => handleView(routine.id)}
              >
                <Eye className="mr-2 size-4" />
                View Details
              </Button>
            </div>
          ))}
        </div>

        {routines.length === 0 && (
          <p className="rounded-xl border p-8 text-center text-muted-foreground">
            No class routines found.
          </p>
        )}

        <ClassRoutineSheet
          id={selectedRoutine}
          open={open}
          onOpenChange={setOpen}
         
        />
      </>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead>Teacher</TableHead>
              <TableHead>Day</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {routines.map(routine => (
              <TableRow key={routine.id}>
                <TableCell>
                  <p className="font-medium">
                    {routine.courseOffering.course.code}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {routine.courseOffering.course.title}
                  </p>
                </TableCell>

                <TableCell>
                  {routine.courseOffering.semester.name}{' '}
                  {routine.courseOffering.semester.year}
                  <p className="text-xs text-muted-foreground">
                    Section {routine.courseOffering.section}
                  </p>
                </TableCell>

                <TableCell>
                  {routine?.courseOffering?.teacher?.user.firstName}
                </TableCell>

                <TableCell>{routine.day}</TableCell>

                <TableCell className="whitespace-nowrap">
                  {routine.startTime} - {routine.endTime}
                </TableCell>

                <TableCell>{routine.room}</TableCell>

                <TableCell>
                  <Badge variant={routine.isActive ? 'default' : 'secondary'}>
                    {routine.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleView(routine.id)}
                  >
                    <Eye className="mr-2 size-4" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {routines.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="h-24 text-center text-muted-foreground"
                >
                  No class routines found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <ClassRoutineSheet
      id={ selectedRoutine}
        open={open}
        onOpenChange={setOpen}
        
      />
    </>
  );
}
