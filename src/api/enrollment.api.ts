import apiFetch from '@/lib/apiFetch';
import { TApiResponse } from '@/type/api.type';
import { TMyEnrollment } from '@/type/domain.type';

export const enrollNow = (courseOfferingId: string) =>
  apiFetch<TApiResponse<unknown>>('/api/enrolment/enroll-now', {
    method: 'POST',
    body: { courseOfferingId },
  });

export const getMyEnrollments = () =>
  apiFetch<TApiResponse<TMyEnrollment[]>>('/api/enrolment');

export const cancelEnrollment = (id: string) =>
  apiFetch<TApiResponse<unknown>>(`/api/enrolment/cancel/${id}`, {
    method: 'PATCH',
  });
