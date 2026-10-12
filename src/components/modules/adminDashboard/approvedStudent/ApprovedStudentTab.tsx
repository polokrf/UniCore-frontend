'use client';
import { useUrlEnumState, useUrlPageState, useUrlSearchState } from '@/hooks/use-url-list-state';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React, { ChangeEvent, Suspense, useState } from 'react';

import { SkeletonText } from '@/components/layout/loading/SkeletonText';

import { IStudentQuery } from '@/type/query.types';
import { Input } from '@/components/ui/input';
import useDebounced from '@/hooks/debounced';

import { ApprovedStudentTable } from './ApprovedStudentTable';

const ApprovedStudentTab = () => {
  type TStatus = 'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED';
  const [search, setSearch] = useUrlSearchState();
  const [page, setPage] = useUrlPageState();

  const [tab, setTab] = useUrlEnumState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('status', 'ALL', ['ALL', 'PENDING', 'APPROVED', 'REJECTED'] as const);

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
    <div className=" space-y-4">
      <div className="flex md:flex-row flex-col justify-between items-center gap-3">
        <div>
          <Input
            value={search}
            onChange={e => handleSearch(e)}
            type="search"
            placeholder="search with email or phone number studentId etc.."
          />
        </div>
        {/* tabs */}
        <div>
          <Tabs value={tab}>
            <TabsList>
              {approvedStatus.map(([status, lable]) => (
                <TabsTrigger
                  key={status}
                  onClick={() => setTab(status)}
                  value={status}
                >
                  {lable}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div>
        <Suspense fallback={<SkeletonText />}>
          <ApprovedStudentTable handleChangPage={setPage} {...queryParams} />
        </Suspense>
      </div>
    </div>
  );
};

export default ApprovedStudentTab;
