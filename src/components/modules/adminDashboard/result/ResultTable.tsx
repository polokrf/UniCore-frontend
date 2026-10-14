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
import { useGetResults } from '@/hooks/admin-hook/admin.access.hooks';
import { IResultQuery } from '@/type/query.types';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { ResultReviewSheet } from './ResultReviewSheet';
import { CheckCircle2, EyeOff } from 'lucide-react';

interface Props extends IResultQuery {
  handleChangPage: Dispatch<SetStateAction<number>>;
}

export function ResultTable({ handleChangPage, ...queryParams }: Props) {
  const { data } = useGetResults(queryParams);
  // console.log(data)

  const results = data?.data?.data || [];
  const meta = data?.data?.meta;

  return (
    <>
      <div className="relative w-full overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[80px]">Avatar</TableHead>
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
              <TableHead className="font-semibold">Course</TableHead>
              <TableHead className="font-semibold">Marks</TableHead>
              <TableHead className="font-semibold">Grade</TableHead>
              <TableHead className="font-semibold">Point</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="text-right font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="h-32 text-center text-muted-foreground"
                >
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              results.map(result => (
                <TableRow
                  key={result.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <TableCell className="font-medium">
                    {result.enrollment.student.user.image ? (
                      <Image
                        src={result.enrollment.student.user.image}
                        alt="applied teacher"
                        width={40}
                        height={40}
                        className="h-[40px] w-[40px] rounded-full object-cover ring-2 ring-border"
                      />
                    ) : (
                      <div className="w-[40px] h-[40px] rounded-full bg-primary/10 text-primary font-bold flex justify-center items-center ring-2 ring-border">
                        <span>
                          {result.enrollment.student.user.firstName?.charAt(0)}
                        </span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {result.enrollment.student.user.firstName}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {result.enrollment.student.user.email}
                  </TableCell>
                  <TableCell className="font-medium">
                    {result.enrollment.courseOffering?.course.code ?? '—'}
                  </TableCell>
                  <TableCell className="font-semibold">
                    {result.marks}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-bold">
                      {result.grade}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold">
                    {result.gradePoint}
                  </TableCell>
                  <TableCell>
                    {result.published ? (
                      <Badge className="bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/25 dark:text-emerald-400 border-none font-medium gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Published
                      </Badge>
                    ) : (
                      <Badge className="bg-amber-500/15 text-amber-600 hover:bg-amber-500/25 dark:text-amber-400 border-none font-medium gap-1">
                        <EyeOff className="h-3.5 w-3.5" /> Hidden
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <ResultReviewSheet result={result} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {results.length > 1 && meta?.totalPage && (
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
