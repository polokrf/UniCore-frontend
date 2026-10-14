'use client'

import { createSemester, getSemester, getSimpleSemester, updateSemester } from '@/api/admin-api/semister.api';
import { TSemesterResponse } from '@/type/addminAccess/semester.type';
import { IQuery } from '@/type/query.types';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetSemester = (params:IQuery) => {
  return useQuery<TSemesterResponse>({
    queryKey: ['get-all-semester',params],
    queryFn: ()=>getSemester(params),
  });
};
export const useSimpleGetSemester = () => {
  return useQuery<TSemesterResponse>({
    queryKey: ['get-all-semester'],
    queryFn:getSimpleSemester,
  });
};

export const useCreateSemester = () => {
  return useMutation({
    mutationFn: createSemester,
  });
};
export const useUpdateSemester = () => {
  return useMutation({
    mutationFn:updateSemester,
  });
};