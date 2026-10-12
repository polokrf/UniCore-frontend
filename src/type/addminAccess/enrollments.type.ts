import type { IResult } from "./result.type";
import { IUserRole } from '../user.type';
import { IMeta } from './admin.access.type';
import { TApprovedStatus } from './teacher.approved.type';

export type TGender = 'MALE' | 'FEMALE' | 'OTHER';

export interface IBkashGatewayResponse {
  amount: string;
  currency: string;

  customerMsisdn: string;
  payerAccount: string;
  payerReference: string;
  payerType: string;

  intent: string;

  maxRefundableAmount: string;

  merchantInvoiceNumber: string;

  paymentExecuteTime: string;
  paymentID: string;

  statusCode: string;
  statusMessage: string;

  transactionStatus: string;
  trxID: string;
}

export interface IPayment {
  id: string;
  enrollmentId: string;

  amount: string;
  currency: 'BDT';

  gateway: 'BKASH';

  merchantInvoiceNumber: string;

  payerReference: string;
  bkashPaymentId: string | null;
  bkashTrxId: string | null;

  status: 'UNPAID' | 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED' | 'CANCELLED';

  paidAt: string | null;

  gatewayResponse: IBkashGatewayResponse | null;

  createdAt: string;
  updatedAt: string;
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

export interface IUser {
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

export interface IEnrollmentStudent {
  id: string;
  userId: string;
  departmentId: string;

  studentId: string | null;
  batch: number;
  semester: string | null;

  phone: string;
  address: string;
  dateOfBirth: string;

  gender: TGender;

  status: TApprovedStatus;
  isActive: boolean;

  createdAt: string;
  updatedAt: string;

  department: IDepartment;
  user: IUser;
}

export interface ITeacher {
  id: string;
  userId: string;
  departmentId: string;

  designation: string;
  employeeId: string | null;
  phone: string;

  qualification: string;
  specialization: string;
  bio: string;

  joiningDate: string | null;
  rejectionReason: string | null;

  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  isActive: boolean;

  createdAt: string;
  updatedAt: string;

  user: IUser;
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

export interface ICourse {
  id: string;
  title: string;
  code: string;
  description: string;

  credit: number;
  departmentId: string;

  isActive: boolean;

  createdAt: string;
  updatedAt: string;
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

export interface IEnrollment {
  id: string;
  studentId: string;
  courseOfferingId: string;

  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  enrolledAt: string | null;

  createdAt: string;
  updatedAt: string;

  student: IEnrollmentStudent;
  courseOffering: ICourseOffering;

  // one payment per enrollment (null until a payment is started)
  payments: IPayment | null;
  // the published/unpublished result, if the admin entered one
  result?: IResult | null;
}





export type TEnrollments = {
  status: number;
  success: boolean;
  message: string;
  data: {
    data: IEnrollment[];
    meta: IMeta;
  };
};


