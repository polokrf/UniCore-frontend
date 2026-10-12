import {
  getDepartment,
  singleGetDepartment,
} from '@/api/public.department.api';
import { TDepartmentResponse, TSingleDepartment } from '@/type/depart.type';
import { IDepartmentQuery } from '@/type/query.types';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetDepartment = (params:IDepartmentQuery) => {
  return useSuspenseQuery<TDepartmentResponse>({
    queryKey: ['department',params],
    queryFn:()=> getDepartment(params),
  });
};

// single get

export const useSingleGetDepartment = (id: string) => {
  return useSuspenseQuery<TSingleDepartment>({
    queryKey: ['department', id],
    queryFn: () => singleGetDepartment(id),
  });
};
