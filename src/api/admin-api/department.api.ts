import apiFetch from "@/lib/apiFetch";
import { IDepartmentPayload, IDepartmentUpdate } from "@/type/addminAccess/department.type";

export const createDepartment = (payload:IDepartmentPayload) =>{
  return apiFetch('/api/department',{method:'POST',body:payload});
}
export const updateDepartment = (payload:IDepartmentUpdate) =>{
  return apiFetch('/api/department/update',{method:'PATCH',body:payload});
}

