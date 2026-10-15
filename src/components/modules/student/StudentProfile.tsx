'use client';

import { SkeletonText } from '@/components/layout/loading/SkeletonText';
import EmptyState from '@/components/shared/EmptyState';
import ProfilePhoto from '@/components/shared/ProfilePhoto';
import StatusBadge from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  useMyStudentProfile,
  useUpdateStudentProfile,
} from '@/hooks/student.hook';
import { formatDate } from '@/lib/format';
import { TStudentProfile } from '@/type/domain.type';
import { useForm } from '@tanstack/react-form';
import z from 'zod';

const schema = z.object({
  phone: z.string().trim().min(6, 'Enter a valid phone number'),
  address: z.string().trim().min(3, 'Enter your address'),
});

function EditForm({ profile }: { profile: TStudentProfile }) {
  const { mutate, isPending } = useUpdateStudentProfile();
  const form = useForm({
    defaultValues: {
      phone: profile.phone ?? '',
      address: profile.address ?? '',
    },
    validators: { onSubmit: schema },
    onSubmit: ({ value }) => mutate(value),
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
        {(['phone', 'address'] as const).map(name => (
          <form.Field key={name} name={name}>
            {field => {
              const invalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={invalid} className="space-y-1.5">
                  <Label
                    htmlFor={name}
                    className="text-xs font-semibold text-slate-700 uppercase tracking-wider"
                  >
                    {name === 'phone' ? 'Phone Number' : 'Address'}
                  </Label>
                  <Input
                    id={name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    autoComplete="off"
                    className="h-11 border-slate-200/80 bg-slate-50/50 focus:bg-white focus:border-blue-500 rounded-lg text-sm transition-all"
                    placeholder={
                      name === 'phone'
                        ? 'Enter phone number'
                        : 'Enter your full address'
                    }
                  />
                  {invalid && (
                    <FieldError
                      errors={field.state.meta.errors}
                      className="text-xs text-rose-500 font-medium"
                    />
                  )}
                </Field>
              );
            }}
          </form.Field>
        ))}
      </FieldGroup>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white h-10 font-medium rounded-lg shadow-sm transition-all"
      >
        {isPending ? 'Saving…' : 'Save changes'}
      </Button>
    </form>
  );
}

export default function StudentProfile() {
  const { data: profile, isPending, isError } = useMyStudentProfile();

  if (isPending) return <SkeletonText />;
  if (isError || !profile) {
    return (
      <EmptyState
        title="Profile not available"
        description="Your student profile is only visible once an admin has approved it."
      />
    );
  }

  const facts: [string, string][] = [
    ['Student ID', profile.studentId ?? '—'],
    ['Batch', profile.batch?.toString() ?? '—'],
    ['Semester', profile.semester?.toString() ?? '—'],
    ['Gender', profile.gender ?? '—'],
    ['Date of birth', formatDate(profile.dateOfBirth)],
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-2 items-start">
      {/* Account Details Card */}
      <Card className="rounded-xl border border-slate-200/80 shadow-sm backdrop-blur-sm overflow-hidden">
        <CardHeader className="bg-slate-50/80 border-b border-slate-200/80 py-4">
          <CardTitle className="text-base font-bold text-slate-900">
            Account Information
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
            <ProfilePhoto />
          </div>

          <dl className="grid grid-cols-2 gap-x-4 gap-y-5 text-sm">
            {facts.map(([label, value]) => (
              <div key={label} className="flex flex-col space-y-1">
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {label}
                </dt>
                <dd className="font-semibold text-slate-800">{value}</dd>
              </div>
            ))}
            <div className="flex flex-col space-y-1">
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Status
              </dt>
              <dd className="pt-0.5">
                <StatusBadge status={profile.status} />
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      {/* Contact Details Card */}
      <Card className="rounded-xl border border-slate-200/80 shadow-sm backdrop-blur-sm overflow-hidden">
        <CardHeader className="bg-slate-50/80 border-b border-slate-200/80 py-4">
          <CardTitle className="text-base font-bold text-slate-900">
            Contact Details
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          <EditForm profile={profile} />
        </CardContent>
      </Card>
    </div>
  );
}
