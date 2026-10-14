'use client';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { toast } from '@/components/ui/toast';
import { useCreateClassRoutine } from '@/hooks/admin-hook/class.routin.hook';
import { useGetCourseOffering } from '@/hooks/admin-hook/courseOffering.hook';
import { errorMessage } from '@/lib/format';
import { DayOfWeek } from '@/type/addminAccess/classRoutine.type';
import { createClassRoutineValidation } from '@/validation/class.routine.validation';
import { useForm } from '@tanstack/react-form';
import React from 'react';
import { PlusCircle } from 'lucide-react';

const ClassRoutineForm = () => {
  const { data } = useGetCourseOffering();
  const courseOfferings = data?.data || [];

  const { mutate: createClassRoutine, isPending: insertPending } =
    useCreateClassRoutine();

  const day = [
    { value: 'SATURDAY', label: 'Saturday' },
    { value: 'SUNDAY', label: 'Sunday' },
    { value: 'MONDAY', label: 'Monday' },
    { value: 'TUESDAY', label: 'Tuesday' },
    { value: 'WEDNESDAY', label: 'Wednesday' },
    { value: 'THURSDAY', label: 'Thursday' },
    { value: 'FRIDAY', label: 'Friday' },
  ];

  const courseOfferingId = courseOfferings.map(offering => {
    const selectOffering = {
      value: offering.id,
      label: `${offering.course.title} Section ${offering.section}${offering.teacherId ? '' : ' (No teacher)'}`,
      disabled: !offering.teacherId,
    };
    return selectOffering;
  });

  const form = useForm({
    defaultValues: {
      courseOfferingId: '',
      day: 'SATURDAY',
      startTime: '',
      endTime: '',
      room: '',
    },
    validators: {
      onSubmit: createClassRoutineValidation,
    },
    onSubmit: ({ value }) => {
      const payload = {
        courseOfferingId: value.courseOfferingId,
        day: value.day as DayOfWeek,
        startTime: value.startTime,
        endTime: value.endTime,
        room: value.room,
      };

      createClassRoutine(payload, {
        onSuccess: res => {
          toast.add({
            type: 'success',
            title: 'Create Class Routine Successful',
          });
        },
        onError: err => {
          toast.add({
            type: 'error',
            title: 'Could not create the class routine',
            description: errorMessage(err, 'Something went wrong'),
          });
        },
      });
    },
  });

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-5"
    >
      <FieldGroup className="space-y-4">
        {/* Course Section */}
        <form.Field
          name="courseOfferingId"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid} className="space-y-1.5">
                <Label className="font-medium text-sm">
                  Choose Course Section
                </Label>
                <Select
                  items={courseOfferingId}
                  value={field.state.value}
                  onValueChange={value => field.handleChange(value ?? '')}
                  autoComplete="off"
                >
                  <SelectTrigger className="w-full transition-all focus-visible:ring-1">
                    <SelectValue placeholder="Select course section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Course Section</SelectLabel>
                      {courseOfferingId.map(item => (
                        <SelectItem
                          key={item.value}
                          value={item.value}
                          disabled={item.disabled}
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {inValid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        {/* Day */}
        <form.Field
          name="day"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid} className="space-y-1.5">
                <Label className="font-medium text-sm">Choose Day</Label>
                <Select
                  items={day}
                  value={field.state.value}
                  onValueChange={value => field.handleChange(value ?? '')}
                  autoComplete="off"
                >
                  <SelectTrigger className="w-full transition-all focus-visible:ring-1">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Day</SelectLabel>
                      {day.map(item => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {inValid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        {/* Start Time */}
        <form.Field
          name="startTime"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid} className="space-y-1.5">
                <Label htmlFor={field.name} className="font-medium text-sm">
                  Start Time
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  placeholder="Select start time"
                  onBlur={field.handleBlur}
                  autoComplete="off"
                  type="time"
                  className="transition-all focus-visible:ring-1"
                />
                {inValid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        {/* End Time */}
        <form.Field
          name="endTime"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid} className="space-y-1.5">
                <Label htmlFor={field.name} className="font-medium text-sm">
                  End Time
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  placeholder="Select end time"
                  onBlur={field.handleBlur}
                  autoComplete="off"
                  type="time"
                  className="transition-all focus-visible:ring-1"
                />
                {inValid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        {/* Class Room */}
        <form.Field
          name="room"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid} className="space-y-1.5">
                <Label htmlFor={field.name} className="font-medium text-sm">
                  Class Room
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  placeholder="e.g. Lab-301"
                  onBlur={field.handleBlur}
                  autoComplete="off"
                  type="text"
                  className="transition-all focus-visible:ring-1"
                />
                {inValid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
      </FieldGroup>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          disabled={insertPending}
          type="submit"
          className="w-full gap-2 font-medium"
        >
          {insertPending ? (
            <Spinner />
          ) : (
            <>
              <PlusCircle className="h-4 w-4" />
              <span>Create Routine</span>
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default ClassRoutineForm;
