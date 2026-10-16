'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAllTeachers } from '@/hooks/admin-hook/courseOffering.hook';
import { isEligibleTeacher, teacherLabel } from './teacherEligibility';

const NONE = '__none__';

// Picker of the teachers who can teach a course of `departmentId`: approved,
// active, account not blocked, same department. `value` is '' for "no teacher".
export default function TeacherSelect({
  id,
  departmentId,
  value,
  onChange,
  currentTeacherId,
  allowNone = false,
}: {
  id?: string;
  departmentId?: string;
  value: string;
  onChange: (teacherId: string) => void;
  currentTeacherId?: string | null;
  allowNone?: boolean;
}) {
  const { data: teachers = [], isPending, isError } = useAllTeachers();
  const eligible = teachers.filter(t => isEligibleTeacher(t, departmentId));

  const items = [
    ...(allowNone ? [{ value: NONE, label: 'No teacher (assign later)', disabled: false }] : []),
    ...eligible.map(t => ({
      value: t.id,
      label: teacherLabel(t) + (t.id === currentTeacherId ? ' (current)' : ''),
      disabled: t.id === currentTeacherId,
    })),
  ];

  const placeholder = !departmentId
    ? 'Choose a course first'
    : isPending
      ? 'Loading teachers...'
      : 'Select a teacher';

      // console.log(items)

  return (
    <div className="grid gap-1">
      <Select
        items={items}
        // no course yet -> show the placeholder ("Choose a course first"), not "No teacher"
        value={!departmentId ? null : value === '' ? (allowNone ? NONE : null) : value}
        onValueChange={v => onChange(!v || v === NONE ? '' : v)}
        disabled={!departmentId || isPending}
      >
        <SelectTrigger id={id} className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map(item => (
              <SelectItem key={item.value} value={item.value} disabled={item.disabled}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {departmentId && !isPending && !isError && eligible.length === 0 ? (
        <p className="text-muted-foreground text-xs">
          No approved, active teacher in this department yet.
        </p>
      ) : null}
      {isError ? <p className="text-destructive text-xs">Could not load the teachers.</p> : null}
    </div>
  );
}
