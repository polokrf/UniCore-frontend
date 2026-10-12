import apiFetch from '@/lib/apiFetch';
import { ICoursePayload, TCourseGetResponse } from '@/type/addminAccess/course.type';

export const createCourse = (payload: ICoursePayload) => {
  return apiFetch('/api/course/crate', { method: 'POST', body: payload });
};

export const getCourse = () => {
  return apiFetch<TCourseGetResponse>('/api/course');
};