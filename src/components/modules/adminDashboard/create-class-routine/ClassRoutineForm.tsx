'use client'

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { toast } from '@/components/ui/toast';
import { useCreateClassRoutine } from '@/hooks/admin-hook/class.routin.hook';
import { useGetCourseOffering } from '@/hooks/admin-hook/courseOffering.hook';
import { errorMessage } from '@/lib/format';
import { DayOfWeek } from '@/type/addminAccess/classRoutine.type';
import { createClassRoutineValidation } from '@/validation/class.routine.validation';
import { useForm } from '@tanstack/react-form';
import React from 'react';

const ClassRoutineForm = () => {
   
  const {data}=useGetCourseOffering()
  const courseOfferings = data?.data ||[]

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

 
  const courseOfferingId = courseOfferings.map(offering =>{
    const selectOffering = {
      value: offering.id,
      label: `${offering.course.title} - Section ${offering.section}${offering.teacherId ? '' : ' (No teacher)'}`,
      // the backend refuses a routine for an offering without a teacher
      disabled: !offering.teacherId,
    };

    return selectOffering
  }) 

 

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
          // console.log(res)
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
      className=" space-y-2"
    >
      <FieldGroup>
        <form.Field
          name="courseOfferingId"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid}>
                {/* <Label htmlFor={field.name}>Gender</Label> */}

                <Label>Chose  Course Section </Label>
                <Select
                  items={courseOfferingId}
                  value={field.state.value}
                  onValueChange={value => field.handleChange(value ?? '')}
                  autoComplete="off"
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Course Section</SelectLabel>

                      {courseOfferingId.map(item => (
                        <SelectItem key={item.value} value={item.value} disabled={item.disabled}>
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
        <form.Field
          name="day"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid}>
                {/* <Label htmlFor={field.name}>Gender</Label> */}

                <Label>Chose  Day </Label>
                <Select
                  items={day}
                  value={field.state.value}
                  onValueChange={value => field.handleChange(value ?? '')}
                  autoComplete="off"
                >
                  <SelectTrigger>
                    <SelectValue />
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

        <form.Field
          name="startTime"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid}>
                <Label htmlFor={field.name}>Start-Time</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  placeholder="plz give Start Time"
                  onBlur={field.handleBlur}
                  autoComplete="off"
                  type="time"
                />
                {inValid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        <form.Field
          name="endTime"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid}>
                <Label htmlFor={field.name}>End-Time</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  placeholder="plz give end time"
                  onBlur={field.handleBlur}
                  autoComplete="off"
                  type="time"
                />
                {inValid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        <form.Field
          name="room"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid}>
                <Label htmlFor={field.name}>Class-Room</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  placeholder="plz give Room"
                  onBlur={field.handleBlur}
                  autoComplete="off"
                  type="text"
                />
                {inValid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
      </FieldGroup>

      <Button disabled={insertPending} type="submit" className="w-full">
        {insertPending ? <Spinner /> : 'Submit'}
      </Button>
    </form>
  );
};

export default ClassRoutineForm;