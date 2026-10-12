import AuthRoleGard from '@/components/auth/AuthRoleGard';
import DashboardShell from '@/components/dashboard/DashboardShell';
import React, { ReactNode } from 'react';

const StudentDashboard = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <AuthRoleGard roles={['STUDENT']}>
        <DashboardShell userRole="STUDENT">
          <div className=" px-4 py-5"> {children}</div>
        </DashboardShell>
      </AuthRoleGard>
    </div>
  );
};

export default StudentDashboard;
