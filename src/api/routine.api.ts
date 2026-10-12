import apiFetch from '@/lib/apiFetch';
import { TApiResponse, TRoutineUpdatePayload } from '@/type/api.type';
import { TRoutine } from '@/type/domain.type';

export const getClassRoutines = () =>
  apiFetch<TApiResponse<TRoutine[]>>('/api/class-routine');

export const getSingleClassRoutine = (id: string) =>
  apiFetch<TApiResponse<TRoutine>>(`/api/class-routine/${id}`);

export const updateClassRoutine = (id: string, payload: TRoutineUpdatePayload) =>
  apiFetch<TApiResponse<TRoutine>>(`/api/class-routine/${id}`, {
    method: 'PATCH',
    body: payload,
  });

export const deleteClassRoutine = (id: string) =>
  apiFetch<TApiResponse<unknown>>(`/api/class-routine/${id}`, {
    method: 'DELETE',
  });
