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
    <div className="space-y-8">
      {/* Ultra-Modern Title & Subtitle Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-r from-background via-muted/30 to-background p-6 md:p-8 shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <GraduationCap className="h-4 w-4" /> Academic Catalog
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
              Explore Departments
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
              Choose an academic department to view available programs,
              curriculum details, and faculty offerings.
            </p>
          </div>
        </div>
      </div>

      {/* Grid Container */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {departments.map(department => {
          // Dynamic initial for department logo avatar
          const initial = department.name?.charAt(0)?.toUpperCase() || 'D';

          return (
            <Card
              key={department?.id}
              className="group relative flex flex-col justify-between overflow-hidden border border-border/60 bg-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30"
            >
              {/* Subtle accent bar on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Header */}
                <CardHeader className="space-y-4 pb-3 pt-6">
                  <div className="flex items-center justify-between">
                    {/* Department Icon Badge */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      {initial}
                    </div>

                    {/* Status Pill Badge with Pulsing Dot */}
                    <Badge
                      variant="outline"
                      className={`flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full border ${
                        department.isActive
                          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          department.isActive
                            ? 'bg-emerald-500 animate-pulse'
                            : 'bg-rose-500'
                        }`}
                      />
                      {department.isActive ? 'Open' : 'Closed'}
                    </Badge>
                  </div>

                  <CardTitle className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {department.name}
                  </CardTitle>
                </CardHeader>

                {/* Content */}
                <CardContent className="pb-4">
                  <CardDescription className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {department.description ||
                      'Discover programs, courses, and faculty details for this academic department.'}
                  </CardDescription>
                </CardContent>
              </div>

              {/* Action Button Footer */}
              <CardFooter className="pt-2 pb-6">
                <Button
                  className="w-full justify-between font-medium group/btn shadow-sm transition-all"
                  nativeButton={false}
                  render={<Link href={`/chose-department/${department.id}`} />}
                >
                  <span>View Department</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
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
