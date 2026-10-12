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
  useGetResults,
  useGetTeacher,
} from '@/hooks/admin-hook/admin.access.hooks';
import {
  IEnrollmentQuery,
  IResultQuery,
  ITeacherQuery,
} from '@/type/query.types';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { ResultReviewSheet } from './ResultReviewSheet';

interface Props extends IResultQuery {
  handleChangPage: Dispatch<SetStateAction<number>>;
}

export function ResultTable({ handleChangPage, ...queryParams }: Props) {
  const { data } = useGetResults(queryParams);
  // console.log(data)

  const results = data.data.data || [];
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
              <TableHead>Course</TableHead>
              <TableHead>Marks</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Point</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map(result => (
              <TableRow key={result.id}>
                <TableCell className="font-medium">
                  {result.enrollment.student.user.image ? (
                    <Image
                      src={result.enrollment.student.user.image}
                      alt="applied teacher"
                      width={40}
                      height={40}
                      className=" h-[40px] w-[40px] rounded-full"
                    />
                  ) : (
                    <div className=" w-[40px] h-[40px] rounded-full shadow-sm flex justify-center items-center">
                      <span>
                        {result.enrollment.student.user.firstName.charAt(0)}
                      </span>
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">
                  {result.enrollment.student.user.firstName}
                </TableCell>
                <TableCell>{result.enrollment.student.user.email}</TableCell>
                <TableCell>{result.enrollment.courseOffering?.course.code ?? '—'}</TableCell>
                <TableCell>{result.marks}</TableCell>
                <TableCell>{result.grade}</TableCell>
                <TableCell>{result.gradePoint}</TableCell>
                <TableCell>{result.published ? 'Published' : 'Hidden'}</TableCell>
                <TableCell className="text-right">
                  <ResultReviewSheet result={result} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {results.length > 1 && (
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
