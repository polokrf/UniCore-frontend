import { IUserRole } from "../user.type";

export type TUserGet = {
  createdAt: string;
  email: string;
  firstName: string;
  id: string;
  image: string;
  imagePublicId:string;
  isActive:boolean;
  isEmailVerified:boolean;
  role:IUserRole;
  updatedAt:string;
};

export interface IMeta{
  page: number,
  limit:number, 
  total:number | null,
  totalPage: number | null
}

export type TManageUser = {
  status: number;
  success: boolean;
  message: string;
  data: {
    data: TUserGet[];
    meta: IMeta;
  };
};








export type TUserQuery={
  search?: string;
  role?: IUserRole;
  isActive?:'ACTIVE' | 'BLOCKED' | undefined;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}




