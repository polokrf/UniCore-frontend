'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
BookOpen,
GraduationCap,
LogOut,
PanelLeft,
ShieldCheck,
} from 'lucide-react';
import { toast } from 'sonner';

import {
Sidebar,
SidebarContent,
SidebarGroup,
SidebarGroupContent,
SidebarGroupLabel,
SidebarHeader,
SidebarMenu,
SidebarMenuButton,
SidebarMenuItem,
SidebarRail,
SidebarFooter,
} from '@/components/ui/sidebar';

import { IUserRole } from '@/type/user.type';
import { adminRoutes } from '@/routes/admin.routes';
import { studentRoutes } from '@/routes/student.routes';
import { teacherRoutes } from '@/routes/teacher.routes';
import { IRoutes } from '@/type/route.type';
import { useLogout } from '@/hooks/auth.hook';
import { useQueryClient } from '@tanstack/react-query';

const dashboardRoutes: Partial<Record<IUserRole, IRoutes>> = {
ADMIN: adminRoutes,
STUDENT: studentRoutes,
TEACHER: teacherRoutes,
};

export function DashboardSidebar({
userRole,
}: {
userRole: IUserRole;
}) {
const path = usePathname();
const router = useRouter();

const { mutateAsync: logout } = useLogout();
const [isLoggingOut, setIsLoggingOut] = React.useState(false);
const queryClient=useQueryClient()

const routes: IRoutes = dashboardRoutes[userRole] ?? {
navMain: [],
};

const handleLogout = async () => {
if (isLoggingOut) return;


setIsLoggingOut(true);

try {
  
  await logout()
  toast.success('Logged out successfully');
  queryClient.removeQueries({ queryKey: ['user'] });

  router.replace('/');
  router.refresh();
} catch {
  toast.error('Unable to log out. Please try again.');
} finally {
  setIsLoggingOut(false);
}


};

return ( <Sidebar
   collapsible="icon"
   className="border-r border-slate-200 bg-white"
 > <SidebarHeader className="border-b border-slate-100 p-4"> <Link
       href="/"
       className="flex items-center gap-3 rounded-xl p-1 transition hover:bg-slate-50"
     > <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200/60"> <GraduationCap className="h-6 w-6" /> </div>


      <div className="grid flex-1 text-left group-data-[collapsible=icon]:hidden">
        <span className="text-lg font-bold tracking-tight text-slate-900">
          Uni<span className="text-indigo-600">Core</span>
        </span>
        <span className="text-xs text-slate-500">
          University Management
        </span>
      </div>
    </Link>
  </SidebarHeader>

  <SidebarContent className="gap-2 px-3 py-5">
    <div className="mb-2 rounded-xl bg-gradient-to-r from-indigo-50 to-violet-50 p-3 group-data-[collapsible=icon]:hidden">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 text-indigo-600" />

        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
          {userRole.replace('_', ' ')} Portal
        </span>
      </div>

      <p className="mt-1 text-xs text-slate-500">
        Manage your workspace
      </p>
    </div>

    {routes.navMain.map((group) => (
      <SidebarGroup key={group.title} className="px-0">
        <SidebarGroupLabel className="px-3 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
          {group.title}
        </SidebarGroupLabel>

        <SidebarGroupContent>
          <SidebarMenu className="gap-1">
            {group.items.map((item) => {
              const isActive =
                path === item.url ||
                (item.url !== '/dashboard' &&
                  item.url !== '#' &&
                  path.startsWith(`${item.url}/`));

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    render={<Link href={item.url} />}
                    isActive={isActive}
                    tooltip={item.title}
                    className={`h-10 rounded-xl px-3 text-sm transition-all duration-200 ${
                      isActive
                        ? 'bg-indigo-600 font-semibold text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 hover:text-white'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                    }`}
                  >
                    <BookOpen className="h-[18px] w-[18px] shrink-0" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    ))}
  </SidebarContent>

  <SidebarFooter className="border-t border-slate-100 p-3">
    <div className="mb-2 flex items-center gap-3 rounded-xl bg-slate-50 p-3 group-data-[collapsible=icon]:hidden">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
        {userRole.charAt(0)}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-800">
          {userRole.replace('_', ' ')}
        </p>
        <p className="text-xs text-slate-500">Active account</p>
      </div>

      <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
    </div>

    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={handleLogout}
          disabled={isLoggingOut}
          tooltip="Logout"
          className="h-10 cursor-pointer rounded-xl px-3 text-rose-600 transition hover:bg-rose-50 hover:text-rose-700"
        >
          <LogOut className="h-[18px] w-[18px] shrink-0" />

          <span>
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarFooter>

  <SidebarRail />
</Sidebar>


);
}
