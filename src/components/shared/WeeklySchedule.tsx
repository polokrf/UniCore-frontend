import { DAYS, dayLabel, toMinutes } from '@/lib/format';
import { TRoutine } from '@/type/domain.type';
import EmptyState from './EmptyState';

// Groups class routines by day (Saturday-first week, like the backend enum).
export default function WeeklySchedule({
  routines,
  showTeacher = false,
}: {
  routines: TRoutine[];
  showTeacher?: boolean;
}) {
  if (routines.length === 0) {
    return (
      <EmptyState
        title="No classes scheduled"
        description="Class times will appear here once the admin publishes the routine."
      />
    );
  }

  const byDay = DAYS.map(day => ({
    day,
    items: routines
      .filter(r => r.day === day)
      .sort((a, b) => toMinutes(a.startTime) - toMinutes(b.startTime)),
  })).filter(group => group.items.length > 0);

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {byDay.map(({ day, items }) => (
        <div key={day} className="rounded-lg border p-3">
          <p className="mb-2 text-sm font-semibold">{dayLabel(day)}</p>
          <ul className="space-y-2">
            {items.map(r => (
              <li key={r.id} className="bg-muted/50 rounded-md p-2 text-xs">
                <p className="font-medium">
                  {r.courseOffering.course.code} · {r.courseOffering.course.title}
                </p>
                <p className="text-muted-foreground">
                  {r.startTime}–{r.endTime} · {r.room} · Sec{' '}
                  {r.courseOffering.section}
                </p>
                {showTeacher && r.courseOffering.teacher ? (
                  <p className="text-muted-foreground">
                    {r.courseOffering.teacher.user.firstName}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
