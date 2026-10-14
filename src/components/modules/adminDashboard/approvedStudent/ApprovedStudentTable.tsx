'use client';

import EmptyState from '@/components/shared/EmptyState';
import { PagePagination } from '@/components/ui/ApprovedPagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetStudent } from '@/hooks/admin-hook/admin.access.hooks';
import { IStudentQuery } from '@/type/query.types';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { StudentApprovedSheet } from './ApprovedStudentSheet';

interface Props extends IStudentQuery {
  handleChangPage: Dispatch<SetStateAction<number>>;
}

export function ApprovedStudentTable({
  handleChangPage,
  ...queryParams
}: Props) {
  const { data } = useGetStudent(queryParams);

  const students = data?.data?.data || [];
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
            {students.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center">
                  <EmptyState
                    title="No students found"
                    description="Try adjusting your search criteria or filter options."
                  />
                </TableCell>
              </TableRow>
            ) : (
              students.map(student => (
                <TableRow
                  key={student.id}
                  className="transition-colors hover:bg-muted/40"
                >
                  <TableCell>
                    {student.user.image ? (
                      <Image
                        src={student.user.image}
                        alt={student.user.firstName || 'Student avatar'}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full object-cover ring-1 ring-border/50 shadow-sm"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm ring-1 ring-primary/20 shadow-sm">
                        <span>
                          {student.user.firstName
                            ? student.user.firstName.charAt(0).toUpperCase()
                            : 'S'}
                        </span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {student.user.firstName}
                  </TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">
                    {student.user.email}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        student.isActive
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                          : 'bg-destructive/10 text-destructive border border-destructive/20'
                      }`}
                    >
                      {student.isActive ? 'Active' : 'Blocked'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <StudentApprovedSheet approvedId={student.id} />
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
