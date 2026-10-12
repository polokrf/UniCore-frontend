import apiFetch from "@/lib/apiFetch"
import {  TDepartmentResponse, TSingleDepartment } from "@/type/depart.type";
import { IDepartmentQuery } from "@/type/query.types";


export const getDepartment =(params:IDepartmentQuery)=>{
  return apiFetch<TDepartmentResponse>(`/api/department`,{
    params
  });
}

//  single get department 

export const singleGetDepartment = (id:string)=>{
   return apiFetch<TSingleDepartment>(`/api/department/${id}`);
}