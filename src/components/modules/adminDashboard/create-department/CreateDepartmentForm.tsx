'use client'

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

const CreateDepartmentForm = () => {
  const {mutate:insertDepartment,isPending:departmentPending}=useCreateDepartment()

  const form =useForm({
    defaultValues:{
    name:'',
    code:'',
    description:''
    },
    validators:{
      onSubmit:createDepartment
    },
    onSubmit:({value})=>{
    //  console.log(value)
     const payload ={
      name:value.name,
      code:value.code,
      description:value.description
     }

     insertDepartment(payload,{
      onSuccess:(res)=>{
        // console.log(res)
        toast.add({
          type:'success',
          title:"Create department Successful"
        })
      },
      onError:(err)=>{
        console.log(err)
        toast.add({
          type: 'success',
          title: 'something was worn',
        });
      }
     })
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
                  <Label htmlFor={field.name}>Department Name</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    onChange={e => field.handleChange(e.target.value)}
                    type="text"
                    placeholder="plz give you Department name"
                    autoComplete="off"
                  />
                  {inValid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              </div>
            );
          }}
        />

        <form.Field
          name="code"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid}>
                <Label htmlFor={field.name}>Department Code</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  placeholder="plz give Department code"
                  onBlur={field.handleBlur}
                  autoComplete="off"
                  type="text"
                />
                {inValid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        <form.Field
          name="description"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid}>
                <Label htmlFor={field.name}>Description</Label>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  placeholder="plz give department details"
                  onBlur={field.handleBlur}
                  autoComplete="off"
                 
                />
                {inValid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
      </FieldGroup>

      <Button disabled={departmentPending} type="submit" className="w-full">
        {departmentPending ? <Spinner /> : 'Submit'}
      </Button>
    </form>
  );
};

export default CreateDepartmentForm;