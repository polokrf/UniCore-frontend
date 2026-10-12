'use client'

import { createSemester, getSemester } from '@/api/admin-api/semister.api';
import { TSemesterResponse } from '@/type/addminAccess/semester.type';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetSemester = () => {
  return useQuery<TSemesterResponse>({
    queryKey: ['get-all-semester'],
    queryFn: getSemester,
  });
};

export const useCreateSemester = () => {
  return useMutation({
    mutationFn: createSemester,
  });
};