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
import { IStudentQuery } from '@/type/query.types';
import { Search } from 'lucide-react';
import React, { ChangeEvent, Suspense } from 'react';
import { ApprovedStudentTable } from './ApprovedStudentTable';

const ApprovedStudentTab = () => {
  type TStatus = 'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED';
  const [search, setSearch] = useUrlSearchState();
  const [page, setPage] = useUrlPageState();

  const [tab, setTab] = useUrlEnumState<
    'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'
  >('status', 'ALL', ['ALL', 'PENDING', 'APPROVED', 'REJECTED'] as const);

  const approvedStatus: [TStatus, string][] = [
    ['ALL', 'All'],
    ['PENDING', 'Pending'],
    ['APPROVED', 'Approved'],
    ['REJECTED', 'Rejected'],
  ];

  const searchDebouncing = useDebounced(search);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const seacherValue = e.target.value;
    setSearch(seacherValue.trim());
    setPage(1);
  };

  const queryParams: IStudentQuery = {
    ...(searchDebouncing ? { search: searchDebouncing } : {}),
    ...(tab === 'ALL' ? {} : { status: tab }),
    page,
    limit: 10,
  };

  return (
    <div className="space-y-6">
      {/* Header Section with Title & Subtitle */}
      <div className="flex flex-col gap-1 border-b border-border/60 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Approved Students
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage, review, and filter student applications, academic profiles,
          and statuses.
        </p>
      </div>

      {/* Search and Tabs Filter Container */}
      <div className="flex flex-col gap-4 rounded-xl border border-border/60 bg-card/40 p-4 shadow-sm backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
        {/* Search Field */}
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={e => handleSearch(e)}
            type="search"
            placeholder="Search by email, phone, or student ID..."
            className="pl-9 transition-all focus-visible:ring-primary/30"
          />
        </div>

        {/* Tabs Filter */}
        <div className="w-full sm:w-auto">
          <Tabs value={tab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-muted/60 p-1 sm:w-auto">
              {approvedStatus.map(([status, lable]) => (
                <TabsTrigger
                  key={status}
                  onClick={() => setTab(status)}
                  value={status}
                  className="text-xs font-medium transition-all"
                >
                  {lable}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Table Section */}
      <div>
        <Suspense fallback={<SkeletonText />}>
          <ApprovedStudentTable handleChangPage={setPage} {...queryParams} />
        </Suspense>
      </div>
    </div>
  );
};

export default ApprovedStudentTab;
