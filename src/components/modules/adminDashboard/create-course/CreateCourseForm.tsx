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
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/toast';
import { useCreateCourse } from '@/hooks/admin-hook/course.hook';
import { useGetDepartment } from '@/hooks/department.hook';
import { crateCourseValidation } from '@/validation/course.validation';
import { useForm } from '@tanstack/react-form';
import React from 'react';
import { PlusCircle } from 'lucide-react';

const CreateCourseForm = () => {
  const { mutate: createCourse, isPending: insertPeending } = useCreateCourse();
  const { data } = useGetDepartment({ limit: 100 });
  const departments = data?.data?.data || [];

  const departmentItem = departments.map(department => {
    const item = {
      value: department.id,
      label: department?.name,
    };
    return item;
  });

  const form = useForm({
    defaultValues: {
      departmentId: '',
      code: '',
      title: '',
      description: '',
      credit: 0,
    },
    validators: {
      onSubmit: crateCourseValidation,
    },
    onSubmit: ({ value }) => {
      const payload = {
        departmentId: value.departmentId,
        code: value.code,
        title: value.title,
        description: value.description,
        credit: value.credit,
      };
      createCourse(payload, {
        onSuccess: res => {
          toast.add({
            type: 'success',
            title: 'Create Course Successful',
          });
        },
        onError: err => {
          console.log(err.message);
          toast.add({
            type: 'error',
            title: 'Something went wrong',
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
        {/* Department ID */}
        <form.Field
          name="departmentId"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid} className="space-y-1.5">
                <Label className="font-medium text-sm">Choose Department</Label>
                <Select
                  items={departmentItem}
                  value={field.state.value}
                  onValueChange={value => field.handleChange(value ?? '')}
                  autoComplete="off"
                >
                  <SelectTrigger className="w-full transition-all focus-visible:ring-1">
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Departments</SelectLabel>
                      {departmentItem.map(item => (
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

        {/* Course Code */}
        <form.Field
          name="code"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid} className="space-y-1.5">
                <Label htmlFor={field.name} className="font-medium text-sm">
                  Course Code
                </Label>
                <Input
                  type="text"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  autoComplete="off"
                  placeholder="e.g. CSE-101"
                  className="transition-all focus-visible:ring-1"
                />
                {inValid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        {/* Title */}
        <form.Field
          name="title"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid} className="space-y-1.5">
                <Label htmlFor={field.name} className="font-medium text-sm">
                  Title
                </Label>
                <Input
                  type="text"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  autoComplete="off"
                  placeholder="e.g. Introduction to Programming"
                  className="transition-all focus-visible:ring-1"
                />
                {inValid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        {/* Description */}
        <form.Field
          name="description"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid} className="space-y-1.5">
                <Label htmlFor={field.name} className="font-medium text-sm">
                  Description
                </Label>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  autoComplete="off"
                  placeholder="Provide a short description of the course..."
                  rows={3}
                  className="resize-none transition-all focus-visible:ring-1"
                />
                {inValid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        {/* Credit */}
        <form.Field
          name="credit"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid} className="space-y-1.5">
                <Label htmlFor={field.name} className="font-medium text-sm">
                  Credit
                </Label>
                <Input
                  type="number"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(Number(e.target.value))}
                  onBlur={field.handleBlur}
                  autoComplete="off"
                  placeholder="e.g. 3"
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
          disabled={insertPeending}
          type="submit"
          className="w-full gap-2 font-medium"
        >
          {insertPeending ? (
            <Spinner />
          ) : (
            <>
              <PlusCircle className="h-4 w-4" />
              <span>Create Course</span>
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default CreateCourseForm;
