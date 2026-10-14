'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TablePagination } from '@/components/ui/TablePagination';

import { ICourseQuery, IQuery } from '@/type/query.types';
import React, { Dispatch, SetStateAction } from 'react';

import { Badge } from '@/components/ui/badge';

import { useGetCourse } from '@/hooks/admin-hook/course.hook';
import { TMeta } from '@/type/api.type';
import { SemesterModal } from './SemesterModal';
import { useGetSemester } from '@/hooks/admin-hook/semester.hook';



interface Props extends IQuery {
  handleChangPage: Dispatch<SetStateAction<number>>;
}

const SemesterTable = ({ handleChangPage, ...queryParams }: Props) => {
  const { data } = useGetSemester(queryParams);
  const semesters = data?.data?.data || [];
  const meta = data?.data?.meta || ({} as TMeta);
   
  
  // console.log(meta?.total)

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px] font-semibold">
               Semester Name
              </TableHead>
              <TableHead className="font-semibold">
               Semester Start
              </TableHead>
              <TableHead className="font-semibold">Semester End</TableHead>
              <TableHead className="w-[120px] font-semibold">Status</TableHead>
              <TableHead className="text-right w-[100px] font-semibold">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {semesters.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  No Semester found.
                </TableCell>
              </TableRow>
            ) : (
              semesters.map(semester => (
                <TableRow
                  key={semester.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-medium">{semester.name}</TableCell>
                  <TableCell className="font-bold  p-3 line-clamp-2">
                    {semester.startDate
                      ? new Date(semester.startDate).toDateString()
                      : 'N/A'}
                  </TableCell>
                  <TableCell className="  font-bold  p-3">
                    {semester.endDate
                      ? new Date(semester.endDate).toDateString()
                      : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={semester.isActive ? 'default' : 'secondary'}
                    >
                      {semester.isActive ? 'Active' : 'Blocked'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <SemesterModal semester={semester} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {meta?.total && meta.total > 10 && (
        <div className="flex justify-end pt-2">
          <TablePagination
            totalPage={meta.totalPage as number}
            page={Number(queryParams.page)}
            handlePageChange={handleChangPage}
          />
        </div>
      )}
    </div>
  );
};

export default SemesterTable;
