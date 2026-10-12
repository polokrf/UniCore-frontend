'use client'

import * as React from 'react';


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
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { IUserRole } from '@/type/user.type';
import { usePathname } from 'next/navigation';
import { adminRoutes } from '@/routes/admin.routes';
import { studentRoutes } from '@/routes/student.routes';
import { teacherRoutes } from '@/routes/teacher.routes';
import { IRoutes, TDashboardRoutes } from '@/type/route.type';

// This is sample data.
const data = {
  
  navMain: [
    {
      title: 'Getting Started',
      url: '#',
      items: [
        {
          title: 'Installation',
          url: '#',
        },
        {
          title: 'Project Structure',
          url: '#',
        },
      ],
    },
 
    
  ],
};



const dashboardRoutes: Partial<Record<IUserRole, IRoutes>> = {
  ADMIN: adminRoutes,
  STUDENT: studentRoutes,
  TEACHER: teacherRoutes,
};

export function DashboardSidebar({ userRole }: { userRole: IUserRole }) {
   
  const path =usePathname()

  const routes :IRoutes = dashboardRoutes[userRole] ?? {
    navMain:[]
  }
  return (
    <Sidebar>
      <SidebarHeader>
        <h1>UniCore</h1>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routes.navMain.map(item => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map(item => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={<Link href={item.url}> {item.title}</Link>}
                      isActive={path === item.url}
                    ></SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
