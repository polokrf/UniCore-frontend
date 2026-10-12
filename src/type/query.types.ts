import { TApprovedStatus } from './addminAccess/teacher.approved.type';

export interface ITeacherQuery {
  search?: string | undefined;
  status?: TApprovedStatus | undefined;
  isActive?: boolean | undefined;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface IStudentQuery {
  search?: string | undefined;
  status?: TApprovedStatus;
  batch?: number;
  semester?: number;
  isActive?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface IEnrollmentQuery {
  search?: string;
  status?: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface IResultQuery {
  search?: string;
  published?: string;
  sortBy?: 'createdAt' | 'marks' | 'gradePoint';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface IDepartmentQuery {
  search?: string | undefined;
  isActive?: string | undefined;
  page?: number;
  limit?: number;
}