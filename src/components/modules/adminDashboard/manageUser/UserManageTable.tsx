'use client';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TablePagination } from '@/components/ui/TablePagination';
import { toast } from '@/components/ui/toast';
import { useGetUsers } from '@/hooks/admin-hook/admin.access.hooks';
import { useUpdateUserStatus } from '@/hooks/admin-hook/manage.user.hooks';
import { TUserGet, TUserQuery } from '@/type/addminAccess/admin.access.type';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

interface Props extends TUserQuery {
  handleChangPage: Dispatch<SetStateAction<number>>;
}

export function UserManageTable({ handleChangPage, ...queryParams }: Props) {
  const { data } = useGetUsers(queryParams);
  const { mutate, isPending } = useUpdateUserStatus();
  const queryClient = useQueryClient();

  const users = data?.data?.data || [];
  const meta = data?.data?.meta;

  const handleUpdateStatus = (status: string, id: string) => {
    const payload = {
      status,
      id,
    };
    mutate(payload, {
      onSuccess: res => {
        toast.add({
          type: 'success',
          title: `${res.message}`,
        });
        queryClient.invalidateQueries({
          queryKey: ['getUsers'],
        });
      },
      onError: err => {
        toast.add({
          type: 'error',
          title: `${err.message}`,
        });
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-border/60 shadow-sm transition-all">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[80px] font-semibold text-foreground/80">
                User
              </TableHead>
              <TableHead className="font-semibold text-foreground/80">
                Name
              </TableHead>
              <TableHead className="font-semibold text-foreground/80">
                Email
              </TableHead>
              <TableHead className="font-semibold text-foreground/80">
                Status
              </TableHead>
              <TableHead className="text-right font-semibold text-foreground/80">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground"
                >
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              users.map(user => (
                <TableRow
                  key={user.id}
                  className="transition-colors hover:bg-muted/40"
                >
                  {/* Avatar Cell */}
                  <TableCell>
                    <div className="flex items-center">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={user.firstName || 'User avatar'}
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-full object-cover ring-1 ring-border/50 shadow-sm"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm ring-1 ring-primary/20 shadow-sm">
                          {user.firstName
                            ? user.firstName.charAt(0).toUpperCase()
                            : 'U'}
                        </div>
                      )}
                    </div>
                  </TableCell>

                  {/* Name Cell */}
                  <TableCell className="font-medium text-foreground">
                    {user.firstName}
                  </TableCell>

                  {/* Email Cell */}
                  <TableCell className="text-muted-foreground font-mono text-xs">
                    {user.email}
                  </TableCell>

                  {/* Status Badge */}
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        user.isActive
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                          : 'bg-destructive/10 text-destructive border border-destructive/20'
                      }`}
                    >
                      {user.isActive ? 'Active' : 'Blocked'}
                    </span>
                  </TableCell>

                  {/* Action Button */}
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant={user.isActive ? 'destructive' : 'outline'}
                      className="h-8 shadow-sm transition-all"
                      disabled={isPending}
                      onClick={() =>
                        handleUpdateStatus(
                          user.isActive ? 'Blocked' : 'Active',
                          user.id,
                        )
                      }
                    >
                      {user.isActive ? 'Block' : 'Activate'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {meta?.totalPage && meta.totalPage > 1 && (
        <div className="pt-2">
          <TablePagination
            totalPage={meta.totalPage as number}
            page={Number(queryParams.page)}
            handlePageChange={handleChangPage}
          />
        </div>
      )}
    </div>
  );
}
