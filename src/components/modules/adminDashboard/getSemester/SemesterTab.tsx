'use client';
import {
  useUrlEnumState,
  useUrlPageState,
  useUrlSearchState,
} from '@/hooks/use-url-list-state';
import React, { ChangeEvent, Suspense } from 'react';

import { SkeletonText } from '@/components/layout/loading/SkeletonText';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import useDebounced from '@/hooks/debounced';
import {  IQuery } from '@/type/query.types';
import { Search, Building2 } from 'lucide-react';
import SemesterTable from './SemesterTable';


const SemesterTab = () => {
  const [tab, setTab] = useUrlEnumState<'ALL' | 'ACTIVE' | 'BLOCKED'>(
    'status',
    'ALL',
    ['ALL', 'ACTIVE', 'BLOCKED'] as const,
  );
  const [search, setSearch] = useUrlSearchState();
  const [page, setPage] = useUrlPageState();

  const StatusList = [
    ['ALL', 'All'],
    ['ACTIVE', 'Active'],
    ['BLOCKED', 'Blocked'],
  ];

  const debouncedValue = useDebounced(search);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('INPUT:', e.target.value);
    const searchValue = e.target.value;
    setSearch(searchValue.trim());
    setPage(1);
  };

  const queryParams: IQuery = {
    page,
    limit: 10,
    ...(debouncedValue ? { search: debouncedValue } : {}),
    ...(tab === 'ALL' ? {} : { isActive: tab }),
  };

  return (
    <div className="space-y-6">
      {/* Header Section with Title & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Building2 className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Semester Management
            </h1>
          </div>
          <p className="text-sm text-muted-foreground pl-10 md:pl-0">
            Manage your organization's Semester, monitor active status, and
            update details.
          </p>
        </div>
      </div>

      {/* Filter and Search Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <Tabs
          value={tab}
          onValueChange={value => setTab(value)}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid w-full grid-cols-3 sm:w-auto">
            {StatusList.map(([value, tabLabel]) => (
              <TabsTrigger key={value} value={value} className="px-4">
                {tabLabel}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            onChange={e => handleSearch(e)}
            value={search}
            type="search"
            placeholder="Search by name or email..."
            className="pl-9"
          />
        </div>
      </div>

      {/* Table Section */}
      <Suspense fallback={<SkeletonText />}>
        <SemesterTable {...queryParams} handleChangPage={setPage} />
      </Suspense>
    </div>
  );
};

export default SemesterTab;
