import apiFetch from '@/lib/apiFetch';
import { TStudentPayload, TTeacher } from '@/type/applyStudent . teacher.type';

export const applyStudent = (payload: TStudentPayload) => {
  return apiFetch('/api/student-profile/apply', {
    method: 'POST',
    body: payload,
  });
};
export const applyTeacher = (payload: TTeacher) => {
  return apiFetch('/api/teacher-profile/apply', {
    method: 'POST',
    body: payload,
  });
};
