import { IMeta } from "./addminAccess/admin.access.type";

export type TCours = {
  code: string;
  createdAt: string;
  credit:number;
  departmentId:string;
  description: string;
  id: string;
  isActive:boolean;
  title: string;
  updatedAt:string;
};

export type TDepartment = {
  id: string;
  name: string;
  code: string;
  courses?:TCours[];
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TDepartmentResponse = {
  status: number;
  success: boolean;
  message: string;
  data: {
    data: TDepartment[];
    meta:IMeta
  };
};

export type TSingleDepartment = {
  status: number;
  success: boolean;
  message: string;
  data: TDepartment;
};

