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
import { useGetDepartment } from '@/hooks/department.hook';
import { IDepartmentQuery } from '@/type/query.types';
import React, { Dispatch, SetStateAction } from 'react';
import { DepartmentModal } from './DepartmentModal';
import { Badge } from '@/components/ui/badge';

interface Props extends IDepartmentQuery {
  handleChangPage: Dispatch<SetStateAction<number>>;
}

const AllDepartmentTable = ({ handleChangPage, ...queryParams }: Props) => {
  const { data } = useGetDepartment(queryParams);
  const departments = data?.data?.data || [];
  const meta = data?.data?.meta || {};

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px] font-semibold">
                Department Name
              </TableHead>
              <TableHead className="font-semibold">
                Department Description
              </TableHead>
              <TableHead className="w-[120px] font-semibold">Status</TableHead>
              <TableHead className="text-right w-[100px] font-semibold">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departments.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  No departments found.
                </TableCell>
              </TableRow>
            ) : (
              departments.map(department => (
                <TableRow
                  key={department.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-medium">
                    {department.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground line-clamp-2">
                    {department.description || 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={department.isActive ? 'default' : 'secondary'}
                    >
                      {department.isActive ? 'Active' : 'Blocked'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DepartmentModal department={department} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {meta.total && meta.total > 10 && (
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

export default AllDepartmentTable;
