import apiFetch from "@/lib/apiFetch";

export const getAllTeacherProfile = () => apiFetch('/api/teacher-profile');
export const getSingleTeacherProfile = (id:string) => apiFetch(`/api/teacher-profile${id}`);
