'use client';

import { SkeletonText } from '@/components/layout/loading/SkeletonText';
import EmptyState from '@/components/shared/EmptyState';
import StatCard from '@/components/shared/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useClassRoutines } from '@/hooks/catalog.hook';
import { useMyOfferings } from '@/hooks/faculty.hook';
import { toMinutes } from '@/lib/format';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// The system stores no salary data, so this page shows teaching load instead:
// credits per course and weekly contact hours computed from the class routine.
export default function FacultyLoad() {
  const { mine, isPending, isError } = useMyOfferings();
  const { data: routines } = useClassRoutines();

  if (isPending) return <SkeletonText />;
  if (isError) {
    return <EmptyState title="Could not load your course load" description="Please refresh the page." />;
  }
  if (mine.length === 0) {
    return (
      <EmptyState
        title="No courses assigned yet"
        description="Your load shows up here once an admin assigns you to a course offering."
      />
    );
  }

  const hoursOf = (offeringId: string) =>
    (routines ?? [])
      .filter(r => r.courseOfferingId === offeringId)
      .reduce((sum, r) => sum + (toMinutes(r.endTime) - toMinutes(r.startTime)), 0) / 60;

  const rows = mine.map(o => ({
    course: o.course?.code ?? 'N/A',
    title: o.course?.title ?? '',
    credits: o.course?.credit ?? 0,
    hours: Number(hoursOf(o.id).toFixed(1)),
  }));
  const credits = rows.reduce((s, r) => s + r.credits, 0);
  const hours = rows.reduce((s, r) => s + r.hours, 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Courses" value={rows.length} />
        <StatCard label="Total credits" value={credits} />
        <StatCard label="Contact hours / week" value={hours.toFixed(1)} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Credits and weekly hours by course</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rows} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="course" tickLine={false} axisLine={false} />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="credits" name="Credits" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="hours" name="Hours / week" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
