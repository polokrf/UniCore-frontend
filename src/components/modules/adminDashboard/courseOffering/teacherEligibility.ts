import { ITeacherApplication } from '@/type/addminAccess/teacher.approved.type';

// Same rule the backend enforces when assigning: approved, active, account not
// blocked, and in the course's department. The backend stays the authority;
// this only keeps the picker from offering people it would refuse.
export const isEligibleTeacher = (t: ITeacherApplication, departmentId?: string) =>
  !!departmentId &&
  t.status === 'APPROVED' &&
  t.isActive &&
  t.user.isActive &&
  t.departmentId === departmentId;

export const teacherLabel = (t: ITeacherApplication) =>
  `${t.user.firstName} · ${t.designation} (${t.department.code})`;
