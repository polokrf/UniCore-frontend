import apiFetch from '@/lib/apiFetch';
import {
  TApiResponse,
  TResultCreatePayload,
  TResultUpdatePayload,
} from '@/type/api.type';
import { TMyResult } from '@/type/domain.type';

export const createResult = (payload: TResultCreatePayload) =>
  apiFetch<TApiResponse<TMyResult>>('/api/results', {
    method: 'POST',
    body: payload,
  });

export const getMyResults = () =>
  apiFetch<TApiResponse<TMyResult[]>>('/api/results');

export const getSingleResult = (id: string) =>
  apiFetch<TApiResponse<TMyResult>>(`/api/results/${id}`);

// ADMIN / SUPER_ADMIN: PATCH /api/results/:id  (correct marks/grade, publish / unpublish)
export const updateResult = (id: string, payload: TResultUpdatePayload) =>
  apiFetch<TApiResponse<unknown>>(`/api/results/${id}`, {
    method: 'PATCH',
    body: payload,
  });
