'use client';

import {
  getEnrollments,
  getResults,
  getStudents,
  getTeachers,
  getUsers,
} from '@/api/admin-api/admin.access.api';
import { IEnrollment } from '@/type/addminAccess/enrollments.type';
import { useQuery } from '@tanstack/react-query';

type TWithMeta = { data: { meta: { total: number | null } } };
const total = (res: TWithMeta) => res.data.meta.total ?? 0;

// Never fetch every row just to count them: ask for one row and read meta.total.
const REVENUE_ROWS = 500;

export type TAdminStats = {
  users: { students: number; faculty: number; admins: number; applicants: number };
  pending: { teachers: number; students: number };
  enrollments: { confirmed: number; pending: number; cancelled: number };
  results: number;
  revenue: number;
  revenueTruncated: boolean;
  revenueByCourse: { course: string; revenue: number }[];
  recent: IEnrollment[];
};

export const useAdminStats = () =>
  useQuery<TAdminStats>({
    queryKey: ['admin-stats'],
    staleTime: 30_000,
    queryFn: async () => {
      const one = { limit: 1 } as const;
      const [
        students,
        faculty,
        admins,
        applicants,
        pendingTeachers,
        pendingStudents,
        confirmed,
        pending,
        cancelled,
        results,
        paidRows,
        recent,
      ] = await Promise.all([
        getUsers({ role: 'STUDENT', ...one }),
        getUsers({ role: 'TEACHER', ...one }),
        getUsers({ role: 'ADMIN', ...one }),
        getUsers({ role: 'USER', ...one }),
        getTeachers({ status: 'PENDING', ...one }),
        getStudents({ status: 'PENDING', ...one }),
        getEnrollments({ status: 'CONFIRMED', ...one }),
        getEnrollments({ status: 'PENDING', ...one }),
        getEnrollments({ status: 'CANCELLED', ...one }),
        getResults(one),
        getEnrollments({ status: 'CONFIRMED', limit: REVENUE_ROWS }),
        getEnrollments({ limit: 8, sortBy: 'createdAt', sortOrder: 'desc' }),
      ]);

      // A confirmed enrollment is one whose bKash payment succeeded.
      const byCourse = new Map<string, number>();
      let revenue = 0;
      paidRows.data.data.forEach(e => {
        const fee = Number(e.courseOffering.fee ?? 0);
        revenue += fee;
        const code = e.courseOffering.course.code;
        byCourse.set(code, (byCourse.get(code) ?? 0) + fee);
      });

      return {
        users: {
          students: total(students),
          faculty: total(faculty),
          admins: total(admins),
          applicants: total(applicants),
        },
        pending: { teachers: total(pendingTeachers), students: total(pendingStudents) },
        enrollments: {
          confirmed: total(confirmed),
          pending: total(pending),
          cancelled: total(cancelled),
        },
        results: total(results),
        revenue,
        revenueTruncated: total(confirmed) > REVENUE_ROWS,
        revenueByCourse: [...byCourse.entries()]
          .map(([course, value]) => ({ course, revenue: value }))
          .sort((a, b) => b.revenue - a.revenue)
          .slice(0, 6),
        recent: recent.data.data,
      };
    },
  });
