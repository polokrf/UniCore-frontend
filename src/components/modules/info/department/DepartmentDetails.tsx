
'use client';

import { ApplyStudentForm } from '@/components/Form/ApplyStudentForm';
import { ApplyTeacherForm } from '@/components/Form/ApplyTeacherForm';
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
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { useGetMe } from '@/hooks/auth.hook';
import { useSingleGetDepartment } from '@/hooks/department.hook';
import { dashboardPathFor } from '@/routes/dashboard';
import { TDepartment } from '@/type/depart.type';
import {
  ArrowLeft,
  BookOpen,
  Building2,
  CheckCircle2,
  GraduationCap,
  Info,
  UserCheck,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const DepartmentDetails = ({ id }: { id: string }) => {
  const [studentOpen, setStudentOpen] = useState(false);
  const [teacherOpen, setTeacherOpen] = useState(false);

  const router = useRouter();
  const { data: me } = useGetMe();

  const role = me?.data?.role;
  const studentApp = me?.data?.studentProfile;
  const teacherApp = me?.data?.teacherProfile;

  // Application eligibility conditions
  const canApplyStudent =
    role === 'USER' &&
    (!studentApp ? !teacherApp : studentApp.status === 'REJECTED');

  const canApplyTeacher =
    role === 'USER' &&
    (!teacherApp ? !studentApp : teacherApp.status === 'REJECTED');

  const hasApplication = !!(studentApp || teacherApp);

  const goToApplication = () => router.push('/application');

  const { data, isLoading } = useSingleGetDepartment(id);

  const department: TDepartment | undefined = data?.data;
  const courses = data?.data?.courses || [];

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="animate-pulse text-sm text-blue-500">
          Loading department details...
        </p>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-5xl space-y-6 pb-10">
      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        className="gap-2 text-slate-500 transition-colors hover:bg-blue-50 hover:text-blue-700"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Departments
      </Button>

      {/* Main Container Card */}
      <Card className="overflow-hidden border border-blue-100/80 bg-white shadow-lg shadow-blue-100/40">

        {/* Header Section */}
        <CardHeader className="relative space-y-4 border-b border-blue-100 bg-gradient-to-r from-white via-sky-50/80 to-indigo-50/50 p-6 md:p-8">
          {/* Decorative Background */}
          <div className="pointer-events-none absolute -right-8 -top-12 h-40 w-40 rounded-full bg-sky-100/60 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
                <Building2 className="h-4 w-4" />
                Department Details
              </div>

              <CardTitle className="text-2xl font-extrabold tracking-tight text-blue-950 sm:text-3xl">
                {department?.name}
              </CardTitle>
            </div>

            {/* Status Badge */}
            <Badge
              variant="outline"
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${
                department?.isActive
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                  : 'border-rose-200 bg-rose-50 text-rose-700'
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  department?.isActive
                    ? 'animate-pulse bg-emerald-500'
                    : 'bg-rose-500'
                }`}
              />

              {department?.isActive
                ? 'Admission Open'
                : 'Admission Closed'}
            </Badge>
          </div>

          <CardDescription className="relative z-10 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
            {department?.description ||
              'Explore the curriculum, offered courses, and admission procedures for this academic department.'}
          </CardDescription>
        </CardHeader>

        {/* Courses Section */}
        <div className="space-y-4 p-6 md:p-8">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight text-blue-950">
              <BookOpen className="h-5 w-5 text-blue-600" />
              Available Courses ({courses.length})
            </h2>
          </div>

          {/* Empty State */}
          {courses.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-blue-200 bg-sky-50/50 p-10 text-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-blue-400 shadow-sm ring-1 ring-blue-100">
                <Info className="h-7 w-7" />
              </div>

              <p className="text-base font-semibold text-blue-950">
                No courses available
              </p>

              <p className="max-w-md text-sm text-slate-500">
                There are currently no active courses listed under this
                department. Check back later or contact administration.
              </p>
            </div>
          ) : (
            /* Courses Grid */
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {courses.map((course: any) => (
                <div
                  key={course.id}
                  className="group flex flex-col justify-between rounded-xl border border-blue-100 bg-white p-5 transition-all duration-300 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/60"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-md border border-blue-100 bg-blue-50 px-2 py-0.5 font-mono text-xs font-bold uppercase text-blue-700">
                        {course.code || 'COURSE'}
                      </span>

                      {course.credit && (
                        <span className="text-xs font-medium text-slate-500">
                          {course.credit} Credits
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-blue-950 transition-colors group-hover:text-blue-600">
                      {course.title}
                    </h3>

                    {course.description && (
                      <p className="line-clamp-2 text-xs leading-relaxed text-slate-500">
                        {course.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Application / Navigation Actions Footer */}
        <CardFooter className="flex flex-wrap gap-3 border-t border-blue-100 bg-sky-50/40 p-6">
          {canApplyStudent && (
            <Dialog open={studentOpen} onOpenChange={setStudentOpen}>
              <DialogTrigger
                render={
                  <Button className="flex-1 gap-2 bg-blue-600 font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md">
                    <GraduationCap className="h-4 w-4" />
                    Apply as Student
                  </Button>
                }
              />

              <ApplyStudentForm
                departmentId={department?.id || ''}
                onSuccess={() => {
                  setStudentOpen(false);
                  goToApplication();
                }}
              />
            </Dialog>
          )}

          {canApplyTeacher && (
            <Dialog open={teacherOpen} onOpenChange={setTeacherOpen}>
              <DialogTrigger
                render={
                  <Button
                    variant="secondary"
                    className="flex-1 gap-2 border border-indigo-100 bg-indigo-50 font-semibold text-indigo-700 shadow-sm transition-all hover:border-indigo-200 hover:bg-indigo-100"
                  >
                    <UserCheck className="h-4 w-4" />
                    Apply as Teacher
                  </Button>
                }
              />

              <ApplyTeacherForm
                departmentId={department?.id || ''}
                onSuccess={() => {
                  setTeacherOpen(false);
                  goToApplication();
                }}
              />
            </Dialog>
          )}

          {role === 'USER' && hasApplication && (
            <Button
              variant="outline"
              className="flex-1 gap-2 border-blue-200 bg-white font-medium text-blue-700 transition-colors hover:bg-blue-50 hover:text-blue-800"
              nativeButton={false}
              render={<Link href="/application" />}
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              View My Application
            </Button>
          )}

          {role && role !== 'USER' && (
            <Button
              variant="outline"
              className="flex-1 gap-2 border-blue-200 bg-white font-medium text-blue-700 transition-colors hover:bg-blue-50 hover:text-blue-800"
              nativeButton={false}
              render={<Link href={dashboardPathFor(role)} />}
            >
              Go to My Dashboard
            </Button>
          )}
        </CardFooter>
      </Card>
    </section>
  );
};

export default DepartmentDetails;

