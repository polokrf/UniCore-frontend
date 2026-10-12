import apiFetch from '@/lib/apiFetch';
import { TManageUser, TUserQuery } from '@/type/addminAccess/admin.access.type';
import { TEnrollments } from '@/type/addminAccess/enrollments.type';
import {  TResultResponse } from '@/type/addminAccess/result.type';
import { TApprovedStudent } from '@/type/addminAccess/student.approved';
import { TApprovedTeacher } from '@/type/addminAccess/teacher.approved.type';

import { IEnrollmentQuery, IResultQuery, IStudentQuery, ITeacherQuery } from '@/type/query.types';

export const getUsers = (params: TUserQuery) => {
  return apiFetch<TManageUser>(`/api/admin/users`, {
    params,
  });
};

export const getTeachers = (params:ITeacherQuery) => {
  return apiFetch<TApprovedTeacher>(`/api/admin/teachers`,{
    params
  });
};

export const getStudents = (params: IStudentQuery) => {
  return apiFetch<TApprovedStudent>(`/api/admin/students`,{
    params
  });
};

export const getEnrollments = (params:IEnrollmentQuery ) => {
  return apiFetch<TEnrollments>(`/api/admin/enrollments`,{
    params
  });
};
export const getResults = (params:IResultQuery) => {
  return apiFetch<TResultResponse>(`/api/admin/results`,{
    params
  });
};

export const approvedTeacher = (id: string) => {
  return apiFetch(`/api/admin/teachers/${id}`, { method: 'PATCH' });
};
export const approvedStudent = (id: string) => {
  return apiFetch(`/api/admin/students/${id}`, { method: 'PATCH' });
};
