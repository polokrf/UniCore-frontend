import apiFetch from '@/lib/apiFetch';
import {
  TApiResponse,
  TStudentProfileUpdatePayload,
  TTeacherProfileUpdatePayload,
} from '@/type/api.type';
import { TStudentProfile, TTeacherProfile } from '@/type/domain.type';

// ---- teacher-profile ----
// GET /api/teacher-profile -> approved + active teachers (no per-user filter,
// so the faculty UI finds its own row by userId).
export const getTeacherProfiles = () =>
  apiFetch<TApiResponse<TTeacherProfile[]>>('/api/teacher-profile');

export const getTeacherProfile = (id: string) =>
  apiFetch<TApiResponse<TTeacherProfile>>(`/api/teacher-profile/${id}`);

export const updateMyTeacherProfile = (payload: TTeacherProfileUpdatePayload) =>
  apiFetch<TApiResponse<TTeacherProfile>>('/api/teacher-profile/update-won-profile', {
    method: 'PATCH',
    body: payload,
  });

// ---- student-profile ----
// GET /api/student-profile/:id (STUDENT). The backend ignores :id and returns
// the logged-in student's own profile, so any placeholder works.
export const getMyStudentProfile = () =>
  apiFetch<TApiResponse<TStudentProfile>>('/api/student-profile/me');

// GET /api/student-profile/single/:id  (ADMIN, profile id)
export const getSingleStudentProfile = (id: string) =>
  apiFetch<TApiResponse<TStudentProfile>>(`/api/student-profile/single/${id}`);

export const updateMyStudentProfile = (payload: TStudentProfileUpdatePayload) =>
  apiFetch<TApiResponse<TStudentProfile>>('/api/student-profile/update-won-profile', {
    method: 'PATCH',
    body: payload,
  });

// ---- user ----
// PATCH /api/user/update-profile-photo  (multipart, field name: "image")
export const updateProfilePhoto = (file: File) => {
  const body = new FormData();
  body.append('image', file);
  return apiFetch<TApiResponse<unknown>>('/api/user/update-profile-photo', {
    method: 'PATCH',
    body,
  });
};
