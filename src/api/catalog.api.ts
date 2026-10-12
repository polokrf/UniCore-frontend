import apiFetch from '@/lib/apiFetch';
import {
  TApiResponse,
  TCourseUpdatePayload,
  TEntity,
  TOfferingUpdatePayload,
  TSemesterUpdatePayload,
} from '@/type/api.type';
import { TOffering } from '@/type/domain.type';

// GET /api/course-offering -> active offerings, each including its course
export const getOfferings = () =>
  apiFetch<TApiResponse<TOffering[]>>('/api/course-offering');

// ---- course ----
export const getSingleCourse = (id: string) =>
  apiFetch<TApiResponse<TEntity>>(`/api/course/${id}`);

export const updateCourse = (id: string, payload: TCourseUpdatePayload) =>
  apiFetch<TApiResponse<TEntity>>(`/api/course/${id}`, {
    method: 'PATCH',
    body: payload,
  });

// ---- semester ----
export const getSingleSemester = (id: string) =>
  apiFetch<TApiResponse<TEntity>>(`/api/semester/${id}`);

export const updateSemester = (id: string, payload: TSemesterUpdatePayload) =>
  apiFetch<TApiResponse<TEntity>>(`/api/semester/${id}`, {
    method: 'PATCH',
    body: payload,
  });

// ---- course-offering ----
export const getSingleCourseOffering = (id: string) =>
  apiFetch<TApiResponse<TEntity>>(`/api/course-offering/${id}`);

export const updateCourseOffering = (
  id: string,
  payload: TOfferingUpdatePayload,
) =>
  apiFetch<TApiResponse<TEntity>>(`/api/course-offering/${id}`, {
    method: 'PATCH',
    body: payload,
  });

export const assignOfferingTeacher = (id: string, teacherId: string) =>
  apiFetch<TApiResponse<TEntity>>(`/api/course-offering/assign-teacher/${id}`, {
    method: 'PATCH',
    body: { teacherId },
  });
