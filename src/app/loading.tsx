
import { BookOpen, GraduationCap } from 'lucide-react';

export default function Loading() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Logo */}
        <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 shadow-sm ring-1 ring-primary/20">
          <BookOpen
            size={38}
            strokeWidth={1.7}
            className="animate-pulse text-primary"
          />

          <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
            <GraduationCap size={18} />
          </div>
        </div>

        {/* Brand */}
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Uni<span className="text-primary">Core</span>
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          University Management System
        </p>

        {/* Spinner */}
        <div className="mt-9 flex items-center gap-3">
          <div className="size-5 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />

          <span className="text-sm font-medium text-muted-foreground">
            Preparing your experience...
          </span>
        </div>

        {/* Animated Progress Bar */}
        <div className="mt-5 h-1 w-48 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-primary" />
        </div>

        <p className="mt-6 text-xs text-muted-foreground/70">
          Making education management simpler.
        </p>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 text-center text-xs text-muted-foreground/60">
        © {new Date().getFullYear()} UniCore. All rights reserved.
      </div>
    </div>
  );
}

