import AuthGard from '@/components/auth/AuthGard';
import { TooltipProvider } from '@/components/ui/tooltip';
import React, { ReactNode } from 'react';

const DashboardLayout = ({children}:{children:ReactNode}) => {
  return (
    <div>
      <AuthGard>
        <TooltipProvider>{children}</TooltipProvider>
      </AuthGard>
    </div>
  );
};

export default DashboardLayout;