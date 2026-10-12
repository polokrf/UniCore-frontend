import apiFetch from "@/lib/apiFetch";
import { ICourseOfferingPayload, TCourseOfferingGetResponse } from "@/type/addminAccess/courseOffering.type";

export const createCourseOffering = (payload: ICourseOfferingPayload) => {
  return apiFetch('/api/course-offering/create', { method: 'POST', body: payload });
};

export const getCourseOffering=()=>{
  return apiFetch<TCourseOfferingGetResponse>('/api/course-offering');
}