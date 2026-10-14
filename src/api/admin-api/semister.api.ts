import apiFetch from '@/lib/apiFetch';
import { ISemesterPayload, ISemesterUpdate, TSemesterResponse } from '@/type/addminAccess/semester.type';
import { IQuery } from '@/type/query.types';

export const getSemester = (params:IQuery) => {
  return apiFetch<TSemesterResponse>('/api/semester',{params});
};
export const getSimpleSemester = () => {
  return apiFetch<TSemesterResponse>('/api/semester');
};

export const createSemester = (payload: ISemesterPayload) => {
  return apiFetch('/api/semester/crate', {
    method: 'POST',
    body: payload,
  });
};
export const updateSemester = (payload:ISemesterUpdate) => {
  return apiFetch(`/api/semester/${payload.id}`, {
    method: 'PATCH',
    body: payload.payload,
  });
};