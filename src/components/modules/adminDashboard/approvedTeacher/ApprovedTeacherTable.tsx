'use client';

import { PagePagination } from '@/components/ui/ApprovedPagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetTeacher } from '@/hooks/admin-hook/admin.access.hooks';
import { ITeacherQuery } from '@/type/query.types';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { TeacherApprovedSheet } from './TeacherAprovedSheet';

interface Props extends ITeacherQuery {
  handleChangPage: Dispatch<SetStateAction<number>>;
}

export function ApprovedTeacherTable({
  handleChangPage,
  ...queryParams
}: Props) {
  const { data } = useGetTeacher(queryParams);

  const teachers = data?.data?.data || [];
  const meta = data?.data?.meta;

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-border/60 shadow-sm transition-all">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[80px] font-semibold text-foreground/80">
                Avatar
              </TableHead>
              <TableHead className="font-semibold text-foreground/80">
                Name
              </TableHead>
              <TableHead className="font-semibold text-foreground/80">
                Email
              </TableHead>
              <TableHead className="font-semibold text-foreground/80">
                Status
              </TableHead>
              <TableHead className="text-right font-semibold text-foreground/80">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground"
                >
                  No teachers found.
                </TableCell>
              </TableRow>
            ) : (
              teachers.map(teacher => (
                <TableRow
                  key={teacher.id}
                  className="transition-colors hover:bg-muted/40"
                >
                  <TableCell>
                    {teacher.user.image ? (
                      <Image
                        src={teacher.user.image}
                        alt="applied teacher"
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full object-cover ring-1 ring-border/50 shadow-sm"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm ring-1 ring-primary/20 shadow-sm">
                        <span>
                          {teacher.user.firstName
                            ? teacher.user.firstName.charAt(0).toUpperCase()
                            : 'T'}
                        </span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {teacher.user.firstName}
                  </TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">
                    {teacher.user.email}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        teacher.isActive
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                          : 'bg-destructive/10 text-destructive border border-destructive/20'
                      }`}
                    >
                      {teacher.isActive ? 'Active' : 'Blocked'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <TeacherApprovedSheet approvedId={teacher.id} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {meta?.totalPage && meta.totalPage > 1 && (
        <div className="pt-2">
          <PagePagination
            page={queryParams.page as number}
            totalPage={meta.totalPage as number}
            handleChangPage={handleChangPage}
          />
        </div>
      )}
    </div>
  );
}
