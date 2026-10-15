'use client';

import { SkeletonText } from '@/components/layout/loading/SkeletonText';
import EmptyState from '@/components/shared/EmptyState';
import PageHeader from '@/components/shared/PageHeader';
import StatCard from '@/components/shared/StatCard';
import WeeklySchedule from '@/components/shared/WeeklySchedule';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetMe } from '@/hooks/auth.hook';
import { useClassRoutines } from '@/hooks/catalog.hook';
import { useMyOfferings } from '@/hooks/teacher.hook';
import { useUrlParams } from '@/hooks/use-url-params';
import { formatBdt } from '@/lib/format';
import ClassRoster from '@/components/modules/teacher/ClassRoster';
import { Button } from '@/components/ui/button';

const TABS = ['courses', 'roster', 'schedule'] as const;

export default function FacultyOverview() {
  const { data: me } = useGetMe();
  const { mine, profile, isPending, isError } = useMyOfferings();
  const { data: routines } = useClassRoutines();
  const { get, set } = useUrlParams();

  const requested = get('tab', 'courses');
  const tab = (TABS as readonly string[]).includes(requested)
    ? requested
    : 'courses';

  if (isPending) return <SkeletonText />;
  if (isError || !profile) {
    return (
      <EmptyState
        title="Could not load your dashboard"
        description="Your faculty profile was not found. Check that an admin has approved it."
      />
    );
  }

  const credits = mine.reduce((sum, o) => sum + (o.course?.credit ?? 0), 0);
  const seats = mine.reduce((sum, o) => sum + (o.capacity ?? 0), 0);
  // my schedule = routines of the offerings assigned to me (the API returns every routine)
  const myOfferingIds = new Set(mine.map(o => o.id));
  const myRoutines = (routines ?? []).filter(r =>
    myOfferingIds.has(r.courseOfferingId),
  );
  const classesOf = (offeringId: string) =>
    (routines ?? []).filter(r => r.courseOfferingId === offeringId).length;

  return (
    <div>
      <PageHeader
        title={`Welcome, ${me?.data.firstName ?? 'Faculty'}`}
        description={`${profile.designation} · your assigned courses and weekly schedule.`}
      />

      <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Assigned courses" value={mine.length} />
        <StatCard label="Total credits" value={credits} />
        <StatCard label="Classes per week" value={myRoutines.length} />
        <StatCard
          label="Seat capacity"
          value={seats}
          hint="Across your sections"
        />
      </div>

      <Tabs
        value={tab}
        onValueChange={v =>
          // roster-only params are dropped when leaving the roster tab
          set({
            tab: v === 'courses' ? '' : String(v),
            course: '',
            search: '',
            status: '',
          })
        }
      >
        <TabsList>
          <TabsTrigger value="courses">My courses</TabsTrigger>
          <TabsTrigger value="roster">Class roster</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="pt-3">
          {mine.length === 0 ? (
            <EmptyState
              title="No courses assigned yet"
              description="An admin assigns you to course offerings; they will appear here."
            />
          ) : (
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Section</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Fee</TableHead>
                    <TableHead>Classes / week</TableHead>
                    <TableHead className="text-right">Roster</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mine.map(o => (
                    <TableRow key={o.id}>
                      <TableCell className="font-medium">
                        {o.course?.code} · {o.course?.title}
                      </TableCell>
                      <TableCell>{o.section}</TableCell>
                      <TableCell>{o.course?.credit}</TableCell>
                      <TableCell>{o.capacity ?? '—'}</TableCell>
                      <TableCell>{formatBdt(o.fee)}</TableCell>
                      <TableCell>{classesOf(o.id)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            set({
                              tab: 'roster',
                              course: o.id,
                              search: '',
                              status: '',
                            })
                          }
                        >
                          View roster
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        <TabsContent value="roster" className="pt-3">
          <ClassRoster />
        </TabsContent>
        <TabsContent value="schedule" className="pt-3">
          <WeeklySchedule routines={myRoutines} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
