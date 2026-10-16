'use client';

import { SkeletonText } from '@/components/layout/loading/SkeletonText';
import EmptyState from '@/components/shared/EmptyState';
import PageHeader from '@/components/shared/PageHeader';
import StatCard from '@/components/shared/StatCard';
import WeeklySchedule from '@/components/shared/WeeklySchedule';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useClassRoutines } from '@/hooks/catalog.hook';
import { useMyEnrollments, useMyResults } from '@/hooks/student.hook';
import { useGetMe } from '@/hooks/auth.hook';
import { useUrlParams } from '@/hooks/use-url-params';
import AvailableCourses from './AvailableCourses';
import MyCourses from './student.course/MyCoursesTable';
import ResultsTable from './student.result/ResultsTable';
import { IClassRoutine } from '@/type/addminAccess/get.class.routine.type';

const TABS = ['courses', 'available', 'schedule', 'results'] as const;

export default function StudentOverview() {
  const { data: me } = useGetMe();
  const { data: enrollments, isPending, isError } = useMyEnrollments();
  const { data: results } = useMyResults();
  const { data: routines=[] } = useClassRoutines();
  const { get, set } = useUrlParams();

  // console.log(routines)

  const requested = get('tab', 'courses');
  const tab = (TABS as readonly string[]).includes(requested)
    ? requested
    : 'courses';

  if (isPending) return <SkeletonText />;
  if (isError || !enrollments) {
    return (
      <EmptyState
        title="Could not load your dashboard"
        description="Check that you are signed in and the server is running."
      />
    );
  }

  const confirmed = enrollments.filter(e => e.status === 'CONFIRMED');
  const unpaid = enrollments.filter(e => e.status === 'PENDING');
  const credits = confirmed.reduce(
    (sum, e) => sum + e.courseOffering.course.credit,
    0,
  );
  // // my schedule = routines of the courses I am confirmed in (the API returns every routine)
  // const confirmedOfferingIds = new Set(confirmed.map(e => e.courseOfferingId));
  // const myRoutines = (routines ?? []).filter(r =>
  //   confirmedOfferingIds.has(r.courseOfferingId),
  // );
  
  // console.log(myRoutines,confirmedOfferingIds)
  // console.log(confirmed)
  // credit-weighted GPA over published results
  const creditOf = new Map(
    enrollments.map(e => [e.id, e.courseOffering.course.credit]),
  );
  let weighted = 0;
  let creditSum = 0;
  (results ?? []).forEach(r => {
    const c = creditOf.get(r.enrollmentId) ?? 1;
    weighted += r.gradePoint * c;
    creditSum += c;
  });
  const gpa = creditSum ? (weighted / creditSum).toFixed(2) : '—';

  return (
    <div>
      <PageHeader
        title={`Welcome back${me?.data.firstName ? `, ${me.data.firstName}` : ''}`}
        description="Your courses, schedule and results in one place."
      />

      <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Confirmed courses"
          value={confirmed.length}
          hint={`${credits} credits`}
        />
        <StatCard
          label="Awaiting payment"
          value={unpaid.length}
          hint="Pay to confirm your seat"
        />
        <StatCard
          label="CGPA"
          value={gpa}
          hint={`${results?.length ?? 0} published results`}
        />
        <StatCard label="Classes per week" value={routines.length} />
      </div>

      <Tabs
        value={tab}
        onValueChange={v => set({ tab: v === 'courses' ? '' : String(v) })}
      >
        <TabsList>
          <TabsTrigger value="courses">My courses</TabsTrigger>
          <TabsTrigger value="available">Available courses</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>
        <TabsContent value="courses" className="pt-3">
          <MyCourses enrollments={enrollments} />
        </TabsContent>
        <TabsContent value="available" className="pt-3">
          <AvailableCourses enrollments={enrollments} />
        </TabsContent>
        <TabsContent value="schedule" className="pt-3">
          <WeeklySchedule routines={routines as IClassRoutine[]}  />
        </TabsContent>
        <TabsContent value="results" className="pt-3">
          <ResultsTable results={results ?? []} enrollments={enrollments} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
