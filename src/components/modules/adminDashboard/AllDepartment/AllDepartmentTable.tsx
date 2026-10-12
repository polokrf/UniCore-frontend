'use client'

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TablePagination } from '@/components/ui/TablePagination';
import { useGetDepartment } from '@/hooks/department.hook';

import { IDepartmentQuery } from '@/type/query.types';
import { Trash } from 'lucide-react';
import React, { Dispatch, SetStateAction } from 'react';

interface Props extends IDepartmentQuery {
  handleChangPage: Dispatch<SetStateAction<number>>;
}
const AllDepartmentTable = ({ handleChangPage, ...queryParams}: Props) => {
  const { data } = useGetDepartment(queryParams);

  const departments = data.data.data || [];
  const meta = data.data.meta;

 
  return (
    <>
      <div className="mb-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Department Name</TableHead>
              <TableHead>Department Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departments.map(department => (
              <TableRow key={department.id}>
                <TableCell className="font-medium">{department.name}</TableCell>
                <TableCell>{department.description}</TableCell>
                <TableCell>
                  {department.isActive ? 'Active' : 'Blocked'}
                </TableCell>
                <TableCell className="text-right">
                  <Button>Update</Button>

                  <Button>
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* pagination */}

      <div className="mt-2">
        {meta.total && meta.total > 10 && (
          <TablePagination
            totalPage={meta.totalPage as number}
            page={Number(queryParams.page)}
            handlePageChange={handleChangPage}
          />
        )}
      </div>
    </>
  );
};

export default AllDepartmentTable;