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
import { Textarea } from '@/components/ui/textarea';
import {
  useMyTeacherProfile,
  useUpdateTeacherProfile,
} from '@/hooks/teacher.hook';
import { formatDate } from '@/lib/format';
import { TTeacherProfile } from '@/type/domain.type';
import { useForm } from '@tanstack/react-form';
import z from 'zod';

const schema = z.object({
  phone: z.string().trim().min(6, 'Enter a valid phone number'),
  qualification: z.string().trim().min(2, 'Enter your qualification'),
  specialization: z.string().trim().min(2, 'Enter your specialization'),
  bio: z.string().trim().max(500, 'Keep the bio under 500 characters'),
});

const FIELDS = [
  ['phone', 'Phone'],
  ['qualification', 'Qualification'],
  ['specialization', 'Specialization'],
] as const;

function EditForm({ profile }: { profile: TTeacherProfile }) {
  const { mutate, isPending } = useUpdateTeacherProfile();
  const form = useForm({
    defaultValues: {
      phone: profile.phone ?? '',
      qualification: profile.qualification ?? '',
      specialization: profile.specialization ?? '',
      bio: profile.bio ?? '',
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
      className="space-y-3"
    >
      <FieldGroup>
        {FIELDS.map(([name, label]) => (
          <form.Field key={name} name={name}>
            {field => {
              const invalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={invalid}>
                  <Label htmlFor={name}>{label}</Label>
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
        <form.Field name="bio">
          {field => {
            const invalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={invalid}>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  rows={4}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={e => field.handleChange(e.target.value)}
                />
                {invalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
      </FieldGroup>
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Saving…' : 'Save changes'}
      </Button>
    </form>
  );
}

export default function FacultyProfile() {
  const { data: profile, isPending, isError } = useMyTeacherProfile();

  if (isPending) return <SkeletonText />;
  if (isError || !profile) {
    return (
      <EmptyState
        title="Profile not available"
        description="Your faculty profile is only visible once an admin has approved it."
      />
    );
  }

  const facts: [string, string][] = [
    ['Employee ID', profile.employeeId ?? '—'],
    ['Designation', profile.designation],
    ['Joined', formatDate(profile.joiningDate)],
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
          <CardTitle>Professional details</CardTitle>
        </CardHeader>
        <CardContent>
          <EditForm profile={profile} />
        </CardContent>
      </Card>
    </div>
  );
}
