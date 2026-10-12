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

export type TSemesterResponse = {
  status: number;
  success: boolean;
  message: string;
  data: ISemester[];
};

export interface ISemesterPayload {
  name: string;
  year: number;
  startDate: string;
  endDate: string;
}