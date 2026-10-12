import { ReactNode } from 'react';

// "Label ........ value" line used inside review sheets
export default function DetailRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="text-muted-foreground shrink-0">{label}</span>
      <span className="text-right font-medium break-words">{children ?? '—'}</span>
    </div>
  );
}
