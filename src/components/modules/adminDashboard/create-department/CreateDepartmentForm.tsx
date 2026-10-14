'use client';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/toast';
import { useCreateDepartment } from '@/hooks/admin-hook/department.hook';
import { createDepartment } from '@/validation/create.department';
import { useForm } from '@tanstack/react-form';
import React from 'react';
import { PlusCircle } from 'lucide-react';

const CreateDepartmentForm = () => {
  const { mutate: insertDepartment, isPending: departmentPending } =
    useCreateDepartment();

  const form = useForm({
    defaultValues: {
      name: '',
      code: '',
      description: '',
    },
    validators: {
      onSubmit: createDepartment,
    },
    onSubmit: ({ value }) => {
      const payload = {
        name: value.name,
        code: value.code,
        description: value.description,
      };

      insertDepartment(payload, {
        onSuccess: res => {
          toast.add({
            type: 'success',
            title: 'Create department Successful',
          });
        },
        onError: err => {
          console.log(err);
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
        {/* Department Name */}
        <form.Field
          name="name"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid} className="space-y-1.5">
                <Label htmlFor={field.name} className="font-medium text-sm">
                  Department Name
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  onBlur={field.handleBlur}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  type="text"
                  placeholder="e.g. Computer Science & Engineering"
                  autoComplete="off"
                  className="transition-all focus-visible:ring-1"
                />
                {inValid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        {/* Department Code */}
        <form.Field
          name="code"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid} className="space-y-1.5">
                <Label htmlFor={field.name} className="font-medium text-sm">
                  Department Code
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  placeholder="e.g. CSE"
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
                  placeholder="Provide a brief description about this department..."
                  onBlur={field.handleBlur}
                  autoComplete="off"
                  rows={4}
                  className="resize-none transition-all focus-visible:ring-1"
                />
                {inValid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
      </FieldGroup>

      {/* Submit Button */}
      <Button
        disabled={departmentPending}
        type="submit"
        className="w-full gap-2 font-medium"
      >
        {departmentPending ? (
          <Spinner />
        ) : (
          <>
            <PlusCircle className="h-4 w-4" />
            <span>Create Department</span>
          </>
        )}
      </Button>
    </form>
  );
};

export default CreateDepartmentForm;
