import apiFetch from "@/lib/apiFetch";
import { IDepartmentPayload } from "@/type/addminAccess/department.type";

export const createDepartment = (payload:IDepartmentPayload) =>{
  return apiFetch('/api/department',{method:'POST',body:payload});
}