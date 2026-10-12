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
import { useMyStudentProfile, useUpdateStudentProfile } from '@/hooks/student.hook';
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
    defaultValues: { phone: profile.phone ?? '', address: profile.address ?? '' },
    validators: { onSubmit: schema },
    onSubmit: ({ value }) => mutate(value),
  });

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-3"
    >
      <FieldGroup>
        {(['phone', 'address'] as const).map(name => (
          <form.Field key={name} name={name}>
            {field => {
              const invalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={invalid}>
                  <Label htmlFor={name}>{name === 'phone' ? 'Phone' : 'Address'}</Label>
                  <Input
                    id={name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    autoComplete="off"
                  />
                  {invalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        ))}
      </FieldGroup>
      <Button type="submit" disabled={isPending}>
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
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ProfilePhoto />
          <dl className="grid grid-cols-2 gap-3 text-sm">
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt className="text-muted-foreground text-xs">{label}</dt>
                <dd className="font-medium">{value}</dd>
              </div>
            ))}
            <div>
              <dt className="text-muted-foreground text-xs">Status</dt>
              <dd>
                <StatusBadge status={profile.status} />
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Contact details</CardTitle>
        </CardHeader>
        <CardContent>
          <EditForm profile={profile} />
        </CardContent>
      </Card>
    </div>
  );
}
