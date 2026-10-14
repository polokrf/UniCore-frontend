import { IMeta } from './admin.access.type';

export interface ISemester {
  id: string;
  name: string;
  year: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type TSemesterResponse = {
  status: number;
  success: boolean;
  message: string;
  data: {
    data: ISemester[];
    meta: IMeta;
  };
};

export interface ISemesterPayload {
  name: string;
  year: number;
  startDate: string;
  endDate: string;
}

export interface ISemesterUpdate {
  payload: {
    name?: string;
    year?: number;
    startDate?: string;
    endDate?: string;
    isActive?: boolean;
  };
  id:string
}