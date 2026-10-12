import { TDay, TEnrollmentStatus, TGrade, TProfileStatus } from './api.type';

export type TCourse = {
  id: string;
  departmentId: string;
  code: string;
  title: string;
  description: string | null;
  credit: number;
  isActive: boolean;
};

export type TSemester = {
  id: string;
  name: string;
  year: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
};

export type TTeacherProfile = {
  id: string;
  userId: string;
  departmentId: string;
  employeeId: string | null;
  designation: string;
  phone: string | null;
  qualification: string | null;
  specialization: string | null;
  bio: string | null;
  joiningDate?: string | null;
  status: TProfileStatus;
  isActive: boolean;
  user?: { firstName: string; email: string; image?: string | null };
};

// Prisma Decimal columns come over the wire as strings ("5000").
// GET /api/course-offering only includes `course`.
export type TOffering = {
  id: string;
  courseId: string;
  semesterId: string;
  teacherId: string | null;
  section: string;
  capacity: number | null;
  fee: string | null;
  isActive: boolean;
  course?: TCourse;
  semester?: TSemester;
  teacher?: TTeacherProfile | null;
};

// Offering as embedded in /enrolment and /class-routine responses.
export type TOfferingFull = Omit<TOffering, 'course' | 'semester' | 'teacher'> & {
  course: TCourse;
  semester: TSemester;
  teacher: (TTeacherProfile & { user: { firstName: string; email: string } }) | null;
};

export type TMyEnrollment = {
  id: string;
  studentId: string;
  courseOfferingId: string;
  status: TEnrollmentStatus;
  enrolledAt: string | null;
  createdAt: string;
  updatedAt: string;
  courseOffering: TOfferingFull;
};

// GET /api/results carries no course info; join on enrollmentId.
export type TMyResult = {
  id: string;
  enrollmentId: string;
  marks: number;
  grade: TGrade;
  gradePoint: number;
  published: boolean;
};

export type TRoutine = {
  id: string;
  courseOfferingId: string;
  day: TDay;
  startTime: string;
  endTime: string;
  room: string;
  isActive: boolean;
  courseOffering: TOfferingFull;
};

export type TStudentProfile = {
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
  status: TProfileStatus;
};
