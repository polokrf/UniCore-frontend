// Created by `npm run seed` in the backend (prisma/seed.ts).
export const DEMO_ACCOUNTS = [
  { label: 'Demo Admin', role: 'Admin', email: 'admin@unicore.demo', password: 'demo123' },
  { label: 'Demo Faculty', role: 'Faculty', email: 'teacher@unicore.demo', password: 'demo123' },
  { label: 'Demo Student', role: 'Student', email: 'student@unicore.demo', password: 'demo123' },
] as const;
