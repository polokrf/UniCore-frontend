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
  useGetStudent,
  useGetTeacher,
} from '@/hooks/admin-hook/admin.access.hooks';
import { IStudentQuery, ITeacherQuery } from '@/type/query.types';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { ApprovedSheet } from '../sheet/ApprovedSheet';
import { StudentApprovedSheet } from './ApprovedStudentSheet';

interface Props extends IStudentQuery {
  handleChangPage: Dispatch<SetStateAction<number>>;
}

export function ApprovedStudentTable({
  handleChangPage,
  ...queryParams
}: Props) {
  const { data } = useGetStudent(queryParams);

  // console.log(data)

  const students = data.data.data || [];
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
              <TableHead>Valid</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map(student => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">
                  {student.user.image ? (
                    <Image
                      src={student.user.image}
                      alt="applied teacher"
                      width={40}
                      height={40}
                      className=" h-[40px] w-[40px] rounded-full"
                    />
                  ) : (
                    <div className=" w-[40px] h-[40px] rounded-full shadow-sm flex justify-center items-center">
                      <span>{student.user.firstName.charAt(0)}</span>
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">
                  {student.user.firstName}
                </TableCell>
                <TableCell>{student.user.email}</TableCell>
                <TableCell>{student.isActive ? 'Active' : 'Blocked'}</TableCell>
                <TableCell className="text-right">
                  <StudentApprovedSheet approvedId={student.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {students.length > 10 && (
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
