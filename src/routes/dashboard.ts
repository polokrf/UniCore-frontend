import { IUserRole } from '@/type/user.type';

// Where each role lands after login / from the header "Dashboard" link.
// USER (applied but not yet approved) has no dashboard.
export const dashboardPathFor = (role?: IUserRole): string => {
  switch (role) {
    case 'ADMIN':
    case 'SUPER_ADMIN':
      return '/admin';
    case 'TEACHER':
      return '/faculty';
    case 'STUDENT':
      return '/student';
    default:
      return '/';
  }
};
