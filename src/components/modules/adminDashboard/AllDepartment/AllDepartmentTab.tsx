'use client'
import { useUrlEnumState, useUrlPageState, useUrlSearchState } from '@/hooks/use-url-list-state';

import React, { ChangeEvent, Suspense, useState } from 'react';
import AllDepartmentTable from './AllDepartmentTable';
import { SkeletonText } from '@/components/layout/loading/SkeletonText';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import useDebounced from '@/hooks/debounced';
import { TUserQuery } from '@/type/addminAccess/admin.access.type';
import { IDepartmentQuery } from '@/type/query.types';

const AllDepartmentTab = () => {
  const [tab, setTab] = useUrlEnumState<'ALL' | 'ACTIVE' | 'BLOCKED'>('status', 'ALL', ['ALL', 'ACTIVE', 'BLOCKED'] as const);
  
  const [search, setSearch] = useUrlSearchState();
  const [page, setPage] = useUrlPageState();

  const StatusList = [
    ['ALL', 'All'],
    ['ACTIVE', 'Active'],
    ['BLOCKED', 'Blocked'],
  ];

  
  const debouncedValue = useDebounced(search);
  const handleSearch = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    console.log('INPUT:', e.target.value);
    const searchValue = e.target.value;
    setSearch(searchValue.trim());
    setPage(1);
  };

  const queryParams: IDepartmentQuery = {
    page,
    limit:10,
    ...(debouncedValue ? { search: debouncedValue } : {}),
    ...(tab === 'ALL' ? {} : { isActive: tab }),
   
  };

  return (
    <div>
      <div className="flex md:flex-row flex-col  justify-between items-center gap-2">
        <div>
          <Tabs
            value={tab}
            onValueChange={value => setTab(value)}
            className="w-full"
          >
            <TabsList>
              {StatusList.map(([value, tab]) => (
                <TabsTrigger key={value} value={value}>
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="mb-3 ">
          <Input
            onChange={e => handleSearch(e)}
            value={search}
            type="search"
            placeholder="Search by name or email"
          />
        </div>
      </div>

      <Suspense fallback={<SkeletonText />}>
        <AllDepartmentTable {...queryParams} handleChangPage={setPage} />
      </Suspense>
    </div>
  );
};

export default AllDepartmentTab;