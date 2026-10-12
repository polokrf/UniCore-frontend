export interface ICourseOfferingPayload {
  courseId: string;
  semesterId: string;
  section: string;
  capacity: number;
  fee: number;
  // optional: assign the teacher in the same (atomic) request
  teacherId?: string;
}

interface ICourseOfferingCourse{
 
code:string,
createdAt:string,
credit:number,
departmentId:string,
description:string,
id:string,
isActive: boolean
title:string
updatedAt:string
}

export interface ICourseOffering {
  capacity: number;
  courseId: string;
  createdAt: string;
  fee: number;
  id: string;
  isActive: boolean;
  section: string;
  semesterId: string;
  course:ICourseOfferingCourse,
  teacherId: string | null;
  updatedAt: string;
}

export type TCourseOfferingGetResponse = {
  status: number;
  success: boolean;
  message: string;
  data:ICourseOffering[]
};