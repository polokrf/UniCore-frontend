'use client';

import { getDepartment } from '@/api/public.department.api';
import { SkeletonText } from '@/components/layout/loading/SkeletonText';
import EmptyState from '@/components/shared/EmptyState';
import StatusBadge from '@/components/shared/StatusBadge';
import UrlPagination from '@/components/shared/UrlPagination';
import UrlSearch from '@/components/shared/UrlSearch';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  useDeleteDepartment,
  useDeleteRoutine,
  useToggleDepartment,
} from '@/hooks/admin-hook/manage.hook';
import { useClassRoutines } from '@/hooks/catalog.hook';
import { useUrlParams } from '@/hooks/use-url-params';
import { dayLabel } from '@/lib/format';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

const PAGE_SIZE = 8;
const SECTIONS = ['departments', 'routines', 'shortcuts'] as const;

const SHORTCUTS = [
  ['Create department', '/admin/create-department'],
  ['Courses', '/admin/all-course'],
  ['Create course', '/admin/create-course'],
  ['Semesters', '/admin/all-semester'],
  ['Create semester', '/admin/create-semester'],
  ['Course offerings', '/admin/all-courseOffering'],
  ['Create offering', '/admin/create-course-offering'],
  ['Faculty', '/admin/approved-teacher'],
  ['Students', '/admin/approved-student'],
  ['Create class routine', '/admin/create-class-routine'],
] as const;

function DepartmentManager() {
  const { get, getNumber } = useUrlParams();
  const search = get('search');
  const page = getNumber('page', 1);
  const params = { search: search || undefined, page, limit: PAGE_SIZE };

  const { data, isPending, isError } = useQuery({
    queryKey: ['department', 'manage', params],
    queryFn: () => getDepartment(params),
  });
  const toggle = useToggleDepartment();
  const remove = useDeleteDepartment();

  const rows = data?.data.data ?? [];
  const totalPage = data?.data.meta.totalPage ?? 1;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <UrlSearch
          placeholder="Search departments..."
          className="sm:max-w-xs"
        />
      </div>

      {isPending ? (
        <SkeletonText />
      ) : isError ? (
        <EmptyState title="Could not load departments" />
      ) : rows.length === 0 ? (
        <EmptyState
          title="No departments found"
          description="Try a different search."
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-border/60 shadow-sm transition-all">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold text-foreground/80">
                  Name
                </TableHead>
                <TableHead className="font-semibold text-foreground/80">
                  Code
                </TableHead>
                <TableHead className="font-semibold text-foreground/80">
                  Status
                </TableHead>
                <TableHead className="text-right font-semibold text-foreground/80">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map(d => (
                <TableRow
                  key={d.id}
                  className="transition-colors hover:bg-muted/40"
                >
                  <TableCell className="font-medium text-foreground">
                    {d.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">
                    {d.code}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={d.isActive ? 'ACTIVE' : 'BLOCKED'} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 transition-all hover:border-primary/50"
                        disabled={
                          toggle.isPending && toggle.variables?.id === d.id
                        }
                        onClick={() =>
                          toggle.mutate({ id: d.id, isActive: !d.isActive })
                        }
                      >
                        {d.isActive ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-8 shadow-sm transition-all"
                        disabled={remove.isPending && remove.variables === d.id}
                        onClick={() => {
                          if (
                            window.confirm(
                              `Delete ${d.name}? This cannot be undone.`,
                            )
                          )
                            remove.mutate(d.id);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      <div className="pt-2">
        <UrlPagination page={page} totalPage={totalPage} />
      </div>
    </div>
  );
}

function RoutineManager() {
  const { get, getNumber } = useUrlParams();
  const search = get('search').toLowerCase();
  const { data, isPending, isError } = useClassRoutines();
  const remove = useDeleteRoutine();

  if (isPending) return <SkeletonText />;
  if (isError || !data)
    return <EmptyState title="Could not load the class routine" />;

  const filtered = data.filter(
    r =>
      !search ||
      r.courseOffering.course.code.toLowerCase().includes(search) ||
      r.courseOffering.course.title.toLowerCase().includes(search) ||
      r.day.toLowerCase().includes(search) ||
      r.room.toLowerCase().includes(search),
  );
  const totalPage = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(getNumber('page', 1), totalPage);
  const rows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <UrlSearch
          placeholder="Search course, day or room..."
          className="sm:max-w-xs"
        />
        <Button
          size="sm"
          className="shadow-sm"
          nativeButton={false}
          render={<Link href="/admin/create-class-routine" />}
        >
          + Add Class
        </Button>
      </div>

      {rows.length === 0 ? (
        <EmptyState title="No classes found" />
      ) : (
        <div className="overflow-hidden rounded-xl border border-border/60 shadow-sm transition-all">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold text-foreground/80">
                  Course
                </TableHead>
                <TableHead className="font-semibold text-foreground/80">
                  Day
                </TableHead>
                <TableHead className="font-semibold text-foreground/80">
                  Time
                </TableHead>
                <TableHead className="font-semibold text-foreground/80">
                  Room
                </TableHead>
                <TableHead className="text-right font-semibold text-foreground/80">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map(r => (
                <TableRow
                  key={r.id}
                  className="transition-colors hover:bg-muted/40"
                >
                  <TableCell className="font-medium text-foreground">
                    <span className="font-mono text-xs font-semibold text-primary">
                      {r.courseOffering.course.code}
                    </span>
                    <span className="mx-1.5 text-muted-foreground">•</span>
                    <span>{r.courseOffering.course.title}</span>
                  </TableCell>
                  <TableCell className="font-medium">
                    {dayLabel(r.day)}
                  </TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">
                    {r.startTime}–{r.endTime}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                      {r.room}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="destructive"
                      className="h-8 shadow-sm transition-all"
                      disabled={remove.isPending && remove.variables === r.id}
                      onClick={() => {
                        if (
                          window.confirm('Remove this class from the routine?')
                        )
                          remove.mutate(r.id);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      <div className="pt-2">
        <UrlPagination page={page} totalPage={totalPage} />
      </div>
    </div>
  );
}

export default function ManageHub() {
  const { get, set } = useUrlParams();
  const requested = get('section', 'departments');
  const section = (SECTIONS as readonly string[]).includes(requested)
    ? requested
    : 'departments';

  return (
    <div className="space-y-6">
      <Tabs
        value={section}
        onValueChange={v =>
          set({ section: v === 'departments' ? '' : String(v), search: '' })
        }
        className="w-full"
      >
        <TabsList className="grid w-full max-w-md grid-cols-3 p-1">
          <TabsTrigger
            value="departments"
            className="rounded-md font-medium text-xs sm:text-sm"
          >
            Departments
          </TabsTrigger>
          <TabsTrigger
            value="routines"
            className="rounded-md font-medium text-xs sm:text-sm"
          >
            Class Routine
          </TabsTrigger>
          <TabsTrigger
            value="shortcuts"
            className="rounded-md font-medium text-xs sm:text-sm"
          >
            All Sections
          </TabsTrigger>
        </TabsList>

        <TabsContent value="departments" className="pt-4 outline-none">
          <DepartmentManager />
        </TabsContent>

        <TabsContent value="routines" className="pt-4 outline-none">
          <RoutineManager />
        </TabsContent>

        <TabsContent value="shortcuts" className="pt-4 outline-none">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SHORTCUTS.map(([label, href]) => (
              <Card
                key={href}
                className="group border-border/60 transition-all duration-200 hover:border-primary/40 hover:shadow-md"
              >
                <CardContent className="flex items-center justify-between p-4">
                  <span className="text-sm font-medium transition-colors group-hover:text-primary">
                    {label}
                  </span>
                  <Button
                    size="sm"
                    nativeButton={false}
                    variant="outline"
                    className="h-8 transition-all group-hover:bg-primary group-hover:text-primary-foreground"
                    render={<Link href={href} />}
                  >
                    Open
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
