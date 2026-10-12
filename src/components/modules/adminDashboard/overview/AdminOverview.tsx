'use client';

import { SkeletonText } from '@/components/layout/loading/SkeletonText';
import EmptyState from '@/components/shared/EmptyState';
import PageHeader from '@/components/shared/PageHeader';
import StatCard from '@/components/shared/StatCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminStats } from '@/hooks/admin-hook/admin.analytics.hook';
import { formatBdt } from '@/lib/format';
import Link from 'next/link';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#f43f5e', '#0ea5e9', '#a855f7'];

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">{children}</div>
      </CardContent>
    </Card>
  );
}

export default function AdminOverview() {
  const { data, isPending, isError } = useAdminStats();

  if (isPending) return <SkeletonText />;
  if (isError || !data) {
    return (
      <EmptyState
        title="Could not load analytics"
        description="Check that the API is running and that you are signed in as an admin."
      />
    );
  }

  const roles = [
    { name: 'Students', value: data.users.students },
    { name: 'Faculty', value: data.users.faculty },
    { name: 'Admins', value: data.users.admins },
    { name: 'Applicants', value: data.users.applicants },
  ].filter(r => r.value > 0);

  const statuses = [
    { status: 'Confirmed', count: data.enrollments.confirmed },
    { status: 'Pending', count: data.enrollments.pending },
    { status: 'Cancelled', count: data.enrollments.cancelled },
  ];

  const pendingTotal = data.pending.teachers + data.pending.students;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin overview"
        description="Live numbers from the university system."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Students" value={data.users.students} />
        <StatCard label="Faculty" value={data.users.faculty} />
        <StatCard
          label="Revenue (paid)"
          value={formatBdt(data.revenue)}
          hint={
            data.revenueTruncated
              ? 'Based on the first 500 paid enrollments'
              : 'Confirmed enrollments'
          }
        />
        <StatCard label="Published results" value={data.results} />
      </div>

      {pendingTotal > 0 ? (
        <Card>
          <CardContent className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm">
              <span className="font-semibold">{pendingTotal}</span> application
              {pendingTotal === 1 ? '' : 's'} waiting for review (
              {data.pending.teachers} faculty, {data.pending.students}{' '}
              students).
            </p>
            <div className="flex gap-2">
              <Button
                nativeButton={false}
                size="sm"
                render={<Link href="/admin/approved-teacher?status=PENDING" />}
              >
                Review faculty
              </Button>
              <Button
                nativeButton={false}
                size="sm"
                variant="outline"
                render={<Link href="/admin/approved-student?status=PENDING" />}
              >
                Review students
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Accounts by role">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={roles}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={85}
                paddingAngle={2}
              >
                {roles.map((r, i) => (
                  <Cell key={r.name} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Enrollments by status">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={statuses}
              margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="status" tickLine={false} axisLine={false} />
              <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="count" name="Enrollments" radius={[4, 4, 0, 0]}>
                {statuses.map((s, i) => (
                  <Cell key={s.status} fill={COLORS[i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Revenue by course (top 6)">
        {data.revenueByCourse.length === 0 ? (
          <EmptyState
            title="No payments yet"
            description="Revenue shows up once students pay their fees."
          />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data.revenueByCourse}
              margin={{ top: 8, right: 8, left: 8, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="course" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip formatter={value => formatBdt(Number(value))} />
              <Bar
                dataKey="revenue"
                name="Revenue"
                fill="#6366f1"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </ChartCard>
    </div>
  );
}
