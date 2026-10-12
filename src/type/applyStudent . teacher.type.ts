export type TStudentPayload = {
  departmentId: string;
  batch: number;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
};

export type TTeacher= {
  departmentId: string;
  designation: string;
  phone: string;
  qualification: string;
  specialization: string;
  bio: string;
}