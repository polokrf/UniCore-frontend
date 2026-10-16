
import { DAYS, dayLabel } from '@/lib/format';
import { IClassRoutine } from '@/type/addminAccess/get.class.routine.type';
import EmptyState from './EmptyState';

export default function WeeklySchedule({
  routines,
}: {
  routines: IClassRoutine[];
}) {
  if (routines.length === 0) {
    return (
      <EmptyState
        title="No classes scheduled"
        description="Class times will appear here once the admin publishes the routine."
      />
    );
  }

  const groupedRoutines = DAYS.map(day => ({
    day,
    routines: routines.filter(routine => routine.day === day),
  })).filter(group => group.routines.length > 0);

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {groupedRoutines.map(({ day, routines: dayRoutines }) => (
        <div
          key={day}
          className="rounded-xl border bg-card p-4 shadow-sm"
        >
          <h3 className="mb-4 border-b pb-3 text-lg font-semibold">
            {dayLabel(day)}
          </h3>

          <div className="space-y-3">
            {dayRoutines.map(routine => (
              <div
                key={routine.id}
                className="rounded-lg border bg-muted/30 p-3"
              >
                <p className="text-sm font-medium text-muted-foreground">
                  Time
                </p>

                <p className="mt-1 font-semibold">
                  {routine.startTime} – {routine.endTime}
                </p>

                <div className="mt-3">
                  <p className="text-sm font-medium text-muted-foreground">
                    Room
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {routine.room}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

