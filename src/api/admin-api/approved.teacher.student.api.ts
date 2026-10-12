import apiFetch from '@/lib/apiFetch';
import { TApprovedSingleStudentResponse } from '@/type/addminAccess/student.approved';
import { IGetSingleTeacherResponse } from '@/type/addminAccess/teacher.approved.type';

export const getSingleTeacher = (payload: { id: string }) => {
  return apiFetch<IGetSingleTeacherResponse>(
    `/api/teacher-profile/${payload.id}`,
  );
};

export const approvedTeacher = (payload: { id: string; status: string }) => {
  return apiFetch(
    `/api/admin/teachers/${payload.id}`,
    {
      method: 'PATCH',
      body: { status: payload.status },
    },
  );
};

export const getSingleStudent = (payload: { id: string }) => {
  return apiFetch<TApprovedSingleStudentResponse>(
    `/api/student-profile/single/${payload.id}`,
  );
};

export const approvedStudent = (payload: { id: string; status: string }) => {
  return apiFetch(
    `/api/admin/students/${payload.id}`,
    {
      method: 'PATCH',
      body: { status: payload.status },
    },
  );
};