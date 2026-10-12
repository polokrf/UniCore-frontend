export type IUserRole =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  
  | 'TEACHER'
  | 'STUDENT'
  | 'USER'


  export type TUser = {
    createdAt: string;
    email: string;
    firstName:string;
    id:string;
    image:string | null;
    imagePublicId: string | null;
    isActive:boolean;
    isEmailVerified: boolean;
    role:IUserRole;
    updatedAt:string;
    studentProfile?: TApplication | null;
    teacherProfile?: (TApplication & { rejectionReason?: string | null }) | null;
  };
  export type TApplication = {
    id: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    createdAt: string;
    department: { name: string; code: string };
  };

  export type IUserResponse={
    status:number,
    success:boolean,
    message:string,
    data:TUser
  }