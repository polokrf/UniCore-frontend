'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetMe } from '@/hooks/auth.hook';
import { dashboardPathFor } from '@/routes/dashboard';
import StatusBadge from '@/components/shared/StatusBadge';

const copy = {
  PENDING: 'Your application is waiting for an admin to review it. You will get access as soon as it is approved.',
  APPROVED: 'Your application was approved. Your dashboard is ready.',
  REJECTED: 'Your application was not approved. You can fix your details and apply again.',
} as const;

export default function ApplicationStatus() {
  const { data, isPending } = useGetMe();
  const me = data?.data;

  if (isPending || !me) {
    return <div className="bg-muted h-40 animate-pulse rounded-lg" />;
  }

  const kind = me.studentProfile ? 'Student' : me.teacherProfile ? 'Faculty' : null;
  const app = me.studentProfile ?? me.teacherProfile;

  // no application yet
  if (!app) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No application yet</CardTitle>
          <CardDescription>
            Pick a department to apply as a student or as faculty.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {me.role === 'USER' ? (
            <Button nativeButton={false} render={<Link href="/chose-department" />}>
              Choose a department
            </Button>
          ) : (
            <Button nativeButton={false} render={<Link href={dashboardPathFor(me.role)} />}>
              Go to my dashboard
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  const reason = me.teacherProfile?.rejectionReason;
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle>{kind} application</CardTitle>
          <StatusBadge status={app.status} />
        </div>
        <CardDescription>
          {app.department.name} ({app.department.code}) · applied{' '}
          {new Date(app.createdAt).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm">{copy[app.status]}</p>
        {app.status === 'REJECTED' && reason ? (
          <p className="text-muted-foreground text-sm">Reason: {reason}</p>
        ) : null}
        {app.status === 'APPROVED' && me.role !== 'USER' ? (
          <Button nativeButton={false} render={<Link href={dashboardPathFor(me.role)} />}>
            Open my dashboard
          </Button>
        ) : null}
        {app.status === 'REJECTED' ? (
          <Button nativeButton={false} render={<Link href="/chose-department" />}>
            Apply again
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
}
