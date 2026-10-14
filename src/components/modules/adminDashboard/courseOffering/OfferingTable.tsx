'use client';

import EmptyState from '@/components/shared/EmptyState';
import UrlPagination from '@/components/shared/UrlPagination';
import UrlSearch from '@/components/shared/UrlSearch';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAllTeachers, useGetCourseOffering } from '@/hooks/admin-hook/courseOffering.hook';
import { useGetSemester, useSimpleGetSemester } from '@/hooks/admin-hook/semester.hook';
import { useUrlParams } from '@/hooks/use-url-params';
import { errorMessage, formatBdt } from '@/lib/format';
import Link from 'next/link';
import { useState } from 'react';
import AssignTeacherSheet from './AssignTeacherSheet';

const PAGE_SIZE = 10;
const VIEWS = [
  { value: '', label: 'All' },
  { value: 'assigned', label: 'Assigned' },
  { value: 'unassigned', label: 'Unassigned' },
];

// The API returns every active offering at once, so view / search / page are
// applied here. All of them live in the URL:
//   /admin/all-courseOffering?view=unassigned&search=data&page=2
export default function OfferingTable() {
  const { get, getNumber, set } = useUrlParams();
  const view = ['assigned', 'unassigned'].includes(get('view')) ? get('view') : '';
  const search = get('search').trim().toLowerCase();
  const page = getNumber('page', 1);

  const offeringsQuery = useGetCourseOffering();
  const {data :semestersQuery } = useSimpleGetSemester();

   
  const teachersQuery = useAllTeachers();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // The API has no fixed order, rows would jump around after every update.
  // Keep a stable one: course code, then section, then semester.
  const offerings = [...(offeringsQuery.data?.data ?? [])].sort(
    (a, b) =>
      a.course.code.localeCompare(b.course.code) ||
      a.section.localeCompare(b.section) ||
      a.semesterId.localeCompare(b.semesterId),
  );
  const semesterLabel = (id: string) => {
    const s = semestersQuery?.data?.data.find(x => x.id === id);
    return s ? `${s.name} ${s.year}` : '—';
  };
  const teacherOf = (id: string | null) =>
    id ? teachersQuery.data?.find(t => t.id === id) : undefined;

  const unassigned = offerings.filter(o => !o.teacherId).length;

  const rows = offerings
    .filter(o => (view === 'assigned' ? !!o.teacherId : view === 'unassigned' ? !o.teacherId : true))
    .filter(o => {
      if (!search) return true;
      const haystack = [
        o.course.code,
        o.course.title,
        o.section,
        teacherOf(o.teacherId)?.user.firstName ?? '',
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(search);
    });

  const totalPage = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const current = Math.min(page, totalPage);
  const visible = rows.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const selected = offerings.find(o => o.id === selectedId) ?? null;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex gap-1">
            {VIEWS.map(v => (
              <Button
                key={v.value || 'all'}
                size="sm"
                variant={view === v.value ? 'default' : 'outline'}
                onClick={() => set({ view: v.value })}
              >
                {v.label}
              </Button>
            ))}
          </div>
          <UrlSearch placeholder="Search course, section or teacher" className="w-64" />
        </div>
        <Button size="sm" nativeButton={false} render={<Link href="/admin/create-course-offering" />}>
          Create offering
        </Button>
      </div>

      {offeringsQuery.isSuccess ? (
        <p className="text-muted-foreground text-sm">
          {offerings.length} offerings · {unassigned} without a teacher
        </p>
      ) : null}

      {offeringsQuery.isError ? (
        <EmptyState
          title="Could not load the offerings"
          description={errorMessage(offeringsQuery.error, 'Please try again.')}
        />
      ) : offeringsQuery.isPending ? (
        <div className="space-y-2">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </div>
      ) : rows.length === 0 ? (
        <EmptyState
          title={search || view ? 'No offerings match' : 'No course offerings yet'}
          description={
            search || view
              ? 'Try a different search or filter.'
              : 'Create the first offering to start assigning teachers.'
          }
        />
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visible.map(o => {
                  const teacher = teacherOf(o.teacherId);
                  return (
                    <TableRow key={o.id}>
                      <TableCell>
                        <div className="font-medium">{o.course.code}</div>
                        <div className="text-muted-foreground text-xs">{o.course.title}</div>
                      </TableCell>
                      <TableCell>{semesterLabel(o.semesterId)}</TableCell>
                      <TableCell>{o.section}</TableCell>
                      <TableCell>{o.capacity}</TableCell>
                      <TableCell>{formatBdt(o.fee)}</TableCell>
                      <TableCell>
                        {o.teacherId ? (
                          <>
                            <div className="font-medium">{teacher?.user.firstName ?? 'Assigned'}</div>
                            {teacher ? (
                              <div className="text-muted-foreground text-xs">
                                {teacher.designation} · {teacher.department.code}
                              </div>
                            ) : null}
                          </>
                        ) : (
                          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
                            Not assigned
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant={o.teacherId ? 'outline' : 'default'}
                          onClick={() => setSelectedId(o.id)}
                        >
                          {o.teacherId ? 'Change teacher' : 'Assign teacher'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <UrlPagination page={current} totalPage={totalPage} />
        </>
      )}

      <AssignTeacherSheet
        key={selected?.id ?? 'closed'}
        offering={selected}
        semesterLabel={selected ? semesterLabel(selected.semesterId) : ''}
        teacherName={selected ? (teacherOf(selected.teacherId)?.user.firstName ?? null) : null}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
}
