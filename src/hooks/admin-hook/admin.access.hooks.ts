import {
  approvedStudent,
  approvedTeacher,
  getEnrollments,
  getResults,
  getStudents,
  getTeachers,
  getUsers,
} from '@/api/admin-api/admin.access.api';
import { TManageUser, TUserQuery } from '@/type/addminAccess/admin.access.type';
import { TEnrollments } from '@/type/addminAccess/enrollments.type';
import { TResultResponse } from '@/type/addminAccess/result.type';
import { TApprovedStudent } from '@/type/addminAccess/student.approved';
import { TApprovedTeacher } from '@/type/addminAccess/teacher.approved.type';
import {
  IEnrollmentQuery,
  IResultQuery,
  IStudentQuery,
  ITeacherQuery,
} from '@/type/query.types';

import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query';

export const useGetUsers = (params: TUserQuery) => {
  return useSuspenseQuery<TManageUser>({
    queryKey: ['getUsers', params],
    queryFn: () => getUsers(params),
  });
};

export const useGetTeacher = (params: ITeacherQuery) => {
  return useSuspenseQuery<TApprovedTeacher>({
    queryKey: ['getTeacher', params],
    queryFn: () => getTeachers(params),
  });
};

export const useGetStudent = (params: IStudentQuery) => {
  return useSuspenseQuery<TApprovedStudent>({
    queryKey: ['getStudent', params],
    queryFn: () => getStudents(params),
  });
};

export const useGetEnrollments = (params: IEnrollmentQuery) => {
  return useSuspenseQuery<TEnrollments>({
    queryKey: ['getEnrollments', params],
    queryFn: () => getEnrollments(params),
  });
};
export const useGetResults = (params: IResultQuery) => {
  return useSuspenseQuery<TResultResponse>({
    queryKey: ['getResults', params],
    queryFn: () => getResults(params),
  });
};

export const useApprovedTeacher = () => {
  return useMutation({
    mutationFn: approvedTeacher,
  });
};

export const useApprovedStudent = () => {
  return useMutation({
    mutationFn: approvedStudent,
  });
};
