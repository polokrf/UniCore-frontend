import apiFetch from '@/lib/apiFetch';
import { TApiResponse, TDepartmentUpdatePayload } from '@/type/api.type';

// PATCH /api/department/update  (id travels in the body)
export const updateDepartment = (payload: TDepartmentUpdatePayload) =>
  apiFetch<TApiResponse<unknown>>('/api/department/update', {
    method: 'PATCH',
    body: payload,
  });

// DELETE /api/department/:id
export const deleteDepartment = (id: string) =>
  apiFetch<TApiResponse<unknown>>(`/api/department/${id}`, {
    method: 'DELETE',
  });
