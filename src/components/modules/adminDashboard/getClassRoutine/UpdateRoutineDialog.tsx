'use client';

import { useEffect, useState } from 'react';
import { useForm } from '@tanstack/react-form';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DayOfWeek, IClassRoutine, IClassRoutineUpdate } from '@/type/addminAccess/get.class.routine.type';
import { updateClassRoutineValidation } from '@/validation/class.routine.validation';
import { useUpdateClassRoutine } from '@/hooks/admin-hook/class.routin.hook';
import { toast } from '@/components/ui/toast';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';






const days: DayOfWeek[] = [
  'SATURDAY',
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
];

interface Props {
  routine: IClassRoutine;
  open: boolean;
  onOpenChange: (open: boolean) => void;
 
}

export default function UpdateRoutineDialog({
  routine,
  open,
  onOpenChange,
  
}: Props) {
  const [submitting, setSubmitting] = useState(false);
  
  const {mutateAsync:update}=useUpdateClassRoutine()

  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      day: routine.day,
      startTime: routine.startTime,
      endTime: routine.endTime,
      room: routine.room,
    },
    validators:{
      onSubmit:updateClassRoutineValidation
    },

    onSubmit: async ({ value }) => {

      const data={
        payload: {
          day: value.day,
          startTime: value.startTime,
          endTime: value.endTime,
          room: value.room,
        },
        id:routine.id
      };
      
      try {
        setSubmitting(true);

        await update(data);

        toast.add({
          type: 'success',
          title: 'Class routine updated successfully',
        });

        queryClient.invalidateQueries({
          queryKey: ['single-get-routine', routine.id],
        });

        queryClient.invalidateQueries({
          queryKey: ['class-routines'],
        });
         
       
        
        onOpenChange(false);
      } catch {
        toast.add({
          type:'error',
          title:'Failed to update class routine'
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        day: routine.day,
        startTime: routine.startTime,
        endTime: routine.endTime,
        room: routine.room,
      });
    }
  }, [
    open,
    routine.id,
    routine.day,
    routine.startTime,
    routine.endTime,
    routine.room,
  ]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Class Routine</DialogTitle>
          <DialogDescription>
            Update the schedule for {routine?.courseOffering?.course?.code}.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={event => {
            event.preventDefault();
            event.stopPropagation();
            void form.handleSubmit();
          }}
          className="space-y-5"
        >
          <form.Field name="day">
            {field => (
              <div className="space-y-2">
                <Label>Class Day</Label>

                <Select
                  value={field.state.value}
                  onValueChange={value =>
                    field.handleChange(value as DayOfWeek)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>

                  <SelectContent>
                    {days.map(day => (
                      <SelectItem key={day} value={day}>
                        {day.charAt(0) + day.slice(1).toLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </form.Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <form.Field name="startTime">
              {field => (
                <div className="space-y-2">
                  <Label>Start Time</Label>
                  <Input
                    type="time"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={event => field.handleChange(event.target.value)}
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="endTime">
              {field => (
                <div className="space-y-2">
                  <Label>End Time</Label>
                  <Input
                    type="time"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={event => field.handleChange(event.target.value)}
                  />
                </div>
              )}
            </form.Field>
          </div>

          <form.Field name="room">
            {field => (
              <div className="space-y-2">
                <Label>Room</Label>
                <Input
                  value={field.state.value}
                  placeholder="e.g. Room 101"
                  onBlur={field.handleBlur}
                  onChange={event => field.handleChange(event.target.value)}
                />
              </div>
            )}
          </form.Field>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              disabled={submitting}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={submitting}>
              {submitting ? 'Updating...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
