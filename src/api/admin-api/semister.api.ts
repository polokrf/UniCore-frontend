import apiFetch from '@/lib/apiFetch';
import { ISemesterPayload, TSemesterResponse } from '@/type/addminAccess/semester.type';

export const getSemester = () => {
  return apiFetch<TSemesterResponse>('/api/semester');
};

export const createSemester = (payload: ISemesterPayload) => {
  return apiFetch('/api/semester/crate', {
    method: 'POST',
    body: payload,
  });
};