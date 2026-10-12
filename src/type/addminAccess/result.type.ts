import { IUserRole } from "../user.type";
import { IMeta } from "./admin.access.type";

export interface IResultUser {
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

export interface IResultStudent {
  id: string;
  userId: string;
  departmentId: string;

  studentId: string | null;
  batch: number;
  semester: string | null;

  phone: string;
  address: string;
  dateOfBirth: string;

  gender: 'MALE' | 'FEMALE' | 'OTHER';

  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  isActive: boolean;

  createdAt: string;
  updatedAt: string;

  user: IResultUser;
}

export interface IResultEnrollment {
  id: string;
  studentId: string;
  courseOfferingId: string;

  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
  enrolledAt: string | null;

  createdAt: string;
  updatedAt: string;

  student: IResultStudent;
  // included by the admin results list
  courseOffering?: {
    section: string;
    course: { code: string; title: string; credit: number };
    semester: { name: string; year: number };
  };
}

export interface IResult {
  id: string;
  enrollmentId: string;

  marks: number;
  grade: string;
  gradePoint: number;

  published: boolean;

  createdAt: string;
  updatedAt: string;

  enrollment: IResultEnrollment;
}

export type TResultResponse = {
  status: number;
  success: boolean;
  message: string;
  data: {
    data:IResult[];
    meta: IMeta;
  };
};