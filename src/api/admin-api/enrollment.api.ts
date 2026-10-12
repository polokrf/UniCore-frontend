import apiFetch from "@/lib/apiFetch";
import { TSingleEnrollments } from "@/type/addminAccess/singleEnroment.type";

export const getSingleEnrollments = (id:string) => {
  return apiFetch<TSingleEnrollments>(`/api/enrolment/${id}`);
};
