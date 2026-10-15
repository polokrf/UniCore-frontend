
'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useGetDepartment } from '@/hooks/department.hook';
import { ArrowRight, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Department = () => {
  const { data } = useGetDepartment({});
  const departments = data?.data.data || [];

  return (
    <div className="my-6 space-y-8">
      {/* Title & Subtitle Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-r from-white via-sky-50/80 to-indigo-50/50 p-6 shadow-sm md:p-8">
        {/* Decorative Background */}
        <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-sky-100/70 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-1/3 h-36 w-36 rounded-full bg-indigo-100/50 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
              <GraduationCap className="h-4 w-4" />
              Academic Catalog
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-blue-950 sm:text-4xl">
              Explore Departments
            </h1>

            <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
              Choose an academic department to view available programs,
              curriculum details, and faculty offerings.
            </p>
          </div>
        </div>
      </div>

      {/* Department Grid */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {departments.map(department => {
          const initial = department.name?.charAt(0)?.toUpperCase() || 'D';

          return (
            <Card
              key={department?.id}
              className="group relative flex flex-col justify-between overflow-hidden border border-blue-100/80 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/70"
            >
              {/* Top Accent */}
              <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div>
                {/* Header */}
                <CardHeader className="space-y-4 pb-3 pt-6">
                  <div className="flex items-center justify-between">
                    {/* Department Initial */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-gradient-to-br from-sky-50 to-blue-100 text-lg font-bold text-blue-700 transition-all duration-300 group-hover:border-blue-200 group-hover:from-sky-500 group-hover:to-blue-600 group-hover:text-white">
                      {initial}
                    </div>

                    {/* Department Status */}
                    <Badge
                      variant="outline"
                      className={`flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                        department.isActive
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          : 'border-rose-200 bg-rose-50 text-rose-700'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          department.isActive
                            ? 'animate-pulse bg-emerald-500'
                            : 'bg-rose-500'
                        }`}
                      />

                      {department.isActive ? 'Open' : 'Closed'}
                    </Badge>
                  </div>

                  <CardTitle className="text-xl font-bold tracking-tight text-blue-950 transition-colors duration-300 group-hover:text-blue-600">
                    {department.name}
                  </CardTitle>
                </CardHeader>

                {/* Description */}
                <CardContent className="pb-4">
                  <CardDescription className="line-clamp-3 text-sm leading-relaxed text-slate-500">
                    {department.description ||
                      'Discover programs, courses, and faculty details for this academic department.'}
                  </CardDescription>
                </CardContent>
              </div>

              {/* Action Button */}
              <CardFooter className="pb-6 pt-2">
                <Button
                  className="group/btn w-full justify-between border border-blue-100 bg-blue-50 font-medium text-blue-700 shadow-none transition-all duration-300 hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                  nativeButton={false}
                  render={<Link href={`/chose-department/${department.id}`} />}
                >
                  <span>View Department</span>

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </section>
    </div>
  );
};

export default Department;

