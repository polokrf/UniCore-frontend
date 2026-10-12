'use client'
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

const SemesterForm = () => {

  const {mutate:createSemester , isPending:insertPending}=useCreateSemester()
 
  const form = useForm({
    defaultValues:{
   name:'',
   year:0,
   startDate:'',
   endDate: ''
  },
  validators:{
     onSubmit:createSemesterValidation
    },
    onSubmit:({value})=>{
            const payload = {
              name: value.name,
              year: value.year,
              startDate: value.startDate,
              endDate:value.endDate
            };

            createSemester(payload, {
              onSuccess: res => {
                // console.log(res)
                toast.add({
                  type: 'success',
                  title: 'Create semester Successful',
                });
              },
              onError: err => {
                console.log(err);
                toast.add({
                  type: 'error',
                  title: 'something was worn',
                });
              },
            });
    }
  })

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
          name="name"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <div>
                <Field data-invalid={inValid}>
                  <Label htmlFor={field.name}>Semester Name</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    onChange={e => field.handleChange(e.target.value)}
                    type="text"
                    placeholder="plz give you semester name"
                    autoComplete="off"
                  />
                  {inValid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              </div>
            );
          }}
        />

        <form.Field
          name="year"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid}>
                <Label htmlFor={field.name}>Year</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(Number(e.target.value))}
                  placeholder="plz give semester year"
                  onBlur={field.handleBlur}
                  autoComplete="off"
                  type="number"
                />
                {inValid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        <form.Field
          name="startDate"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid}>
                <Label htmlFor={field.name}>StartDate</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  placeholder="plz give semester start date"
                  onBlur={field.handleBlur}
                  autoComplete="off"
                  type="date"
                />
                {inValid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        <form.Field
          name="endDate"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid}>
                <Label htmlFor={field.name}>EndDate</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  placeholder="plz give semester End date"
                  onBlur={field.handleBlur}
                  autoComplete="off"
                  type="date"
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

export default SemesterForm;