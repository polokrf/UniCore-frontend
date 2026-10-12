import { TGrade } from '@/type/api.type';

export const formatBdt = (value: string | number | null | undefined) =>
  `BDT ${Number(value ?? 0).toLocaleString('en-US', { maximumFractionDigits: 2 })}`;

export const formatDate = (value: string | null | undefined) =>
  value
    ? new Date(value).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : '—';

const GRADES: Record<TGrade, string> = {
  A_PLUS: 'A+',
  A: 'A',
  A_MINUS: 'A-',
  B_PLUS: 'B+',
  B: 'B',
  B_MINUS: 'B-',
  C_PLUS: 'C+',
  C: 'C',
  D: 'D',
  F: 'F',
};
// default grade point for each grade (4.0 scale); the admin can still override it
export const GRADE_POINTS: Record<TGrade, number> = {
  A_PLUS: 4,
  A: 4,
  A_MINUS: 3.7,
  B_PLUS: 3.3,
  B: 3,
  B_MINUS: 2.7,
  C_PLUS: 2.3,
  C: 2,
  D: 1,
  F: 0,
};

export const gradeLabel = (grade: TGrade) => GRADES[grade] ?? grade;

// Saturday-first week, same order as the backend DayOfWeek enum.
export const DAYS = [
  'SATURDAY',
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
] as const;

export const dayLabel = (day: string) => day.charAt(0) + day.slice(1).toLowerCase();

// "09:30" -> 570 (minutes since midnight), for sorting class times.
export const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

// The backend error handler sends { message }, ofetch exposes it as err.data.
export const errorMessage = (err: unknown, fallback = 'Something went wrong') => {
  const e = err as { data?: { message?: string }; message?: string };
  return e?.data?.message || e?.message || fallback;
};
