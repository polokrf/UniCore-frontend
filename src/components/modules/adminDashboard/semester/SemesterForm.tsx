'use client';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { toast } from '@/components/ui/toast';
import { useCreateSemester } from '@/hooks/admin-hook/semester.hook';
import { createSemesterValidation } from '@/validation/semester.valid';
import { useForm } from '@tanstack/react-form';
import React from 'react';
import { PlusCircle } from 'lucide-react';

const SemesterForm = () => {
  const { mutate: createSemester, isPending: insertPending } =
    useCreateSemester();

  const form = useForm({
    defaultValues: {
      name: '',
      year: 0,
      startDate: '',
      endDate: '',
    },
    validators: {
      onSubmit: createSemesterValidation,
    },
    onSubmit: ({ value }) => {
      const payload = {
        name: value.name,
        year: value.year,
        startDate: value.startDate,
        endDate: value.endDate,
      };

      createSemester(payload, {
        onSuccess: res => {
          toast.add({
            type: 'success',
            title: 'Create semester Successful',
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
        {/* Semester Name */}
        <form.Field
          name="name"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid} className="space-y-1.5">
                <Label htmlFor={field.name} className="font-medium text-sm">
                  Semester Name
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  onBlur={field.handleBlur}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  type="text"
                  placeholder="e.g. Fall 2026"
                  autoComplete="off"
                  className="transition-all focus-visible:ring-1"
                />
                {inValid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        {/* Year */}
        <form.Field
          name="year"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid} className="space-y-1.5">
                <Label htmlFor={field.name} className="font-medium text-sm">
                  Year
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(Number(e.target.value))}
                  placeholder="e.g. 2026"
                  onBlur={field.handleBlur}
                  autoComplete="off"
                  type="number"
                  className="transition-all focus-visible:ring-1"
                />
                {inValid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        {/* Start Date */}
        <form.Field
          name="startDate"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid} className="space-y-1.5">
                <Label htmlFor={field.name} className="font-medium text-sm">
                  Start Date
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  placeholder="Select start date"
                  onBlur={field.handleBlur}
                  autoComplete="off"
                  type="date"
                  className="transition-all focus-visible:ring-1"
                />
                {inValid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        {/* End Date */}
        <form.Field
          name="endDate"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid} className="space-y-1.5">
                <Label htmlFor={field.name} className="font-medium text-sm">
                  End Date
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  placeholder="Select end date"
                  onBlur={field.handleBlur}
                  autoComplete="off"
                  type="date"
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
              <span>Create Semester</span>
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default SemesterForm;
