
import {
  approvedStudent,
  approvedTeacher,
  getSingleStudent,
  getSingleTeacher,
} from '@/api/admin-api/approved.teacher.student.api';
import { TApprovedSingleStudentResponse } from '@/type/addminAccess/student.approved';
import { IGetSingleTeacherResponse } from '@/type/addminAccess/teacher.approved.type';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetSingleTeacher = (payload: { id: string }) => {
  return useQuery<IGetSingleTeacherResponse>({
    queryKey: ['get-single-teacher', payload.id],
    queryFn: () => getSingleTeacher(payload),
    enabled: !!payload.id,
  });
};

export const useApprovedRejectedTeacher = () => {
  return useMutation({
    mutationFn: approvedTeacher,
  });
};

export const useGetSingleStudent = (payload: { id: string }) => {
  return useQuery<TApprovedSingleStudentResponse>({
    queryKey: ['get-single-student', payload.id],
    queryFn: () => getSingleStudent(payload),
    enabled: !!payload.id,
  });
};

export const useApprovedRejectedStudent = () => {
  return useMutation({
    mutationFn: approvedStudent,
  });
};