import AuthRoleGard from '@/components/auth/AuthRoleGard';
import DashboardShell from '@/components/dashboard/DashboardShell';
import React, { ReactNode } from 'react';

const AdminDashboard = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <AuthRoleGard roles={['SUPER_ADMIN', 'ADMIN']}>
        <DashboardShell userRole="ADMIN">
          <div className=" px-4 py-5"> {children}</div>
        </DashboardShell>
      </AuthRoleGard>
    </div>
  );
};

export default AdminDashboard;
