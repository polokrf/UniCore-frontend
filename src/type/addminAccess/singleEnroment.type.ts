export interface IEnrollment {
  id: string;
  studentId: string;
  courseOfferingId: string;
  status: string;
  enrolledAt: string | null;
  createdAt: string;
  updatedAt: string;
  courseOffering: ICourseOffering;
}

export interface ICourseOffering {
  id: string;
  courseId: string;
  semesterId: string;
  teacherId: string;
  section: string;
  capacity: number;
  fee: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  course: ICourse;
  semester: ISemester;
  teacher: ITeacher;
}

export interface ICourse {
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

export interface ITeacher {
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
  status: string;
  rejectionReason: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type TSingleEnrollments = {
  status: number;
  success: boolean;
  message: string;
  data: IEnrollment[];
};