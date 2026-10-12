'use client';

import { SkeletonText } from '@/components/layout/loading/SkeletonText';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useDebounced from '@/hooks/debounced';
import {
  useUrlEnumState,
  useUrlPageState,
  useUrlSearchState,
} from '@/hooks/use-url-list-state';
import { TUserQuery } from '@/type/addminAccess/admin.access.type';
import { Search } from 'lucide-react';
import { ChangeEvent, Suspense } from 'react';
import { UserManageTable } from './UserManageTable';

export function ManageUserTab() {
  const [tab, setTab] = useUrlEnumState<'ALL' | 'ACTIVE' | 'BLOCKED'>(
    'status',
    'ALL',
    ['ALL', 'ACTIVE', 'BLOCKED'] as const,
  );
  const [roleTab, setRoleTab] = useUrlEnumState<
    'ALL' | 'STUDENT' | 'TEACHER' | 'USER'
  >('role', 'ALL', ['ALL', 'STUDENT', 'TEACHER', 'USER'] as const);
  const [search, setSearch] = useUrlSearchState();
  const [page, setPage] = useUrlPageState();

  const StatusList = [
    ['ALL', 'All Status'],
    ['ACTIVE', 'Active'],
    ['BLOCKED', 'Blocked'],
  ];

  const roleList = [
    ['ALL', 'All Roles'],
    ['STUDENT', 'Student'],
    ['TEACHER', 'Teacher'],
    ['USER', 'User'],
  ];

  const debouncedValue = useDebounced(search);
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('INPUT:', e.target.value);
    const searchValue = e.target.value;
    setSearch(searchValue.trim());
    setPage(1);
  };

  const queryParams: TUserQuery = {
    page,
    limit: 10,
    ...(debouncedValue ? { search: debouncedValue } : {}),
    ...(tab === 'ALL' ? {} : { isActive: tab }),
    ...(roleTab === 'ALL' ? {} : { role: roleTab }),
  };

  return (
    <div className="space-y-6">
      {/* Header Section: Title & Subtitle */}
      <div className="flex flex-col gap-1 border-b border-border/60 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          User Management
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage system users, view activity status, and control user
          permissions.
        </p>
      </div>

      {/* Control & Filter Panel */}
      <div className="flex flex-col gap-4 rounded-xl border border-border/60 bg-card/40 p-4 shadow-sm backdrop-blur-sm">
        {/* Search Bar */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            onChange={handleSearch}
            value={search}
            type="search"
            placeholder="Search by name or email..."
            className="pl-9 transition-all focus-visible:ring-primary/30"
          />
        </div>

        {/* Filters Row */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">
              Status:
            </span>
            <Tabs
              value={tab}
              onValueChange={value => setTab(value)}
              className="w-full sm:w-auto"
            >
              <TabsList className="bg-muted/60 p-1">
                {StatusList.map(([value, label]) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className="text-xs font-medium transition-all"
                  >
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Role Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">
              Role:
            </span>
            <Tabs
              value={roleTab}
              onValueChange={value => setRoleTab(value)}
              className="w-full sm:w-auto"
            >
              <TabsList className="bg-muted/60 p-1">
                {roleList.map(([value, label]) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className="text-xs font-medium transition-all"
                  >
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <Suspense fallback={<SkeletonText />}>
        <UserManageTable {...queryParams} handleChangPage={setPage} />
      </Suspense>
    </div>
  );
}
