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
import { Badge } from '@/components/ui/badge';
import {
  useGetEnrollments,
  useGetTeacher,
} from '@/hooks/admin-hook/admin.access.hooks';
import { IEnrollmentQuery, ITeacherQuery } from '@/type/query.types';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { EnrollmentSheet } from './EnrollmentSheet';

interface Props extends IEnrollmentQuery {
  handleChangPage: Dispatch<SetStateAction<number>>;
}

export function EnrollmentTable({ handleChangPage, ...queryParams }: Props) {
  const { data } = useGetEnrollments(queryParams);
  // console.log(data)
  const enrollments = data?.data?.data || [];
  const meta = data?.data?.meta;

  // Helper function for status styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return (
          <Badge className="bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/25 dark:text-emerald-400 border-none font-medium">
            Confirmed
          </Badge>
        );
      case 'PENDING':
        return (
          <Badge className="bg-amber-500/15 text-amber-600 hover:bg-amber-500/25 dark:text-amber-400 border-none font-medium">
            Pending
          </Badge>
        );
      case 'CANCELLED':
        return (
          <Badge className="bg-rose-500/15 text-rose-600 hover:bg-rose-500/25 dark:text-rose-400 border-none font-medium">
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <>
      <div className="relative w-full overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[80px]">Avatar</TableHead>
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Course Title</TableHead>
              <TableHead className="font-semibold">Amount</TableHead>
              <TableHead className="text-right font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enrollments.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-32 text-center text-muted-foreground"
                >
                  No enrollments found.
                </TableCell>
              </TableRow>
            ) : (
              enrollments.map(enrollment => (
                <TableRow
                  key={enrollment.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <TableCell className="font-medium">
                    {enrollment.student.user.image ? (
                      <Image
                        src={enrollment.student.user.image}
                        alt="applied teacher"
                        width={40}
                        height={40}
                        className="h-[40px] w-[40px] rounded-full object-cover ring-2 ring-border"
                      />
                    ) : (
                      <div className="w-[40px] h-[40px] rounded-full bg-primary/10 text-primary font-bold flex justify-center items-center ring-2 ring-border">
                        <span>
                          {enrollment.student.user.firstName?.charAt(0)}
                        </span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {enrollment.student.user.firstName}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {enrollment.student.user.email}
                  </TableCell>
                  <TableCell>{getStatusBadge(enrollment.status)}</TableCell>
                  <TableCell className="font-medium max-w-[200px] truncate">
                    {enrollment.courseOffering.course.title}
                  </TableCell>
                  <TableCell className="font-semibold">
                    ${enrollment.courseOffering.fee}
                  </TableCell>
                  <TableCell className="text-right">
                    <EnrollmentSheet enrollment={enrollment} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {enrollments.length > 10 && meta?.totalPage && (
        <div className="p-4 border-t border-border">
          <PagePagination
            page={queryParams.page as number}
            totalPage={meta.totalPage as number}
            handleChangPage={handleChangPage}
          />
        </div>
      )}
    </>
  );
}
