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
import { useSimpleGetCourse } from '@/hooks/admin-hook/course.hook';
import { useCourseOffering } from '@/hooks/admin-hook/courseOffering.hook';
import { useSimpleGetSemester } from '@/hooks/admin-hook/semester.hook';
import { errorMessage } from '@/lib/format';
import TeacherSelect from './TeacherSelect';
import { createOfferingValid } from '@/validation/courseOffering.validation';
import { useForm } from '@tanstack/react-form';
import React from 'react';
import { PlusCircle } from 'lucide-react';

const CourseOfferingForm = () => {
  const { data: courses, isLoading: courseLoading } = useSimpleGetCourse();
  const { data: semesters, isLoading: semesterLoading } =
    useSimpleGetSemester();

  const semesterData = semesters?.data.data || [];
  const courseData = courses?.data.data || [];

  const courseItems = courseData.map(item => ({
    value: item.id,
    label: item.title,
  }));

  const semesterItems = semesterData.map(item => ({
    value: item.id,
    label: item.name,
  }));

  const { mutate: createOffering, isPending: insertPending } =
    useCourseOffering();

  const form = useForm({
    defaultValues: {
      courseId: '',
      semesterId: '',
      section: '',
      capacity: 0,
      fee: 0,
      teacherId: '',
    },
    validators: {
      onSubmit: createOfferingValid,
    },
    onSubmit: ({ value }) => {
      const payload = {
        courseId: value.courseId,
        semesterId: value.semesterId,
        section: value.section,
        capacity: value.capacity,
        fee: value.fee,
        ...(value.teacherId ? { teacherId: value.teacherId } : {}),
      };
      createOffering(payload, {
        onSuccess: () => {
          toast.add({
            type: 'success',
            title: 'Course offering created',
            description: payload.teacherId
              ? 'The teacher was assigned too.'
              : 'No teacher yet. Assign one from All-CourseOffering.',
          });
          form.reset();
        },
        onError: err => {
          toast.add({
            type: 'error',
            title: 'Could not create the offering',
            description: errorMessage(err, 'Something went wrong'),
          });
        },
      });
    },
  });

  if (courseLoading || semesterLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner />
      </div>
    );
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-5"
    >
      <FieldGroup className="space-y-4">
        {/* CourseId */}
        <form.Field
          name="courseId"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid} className="space-y-1.5">
                <Label className="font-medium text-sm">Choose Course</Label>
                <Select
                  items={courseItems}
                  value={field.state.value}
                  onValueChange={value => {
                    field.handleChange(value ?? '');
                    form.setFieldValue('teacherId', '');
                  }}
                  autoComplete="off"
                >
                  <SelectTrigger className="w-full transition-all focus-visible:ring-1">
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Course</SelectLabel>
                      {courseItems.map(item => (
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

        {/* Semester */}
        <form.Field
          name="semesterId"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid} className="space-y-1.5">
                <Label className="font-medium text-sm">Choose Semester</Label>
                <Select
                  items={semesterItems}
                  value={field.state.value}
                  onValueChange={value => field.handleChange(value ?? '')}
                  autoComplete="off"
                >
                  <SelectTrigger className="w-full transition-all focus-visible:ring-1">
                    <SelectValue placeholder="Select a semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Semester</SelectLabel>
                      {semesterItems.map(item => (
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

        {/* Section */}
        <form.Field
          name="section"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid} className="space-y-1.5">
                <Label htmlFor={field.name} className="font-medium text-sm">
                  Section
                </Label>
                <Input
                  type="text"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  autoComplete="off"
                  placeholder="e.g. A"
                  className="transition-all focus-visible:ring-1"
                />
                {inValid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        {/* Capacity */}
        <form.Field
          name="capacity"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid} className="space-y-1.5">
                <Label htmlFor={field.name} className="font-medium text-sm">
                  Capacity
                </Label>
                <Input
                  type="number"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(Number(e.target.value))}
                  onBlur={field.handleBlur}
                  autoComplete="off"
                  placeholder="e.g. 40"
                  className="transition-all focus-visible:ring-1"
                />
                {inValid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        {/* Course Fee */}
        <form.Field
          name="fee"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid} className="space-y-1.5">
                <Label htmlFor={field.name} className="font-medium text-sm">
                  Course Fee
                </Label>
                <Input
                  type="number"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(Number(e.target.value))}
                  onBlur={field.handleBlur}
                  autoComplete="off"
                  placeholder="e.g. 5000"
                  className="transition-all focus-visible:ring-1"
                />
                {inValid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        {/* Teacher (optional) */}
        <form.Subscribe selector={state => state.values.courseId}>
          {courseId => (
            <form.Field
              name="teacherId"
              children={field => (
                <Field className="space-y-1.5">
                  <Label htmlFor="teacherId" className="font-medium text-sm">
                    Teacher (optional)
                  </Label>
                  <TeacherSelect
                    id="teacherId"
                    departmentId={
                      courseData.find(c => c.id === courseId)?.departmentId
                    }
                    value={field.state.value}
                    onChange={field.handleChange}
                    allowNone
                  />
                </Field>
              )}
            />
          )}
        </form.Subscribe>
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
              <span>Submit Course Offering</span>
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default CourseOfferingForm;
