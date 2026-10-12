'use client';

import { PagePagination } from '@/components/ui/ApprovedPagination';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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

  const enrollments = data.data.data || [];
  const meta = data.data.meta;

  return (
    <>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Aavatra</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>CourseTitle</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enrollments.map(enrollment => (
              <TableRow key={enrollment.id}>
                <TableCell className="font-medium">
                  {enrollment.student.user.image ? (
                    <Image
                      src={enrollment.student.user.image}
                      alt="applied teacher"
                      width={40}
                      height={40}
                      className=" h-[40px] w-[40px] rounded-full"
                    />
                  ) : (
                    <div className=" w-[40px] h-[40px] rounded-full shadow-sm flex justify-center items-center">
                      <span>{enrollment.student.user.firstName.charAt(0)}</span>
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">
                  {enrollment.student.user.firstName}
                </TableCell>
                <TableCell>{enrollment.student.user.email}</TableCell>
                <TableCell>{enrollment.status}</TableCell>
                <TableCell>{enrollment.courseOffering.course.title}</TableCell>
                <TableCell>{enrollment.courseOffering.fee}</TableCell>
                <TableCell className="text-right">
                  <EnrollmentSheet enrollment={enrollment} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {enrollments.length > 10 && (
        <div>
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
