// Shared shapes that match the backend `response()` helper:
// { status, success, message, data?, meta? }

export type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type TApiResponse<T> = {
  status: number;
  success: boolean;
  message: string;
  data: T;
};

export type TPaginatedResponse<T> = TApiResponse<T[]> & { meta: TMeta };

export type TRole =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'DEPARTMENT_HEAD'
  | 'TEACHER'
  | 'STUDENT'
  | 'USER';

export type TDay =
  | 'SATURDAY'
  | 'SUNDAY'
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY';

export type TGrade =
  | 'A_PLUS'
  | 'A'
  | 'A_MINUS'
  | 'B_PLUS'
  | 'B'
  | 'B_MINUS'
  | 'C_PLUS'
  | 'C'
  | 'D'
  | 'F';

export type TProfileStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type TEnrollmentStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED';
export type TPaymentStatus =
  | 'UNPAID'
  | 'PENDING'
  | 'PAID'
  | 'FAILED'
  | 'REFUNDED'
  | 'CANCELLED';

// ---- request payloads (mirror the backend zod schemas) ----
export type TDepartmentUpdatePayload = {
  id: string;
  name?: string;
  code?: string;
  description?: string;
  isActive?: boolean;
};

export type TTeacherProfileUpdatePayload = {
  phone?: string;
  qualification?: string;
  specialization?: string;
  bio?: string;
};

export type TStudentProfileUpdatePayload = {
  phone?: string;
  address?: string;
};

export type TCourseUpdatePayload = {
  code?: string;
  title?: string;
  description?: string;
  credit?: number;
};

export type TSemesterUpdatePayload = {
  name?: string;
  year?: number;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
};

export type TOfferingUpdatePayload = {
  section?: string;
  capacity?: number;
  isActive?: boolean;
};

export type TRoutineUpdatePayload = {
  day?: TDay;
  startTime?: string; // HH:mm
  endTime?: string; // HH:mm
  room?: string;
};

// PATCH /api/results/:id  (at least one field)
export type TResultUpdatePayload = {
  marks?: number;
  grade?: TGrade;
  gradePoint?: number;
  published?: boolean;
};

export type TResultCreatePayload = {
  enrollmentId: string;
  marks: number;
  grade: TGrade;
  gradePoint: number;
};

// ---- loosely typed entities (backend returns Prisma rows, optionally with includes) ----
export type TEntity = Record<string, unknown> & { id: string };

export type TBkashCheckout = {
  paymentID?: string;
  bkashURL?: string;
  callbackURL?: string;
  merchantInvoiceNumber?: string;
  statusCode?: string;
  statusMessage?: string;
};

// GET /api/course-offering/:id/roster  (TEACHER of that offering, or ADMIN)
export type TRosterRow = {
  id: string; // enrollment id
  status: 'PENDING' | 'CONFIRMED';
  enrolledAt: string | null;
  student: {
    id: string;
    studentId: string | null;
    batch: number;
    semester: number | null;
    user: { firstName: string; email: string; image: string | null };
  };
};
export type TRoster = {
  offering: {
    id: string;
    section: string;
    capacity: number | null;
    course: { code: string; title: string; credit: number };
    semester: { name: string; year: number };
  };
  summary: { capacity: number | null; confirmed: number; pending: number; total: number };
  data: TRosterRow[];
  meta: TMeta;
};
export type TRosterQuery = { page?: number; limit?: number; search?: string; status?: string };
