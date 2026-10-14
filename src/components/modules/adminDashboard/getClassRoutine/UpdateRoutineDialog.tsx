'use client';

import { useEffect, useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { toast } from 'sonner';

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




const schema = z.object({
  day: z
    .enum([
      'SATURDAY',
      'SUNDAY',
      'MONDAY',
      'TUESDAY',
      'WEDNESDAY',
      'THURSDAY',
      'FRIDAY',
    ])
    .optional(),

  startTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid start time')
    .optional(),

  endTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid end time')
    .optional(),

  room: z
    .string()
    .trim()
    .min(1, 'Room is required')
    .max(50, 'Room is too long')
    .optional(),
});

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

  const form = useForm({
    defaultValues: {
      day: routine.day,
      startTime: routine.startTime,
      endTime: routine.endTime,
      room: routine.room,
    },

    onSubmit: async ({ value }) => {
      const result = schema.safeParse(value);

      if (!result.success) {
        toast.error(result.error.issues[0]?.message ?? 'Invalid form data');
        return;
      }

      if (result.data.startTime && result.data.endTime) {
        if (result.data.startTime >= result.data.endTime) {
          toast.error('End time must be after start time');
          return;
        }
      }

      try {
        setSubmitting(true);

        // await onUpdate(routine.id, result.data);

        toast.success('Class routine updated successfully');
        onOpenChange(false);
      } catch {
        toast.error('Failed to update class routine');
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
