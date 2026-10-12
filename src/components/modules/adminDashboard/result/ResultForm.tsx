'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { GRADE_POINTS, gradeLabel } from '@/lib/format';
import { TGrade } from '@/type/api.type';
import { FormEvent, useState } from 'react';

export type ResultValues = { marks: number; grade: TGrade; gradePoint: number };
const GRADE_ORDER = Object.keys(GRADE_POINTS) as TGrade[];

// Used to publish a new result and to correct an existing one.
// Picking a grade fills the usual grade point, which can still be edited.
export default function ResultForm({
  initial,
  submitLabel,
  pending,
  onSubmit,
}: {
  initial?: ResultValues;
  submitLabel: string;
  pending: boolean;
  onSubmit: (values: ResultValues) => void;
}) {
  const [marks, setMarks] = useState(initial ? String(initial.marks) : '');
  const [grade, setGrade] = useState<TGrade>(initial?.grade ?? 'A');
  const [point, setPoint] = useState(String(initial?.gradePoint ?? GRADE_POINTS.A));
  const [error, setError] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const m = Number(marks);
    const p = Number(point);
    if (marks.trim() === '' || !Number.isInteger(m) || m < 0 || m > 100) {
      return setError('Marks must be a whole number from 0 to 100');
    }
    if (point.trim() === '' || Number.isNaN(p) || p < 0 || p > 4) {
      return setError('Grade point must be between 0 and 4');
    }
    setError('');
    onSubmit({ marks: m, grade, gradePoint: p });
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        <div className="grid gap-1">
          <Label htmlFor="result-marks">Marks</Label>
          <Input
            id="result-marks"
            type="number"
            min={0}
            max={100}
            value={marks}
            onChange={e => setMarks(e.target.value)}
            placeholder="0-100"
          />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="result-grade">Grade</Label>
          <select
            id="result-grade"
            value={grade}
            onChange={e => {
              const g = e.target.value as TGrade;
              setGrade(g);
              setPoint(String(GRADE_POINTS[g]));
            }}
            className="border-input bg-background h-8 rounded-lg border px-2 text-sm"
          >
            {GRADE_ORDER.map(g => (
              <option key={g} value={g}>
                {gradeLabel(g)}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-1">
          <Label htmlFor="result-point">Point</Label>
          <Input
            id="result-point"
            type="number"
            step="0.01"
            min={0}
            max={4}
            value={point}
            onChange={e => setPoint(e.target.value)}
          />
        </div>
      </div>
      {error ? <p className="text-destructive text-sm">{error}</p> : null}
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? <Spinner /> : submitLabel}
      </Button>
    </form>
  );
}
