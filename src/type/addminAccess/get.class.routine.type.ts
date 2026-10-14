
export type DayOfWeek =
  | "SATURDAY"
  | "SUNDAY"
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY";

export interface IClassRoutine {
  id: string;
  courseOfferingId: string;
  day: DayOfWeek;
  startTime: string;
  endTime: string;
  room: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;

  courseOffering: {
    id: string;
    courseId: string;
    semesterId: string;
    teacherId: string;
    section: string;
    capacity: number;
    fee: string;
    isActive: boolean;

    course: {
      id: string;
      code: string;
      title: string;
      description: string;
      credit: number;
      departmentId: string;
      isActive: boolean;
    };

    semester: {
      id: string;
      name: string;
      year: number;
      startDate: string;
      endDate: string;
      isActive: boolean;
    };

    teacher: {
      id: string;
      employeeId: string;
      designation: string;
      specialization: string;
      status: string;
      user: {
        firstName: string;
        email: string;
      };
    };
  };
}

export interface IClassRoutineUpdate {
  payload: {
    day?: DayOfWeek;
    startTime?: string;
    endTime?: string;
    room?: string;
  },
  id:string
}

