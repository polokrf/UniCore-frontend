
'use client';

import { useForm } from '@tanstack/react-form';
import React, { useState } from 'react';
import { Field, FieldError, FieldGroup } from '../ui/field';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { loginPayload } from '@/validation/auth.validation';
import { useLoginFlow } from '@/hooks/auth.hook';
import { Spinner } from '../ui/spinner';
import { Eye, EyeClosed, LockKeyhole, Mail } from 'lucide-react';

const LoginForm = () => {
  const { login, isPending: loginPending } = useLoginFlow();
  const [show, setShow] = useState(false);

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

  const handleShow = () => {
    setShow((pre) => !pre);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-5"
    >
      <FieldGroup className="space-y-5">

        {/* Email Field */}
        <form.Field
          name="email"
          children={(field) => {
            const inValid =
              field.state.meta.isTouched &&
              !field.state.meta.isValid;

            return (
              <div className="space-y-2">
                <Field data-invalid={inValid}>
                  <Label
                    htmlFor={field.name}
                    className="text-sm font-semibold text-slate-700"
                  >
                    Email Address
                  </Label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <Input
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(e.target.value)
                      }
                      type="email"
                      placeholder="Enter your email address"
                      autoComplete="email"
                      className="h-12 rounded-xl border-slate-200 bg-slate-50 pl-11 text-sm transition-all placeholder:text-slate-400 hover:border-slate-300 focus-visible:border-blue-500 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-blue-500/10"
                      aria-invalid={inValid}
                    />
                  </div>

                  {inValid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              </div>
            );
          }}
        />

        {/* Password Field */}
        <form.Field
          name="password"
          children={(field) => {
            const inValid =
              field.state.meta.isTouched &&
              !field.state.meta.isValid;

            return (
              <div className="space-y-2">
                <Field data-invalid={inValid}>
                  <Label
                    htmlFor={field.name}
                    className="text-sm font-semibold text-slate-700"
                  >
                    Password
                  </Label>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(e.target.value)
                      }
                      onBlur={field.handleBlur}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      type={show ? 'text' : 'password'}
                      className="h-12 rounded-xl border-slate-200 bg-slate-50 pl-11 pr-12 text-sm transition-all placeholder:text-slate-400 hover:border-slate-300 focus-visible:border-blue-500 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-blue-500/10"
                      aria-invalid={inValid}
                    />

                    <button
                      className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-200/70 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      onClick={handleShow}
                      type="button"
                      aria-label={
                        show ? 'Hide password' : 'Show password'
                      }
                    >
                      {show ? (
                        <EyeClosed size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  {inValid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              </div>
            );
          }}
        />

      </FieldGroup>

      {/* Submit Button */}
      <Button
        disabled={loginPending}
        type="submit"
        className="h-12 w-full rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition-all duration-200 hover:from-blue-800 hover:to-indigo-800 hover:shadow-xl hover:shadow-blue-700/25 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loginPending ? (
          <>
            <Spinner />
            <span>Logging in...</span>
          </>
        ) : (
          'Login Now!'
        )}
      </Button>
    </form>
  );
};

export default LoginForm;

