'use client'
import { Separator } from '@/components/ui/separator';
import {
SidebarInset,
SidebarProvider,
SidebarTrigger,
} from '@/components/ui/sidebar';
import { DashboardSidebar } from './DashboardSidebar';
import { ReactNode } from 'react';
import { IUserRole } from '@/type/user.type';
import { Bell, Search } from 'lucide-react';
import Link from 'next/link';
import { useGetMe } from '@/hooks/auth.hook';
import Image from 'next/image';

interface IDashboardProps {
children: ReactNode;
userRole: IUserRole;
}

export default function DashboardShell({
children,
userRole,
}: IDashboardProps) {
  const {data}=useGetMe()
   const user = data?.data

return (
  <SidebarProvider>
    {' '}
    <DashboardSidebar userRole={userRole} />
    <SidebarInset className="min-w-0 bg-slate-50/70">
      <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur-xl md:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <SidebarTrigger className="-ml-1 rounded-lg hover:bg-slate-100" />

          <Separator orientation="vertical" className="hidden h-5 sm:block" />

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">
              UniCore Dashboard
            </p>
            <p className="text-xs text-slate-500">
              Manage your academic activities
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* <button
          type="button"
          aria-label="Search"
          className="hidden h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 sm:flex"
        >
          <Search className="h-[18px] w-[18px]" />
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <Bell className="h-[19px] w-[19px]" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-rose-500" />
        </button> */}

          <Separator orientation="vertical" className="h-8" />

          <Link
            href={`/${userRole.toLocaleLowerCase() === 'teacher' ? 'faculty' : userRole.toLocaleLowerCase()}`}
            className="group flex items-center gap-2.5 rounded-xl p-1.5 pr-2 transition hover:bg-slate-50 sm:gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white ring-2 ring-indigo-100 transition group-hover:ring-indigo-200">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt={user?.firstName ?? 'User'}
                  width={36}
                  height={36}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <span>{user?.firstName?.slice(0, 1).toUpperCase() ?? 'U'}</span>
              )}
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold leading-5 text-slate-800">
                My Profile
              </p>
              <p className="text-xs text-slate-500">UniCore Account</p>
            </div>
          </Link>
        </div>
      </header>

      <main className="min-w-0 flex-1 p-4 md:p-6 lg:p-8">{children}</main>
    </SidebarInset>
  </SidebarProvider>
);
}
