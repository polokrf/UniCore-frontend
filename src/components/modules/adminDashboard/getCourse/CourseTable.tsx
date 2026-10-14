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

import { ICourseQuery } from '@/type/query.types';
import React, { Dispatch, SetStateAction } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useGetCourse } from '@/hooks/admin-hook/course.hook';
import { TMeta } from '@/type/api.type';
import { Trash } from 'lucide-react';
import { CourseModal } from './CourseModal';


interface Props extends ICourseQuery {
  handleChangPage: Dispatch<SetStateAction<number>>;
}

const CourseTable = ({ handleChangPage, ...queryParams }: Props) => {
  const { data } = useGetCourse(queryParams);
  const courses = data?.data?.data || [];
  const meta = data?.data?.meta || {} as TMeta; 


  // console.log(meta?.total)
 

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px] font-semibold">
                Course Name
              </TableHead>
              <TableHead className="font-semibold">
                Course Description
              </TableHead>
              <TableHead className="font-semibold">
                Course Credit
              </TableHead>
              <TableHead className="w-[120px] font-semibold">Status</TableHead>
              <TableHead className="text-right w-[100px] font-semibold">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  No Course found.
                </TableCell>
              </TableRow>
            ) : (
              courses.map(course => (
                <TableRow
                  key={course.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-medium">
                    {course.title}
                  </TableCell>
                  <TableCell className="text-muted-foreground line-clamp-2">
                    {course.description|| 'N/A'}
                  </TableCell>
                  <TableCell className='  font-bold text-blue-500 p-3'>
                    {course.credit|| 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={course.isActive ? 'default' : 'secondary'}
                    >
                      {course.isActive ? 'Active' : 'Blocked'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <CourseModal course={course}/>
                   
                   
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {meta?.total&& meta.total > 10 && (
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

export default CourseTable;
