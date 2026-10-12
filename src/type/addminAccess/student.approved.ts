import { IUserRole } from '../user.type';
import { IMeta } from './admin.access.type';
import { TApprovedStatus } from './teacher.approved.type';

export interface IDepartment {
  id: string;
  name: string;
  code: string;
  description: string | null;

  isActive: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface IStudentUser {
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

export interface IStudent {
  id: string;
  userId: string;
  departmentId: string;

  studentId: string | null;
  batch: number | null;
  semester: string | null;

  phone: string | null;
  address: string | null;
  dateOfBirth: string | null;
  gender: 'MALE' | 'FEMALE' | 'OTHER' | null;

  status: TApprovedStatus;
  isActive: boolean;

  createdAt: string;
  updatedAt: string;

  department: IDepartment;
  user: IStudentUser;
}

export type TApprovedStudent = {
  status: number;
  success: boolean;
  message: string;
  data: {
    data: IStudent[];
    meta: IMeta;
  };
};

export type StudentStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface IStudentProfile {
  id: string;
  userId: string;
  departmentId: string;
  studentId: string | null;
  batch: number | null;
  semester: number | null;
  phone: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  address: string | null;
  status: StudentStatus;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type TApprovedSingleStudentResponse = {
  status: number;
  success: boolean;
  message: string;
  data:IStudentProfile
};