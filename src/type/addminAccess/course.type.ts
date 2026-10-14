import { TMeta } from '../api.type';

export interface ICoursePayload {
  departmentId: string;
  code: string;
  title: string;
  description: string;
  credit: number;
}

export interface ICourseGet {
  id: string;
  departmentId: string;
  code: string;
  title: string;
  description: string;
  credit: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type TCourseGetResponse = {
  status: number;
  success: boolean;
  message: string;
  data: {
    data: ICourseGet[];
    meta: TMeta;
  };
};

export interface ICourseUpdate {
  payload: {
    code?: string;
    title?: string;
    description?: string;
    credit?: number;
  };
  id:string
}