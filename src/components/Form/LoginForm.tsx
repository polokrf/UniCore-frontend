'use client'
import {  useForm } from '@tanstack/react-form';
import React, { useState } from 'react';
import { Field, FieldError, FieldGroup } from '../ui/field';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { loginPayload } from '@/validation/auth.validation';
import { useLoginFlow } from '@/hooks/auth.hook';
import { toast } from '../ui/toast';
import { useRouter } from 'next/navigation';
import { Spinner } from '../ui/spinner';
import { Eye, EyeClosed } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';




const LoginForm = () => {
const { login, isPending: loginPending } = useLoginFlow()
const [show,setShow]=useState(false)
const queryClient = useQueryClient()

 const route = useRouter()

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: loginPayload,
    },
    onSubmit: ({ value }) => {
      const loginBody = {
        email: value.email,
        password: value.password,
      };

      login(loginBody);
    },
  });

  const handleShow =()=>{
    setShow((pre)=> !pre)
  }

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
          name="email"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <div>
                <Field data-invalid={inValid}>
                  <Label htmlFor={field.name}> Email</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    onChange={e => field.handleChange(e.target.value)}
                    type="email"
                    placeholder="plz give valid email"
                    autoComplete="off"
                  />
                  {inValid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              </div>
            );
          }}
        />

        <form.Field
          name="password"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <div className=" space-y-1  relative">
                <Field data-invalid={inValid}>
                  <Label htmlFor={field.name}>Password</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={e => field.handleChange(e.target.value)}
                    placeholder="plz inter 6 digit password code"
                    onBlur={field.handleBlur}
                    autoComplete="off"
                    type={show ? 'text' : 'password'}
                  />
                  {inValid && <FieldError errors={field.state.meta.errors} />}
                </Field>
                <div className=" absolute right-3 top-6">
                  <button className="" onClick={handleShow} type="button">
                    {show ? <EyeClosed size={12} /> : <Eye size={12} />}
                  </button>
                </div>
              </div>
            );
          }}
        />
      </FieldGroup>

      <Button disabled={loginPending} type="submit" className="w-full">
        {loginPending ? <Spinner /> : 'Login Now!'}
      </Button>
    </form>
  );
};

export default LoginForm;