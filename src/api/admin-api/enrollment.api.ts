import apiFetch from "@/lib/apiFetch";
import { TEnrollments } from "@/type/addminAccess/enrollments.type";
import { TSingleEnrollments } from "@/type/addminAccess/singleEnroment.type";

export const getSimpleEnrollments = () => {
  return apiFetch<TEnrollments>(`/api/admin/enrollments`);
};

export const getSingleEnrollments = (id:string) => {
  return apiFetch<TSingleEnrollments>(`/api/enrolment/${id}`);
};
