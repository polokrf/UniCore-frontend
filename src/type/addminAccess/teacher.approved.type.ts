import { IUserRole } from '../user.type';
import { IMeta } from './admin.access.type';

export type TApprovedStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export interface ITeacherApplication {
  id: string;
  userId: string;
  departmentId: string;

  designation: string;
  employeeId: string | null;
  phone: string | null;
  qualification: string;
  specialization: string;
  bio: string;

  joiningDate: string | null;
  rejectionReason: string | null;

  status: TApprovedStatus;
  isActive: boolean;

  createdAt: string;
  updatedAt: string;

  department: IDepartment;
  user: ITeacherUser;
}

export interface IDepartment {
  id: string;
  name: string;
  code: string;
  description: string;

  isActive: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface ITeacherUser {
  id: string;
  firstName: string;
  email: string;

  image: string | '';
  imagePublicId: string | '';

  role: IUserRole;

  isActive: boolean;
  isEmailVerified: boolean;

  createdAt: string;
  updatedAt: string;
}

export type TApprovedTeacher = {
  status: number;
  success: boolean;
  message: string;
  data: {
    data: ITeacherApplication[];
    meta: IMeta;
  };
};

export interface ITeacherProfile {
  id: string;
  userId: string;
  departmentId: string;
  employeeId: string;
  designation: string;
  qualification: string;
  specialization: string;
  bio: string;
  phone: string;
  joiningDate: string;
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
  rejectionReason: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IGetSingleTeacherResponse {
  message: string;
  status: number;
  success: boolean;
  data: ITeacherProfile;
}