
'use client';

import { useForm } from '@tanstack/react-form';
import React, { useState } from 'react';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '../ui/field';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
  Eye,
  EyeClosed,
  UserRound,
  Mail,
  LockKeyhole,
} from 'lucide-react';
import { registerPayload } from '@/validation/auth.validation';
import { useRegister } from '@/hooks/auth.hook';
import { useRouter } from 'next/navigation';
import { toast } from '../ui/toast';
import { Spinner } from '../ui/spinner';
import { useQueryClient } from '@tanstack/react-query';
import { apiErrorMessage } from '@/lib/apiError';

const RegisterForm = () => {
  const [show, setShow] = useState(false);
  const [conShow, setConShow] = useState(false);

  const {
    mutate: register,
    isPending: registerPending,
  } = useRegister();

  const queryClient = useQueryClient();
  const route = useRouter();

  const form = useForm({
    defaultValues: {
      firstName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },

    validators: {
      onSubmit: registerPayload,
    },

    onSubmit: ({ value }) => {
      const registerData = {
        firstName: value.firstName,
        email: value.email,
        password: value.password,
      };

      register(registerData, {
        onSuccess: () => {
          toast.add({
            type: 'success',
            description:
              'Account created. Choose a department to apply.',
          });

          queryClient.invalidateQueries({
            queryKey: ['user'],
          });

          route.push('/chose-department');
        },

        onError: (error) => {
          toast.add({
            type: 'error',
            description: apiErrorMessage(
              error,
              'Could not create your account',
            ),
          });
        },
      });
    },
  });

  const handleShow = () => {
    setShow((prev) => !prev);
  };

  const handleConShow = () => {
    setConShow((prev) => !prev);
  };

  const inputClassName =
    'h-11 w-full rounded-xl border-blue-100 bg-blue-50/40 pl-11 pr-4 text-sm transition-all placeholder:text-slate-400 hover:border-blue-200 focus-visible:border-blue-400 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-blue-100';

  const passwordInputClassName =
    'h-11 w-full rounded-xl border-blue-100 bg-blue-50/40 pl-11 pr-12 text-sm transition-all placeholder:text-slate-400 hover:border-blue-200 focus-visible:border-blue-400 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-blue-100';

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="w-full min-w-0 space-y-4"
    >
      <FieldGroup className="space-y-4">

        {/* Name Field */}
        <form.Field
          name="firstName"
          children={(field) => {
            const invalid =
              field.state.meta.isTouched &&
              !field.state.meta.isValid;

            return (
              <Field data-invalid={invalid} className="space-y-2">
                <FieldLabel
                  htmlFor={field.name}
                  className="text-sm font-semibold text-slate-700"
                >
                  Name
                </FieldLabel>

                <div className="relative">
                  <UserRound
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400"
                  />

                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                    onBlur={field.handleBlur}
                    autoComplete="name"
                    placeholder="Enter your name"
                    type="text"
                    className={inputClassName}
                    aria-invalid={invalid}
                  />
                </div>

                {invalid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            );
          }}
        />

        {/* Email Field */}
        <form.Field
          name="email"
          children={(field) => {
            const invalid =
              field.state.meta.isTouched &&
              !field.state.meta.isValid;

            return (
              <Field data-invalid={invalid} className="space-y-2">
                <FieldLabel
                  htmlFor={field.name}
                  className="text-sm font-semibold text-slate-700"
                >
                  Email Address
                </FieldLabel>

                <div className="relative">
                  <Mail
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400"
                  />

                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                    onBlur={field.handleBlur}
                    autoComplete="email"
                    placeholder="Enter your email address"
                    type="email"
                    className={inputClassName}
                    aria-invalid={invalid}
                  />
                </div>

                {invalid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            );
          }}
        />

        {/* Password Field */}
        <form.Field
          name="password"
          children={(field) => {
            const invalid =
              field.state.meta.isTouched &&
              !field.state.meta.isValid;

            return (
              <Field data-invalid={invalid} className="space-y-2">
                <FieldLabel
                  htmlFor={field.name}
                  className="text-sm font-semibold text-slate-700"
                >
                  Password
                </FieldLabel>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400"
                  />

                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                    onBlur={field.handleBlur}
                    autoComplete="new-password"
                    placeholder="Enter your password"
                    type={show ? 'text' : 'password'}
                    className={passwordInputClassName}
                    aria-invalid={invalid}
                  />

                  <button
                    className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-blue-400 transition-colors hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                    onClick={handleShow}
                    type="button"
                    aria-label={
                      show ? 'Hide password' : 'Show password'
                    }
                  >
                    {show ? (
                      <EyeClosed size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>

                {invalid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            );
          }}
        />

        {/* Confirm Password Field */}
        <form.Field
          name="confirmPassword"
          children={(field) => {
            const invalid =
              field.state.meta.isTouched &&
              !field.state.meta.isValid;

            return (
              <Field data-invalid={invalid} className="space-y-2">
                <FieldLabel
                  htmlFor={field.name}
                  className="text-sm font-semibold text-slate-700"
                >
                  Confirm Password
                </FieldLabel>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400"
                  />

                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                    onBlur={field.handleBlur}
                    autoComplete="new-password"
                    placeholder="Confirm your password"
                    type={conShow ? 'text' : 'password'}
                    className={passwordInputClassName}
                    aria-invalid={invalid}
                  />

                  <button
                    className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-blue-400 transition-colors hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                    onClick={handleConShow}
                    type="button"
                    aria-label={
                      conShow
                        ? 'Hide confirm password'
                        : 'Show confirm password'
                    }
                  >
                    {conShow ? (
                      <EyeClosed size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>

                {invalid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            );
          }}
        />

      </FieldGroup>

      {/* Submit Button */}
      <div className="pt-1">
        <Button
          disabled={registerPending}
          type="submit"
          className="h-12 w-full rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-sm font-semibold text-white shadow-lg shadow-blue-200/70 transition-all duration-200 hover:from-sky-600 hover:to-blue-700 hover:shadow-xl hover:shadow-blue-200 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {registerPending ? (
            <>
              <Spinner />
              <span>Creating Account...</span>
            </>
          ) : (
            'Register Now!'
          )}
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;

