'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useGetMe } from '@/hooks/auth.hook';
import { dashboardPathFor } from '@/routes/dashboard';
import StatusBadge from '@/components/shared/StatusBadge';
import { AlertCircle, Calendar } from 'lucide-react'; 

const copy = {
  PENDING:
    'Your application is waiting for an admin to review it. You will get access as soon as it is approved.',
  APPROVED: 'Your application was approved. Your dashboard is ready.',
  REJECTED:
    'Your application was not approved. You can fix your details and apply again.',
} as const;

export default function ApplicationStatus() {
  const { data, isPending } = useGetMe();
  const me = data?.data;

  // Loading Skeleton Improvement
  if (isPending || !me) {
    return (
      <div className="bg-card border-border/50 h-52 w-full animate-pulse rounded-xl border p-6 shadow-sm" />
    );
  }

  const kind = me.studentProfile
    ? 'Student'
    : me.teacherProfile
      ? 'Faculty'
      : null;
  const app = me.studentProfile ?? me.teacherProfile;

  // No application state
  if (!app) {
    return (
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="space-y-1.5 pb-4">
          <CardTitle className="text-xl">No application yet</CardTitle>
          <CardDescription className="text-sm leading-relaxed">
            Pick a department to apply as a student or as faculty.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {me.role === 'USER' ? (
            <Button
              nativeButton={false}
              render={<Link href="/chose-department" />}
              className="w-full sm:w-auto"
            >
              Choose a department
            </Button>
          ) : (
            <Button
              nativeButton={false}
              render={<Link href={dashboardPathFor(me.role)} />}
              className="w-full sm:w-auto"
            >
              Go to my dashboard
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  const reason = me.teacherProfile?.rejectionReason;

  return (
    <Card className="border-border/60 overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md">
      <CardHeader className="bg-muted/30 border-b pb-4">
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="text-xl font-semibold tracking-tight">
            {kind} Application
          </CardTitle>
          <StatusBadge status={app.status} />
        </div>

        <CardDescription className="text-muted-foreground flex items-center gap-1.5 pt-1 text-xs sm:text-sm">
          <span>
            {app.department.name} ({app.department.code})
          </span>
          <span>•</span>
          <span>Applied {new Date(app.createdAt).toLocaleDateString()}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 pt-5">
        <p className="text-foreground/90 text-sm leading-relaxed font-normal">
          {copy[app.status]}
        </p>

        {/* Rejection Alert Box */}
        {app.status === 'REJECTED' && reason ? (
          <div className="bg-destructive/10 border-destructive/20 text-destructive flex items-start gap-2.5 rounded-lg border p-3 text-xs sm:text-sm">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <div>
              <span className="font-semibold">Reason:</span> {reason}
            </div>
          </div>
        ) : null}

        {/* Action Buttons */}
        <div className="pt-2">
          {app.status === 'APPROVED' && me.role !== 'USER' ? (
            <Button
              nativeButton={false}
              render={<Link href={dashboardPathFor(me.role)} />}
              className="w-full sm:w-auto"
            >
              Open my dashboard
            </Button>
          ) : null}

          {app.status === 'REJECTED' ? (
            <Button
              nativeButton={false}
              render={<Link href="/chose-department" />}
              variant="default"
              className="w-full sm:w-auto"
            >
              Apply again
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
