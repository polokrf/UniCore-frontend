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
import { useGetTeacher } from '@/hooks/admin-hook/admin.access.hooks';
import { ITeacherQuery } from '@/type/query.types';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { ApprovedSheet } from '../sheet/ApprovedSheet';
import { TeacherApprovedSheet } from './TeacherAprovedSheet';

interface Props extends ITeacherQuery {
  handleChangPage: Dispatch<SetStateAction<number>>;
}

export function ApprovedTeacherTable({
  handleChangPage,
  ...queryParams
}: Props) {
  const { data } = useGetTeacher(queryParams);

  const teachers = data.data.data || [];
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
            {teachers.map(teacher => (
              <TableRow key={teacher.id}>
                <TableCell className="font-medium">
                  {teacher.user.image ? (
                    <Image
                      src={teacher.user.image}
                      alt="applied teacher"
                      width={40}
                      height={40}
                      className=" h-[40px] w-[40px] rounded-full"
                    />
                  ) : (
                    <div className=" w-[40px] h-[40px] rounded-full shadow-sm flex justify-center items-center">
                      <span>{teacher.user.firstName.charAt(0)}</span>
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">
                  {teacher.user.firstName}
                </TableCell>
                <TableCell>{teacher.user.email}</TableCell>
                <TableCell>{teacher.isActive ? 'Active' : 'Blocked'}</TableCell>
                <TableCell className="text-right">
                  <TeacherApprovedSheet approvedId={teacher.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {teachers.length > 1 && (
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
