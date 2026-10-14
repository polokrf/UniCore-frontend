'use client';
import {
  useUrlEnumState,
  useUrlPageState,
  useUrlSearchState,
} from '@/hooks/use-url-list-state';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React, { ChangeEvent, Suspense } from 'react';
import { SkeletonText } from '@/components/layout/loading/SkeletonText';
import { TApprovedStatus } from '@/type/addminAccess/teacher.approved.type';
import { IEnrollmentQuery, ITeacherQuery } from '@/type/query.types';
import { Input } from '@/components/ui/input';
import useDebounced from '@/hooks/debounced';
import { EnrollmentTable } from './EnrollmentTable';
import { Search } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

const EnrollmentTab = () => {
  type TStatus = 'ALL' | 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  const [search, setSearch] = useUrlSearchState();
  const [page, setPage] = useUrlPageState();
  const [tab, setTab] = useUrlEnumState<
    'ALL' | 'PENDING' | 'CONFIRMED' | 'CANCELLED'
  >('status', 'ALL', ['ALL', 'PENDING', 'CONFIRMED', 'CANCELLED'] as const);

  const approvedStatus: [TStatus, string][] = [
    ['ALL', 'All'],
    ['PENDING', 'Pending'],
    ['CONFIRMED', 'Confirmed'],
    ['CANCELLED', 'Cancelled'],
  ];

  const searchDebouncing = useDebounced(search);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const seacherValue = e.target.value;
    setSearch(seacherValue.trim());
    setPage(1);
  };

  const queryParams: IEnrollmentQuery = {
    ...(searchDebouncing ? { search: searchDebouncing } : {}),
    ...(tab === 'ALL' ? {} : { status: tab }),
    page,
    limit: 10,
  };

  return (
    <Card className="w-full shadow-sm border border-slate-200/80 dark:border-slate-800 bg-card rounded-xl overflow-hidden">
      {/* Header with Title and Subtitle */}
      <CardHeader className="pb-4">
        <div>
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
            Enrollment Management
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground mt-1">
            Manage, filter, and review all student course enrollments in one
            place.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Search & Tabs Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-muted/40 p-3 rounded-lg border border-border/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={e => handleSearch(e)}
              type="search"
              placeholder="Search by email, name, course..."
              className="pl-9 bg-background focus-visible:ring-1 transition-all"
            />
          </div>

          {/* Tabs */}
          <div className="w-full sm:w-auto overflow-x-auto">
            <Tabs value={tab} className="w-full">
              <TabsList className="grid grid-cols-4 w-full sm:w-auto bg-background/80 border p-1 rounded-lg">
                {approvedStatus.map(([status, lable]) => (
                  <TabsTrigger
                    key={status}
                    onClick={() => setTab(status)}
                    value={status}
                    className="text-xs sm:text-sm font-medium transition-all"
                  >
                    {lable}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Enrollment Table Section */}
        <div className="rounded-md border border-border/60 overflow-hidden bg-background">
          <Suspense fallback={<SkeletonText />}>
            <EnrollmentTable handleChangPage={setPage} {...queryParams} />
          </Suspense>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnrollmentTab;
