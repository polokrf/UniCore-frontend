import apiFetch from '@/lib/apiFetch';
import { ICoursePayload, ICourseUpdate, TCourseGetResponse } from '@/type/addminAccess/course.type';
import { ICourseQuery } from '@/type/query.types';

export const createCourse = (payload: ICoursePayload) => {
  return apiFetch('/api/course/crate', { method: 'POST', body: payload });
};

export const getCourse = (params:ICourseQuery) => {
  return apiFetch<TCourseGetResponse>('/api/course',{params});
};
export const getSimpleCourse = () => {
  return apiFetch<TCourseGetResponse>('/api/course');
};

export const  updateCourse=(data:ICourseUpdate)=>{
 return apiFetch<TCourseGetResponse>(`/api/course/${data.id}`, {method:'PATCH',body:data.payload});
}

