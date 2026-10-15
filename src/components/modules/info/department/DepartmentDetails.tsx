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
        <p className="text-sm text-muted-foreground animate-pulse">
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
        className="gap-2 text-muted-foreground hover:text-foreground"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Departments
      </Button>

      {/* Main Container Card */}
      <Card className="overflow-hidden border-border/60 shadow-lg">
        {/* Header Section with Subtle Gradient */}
        <CardHeader className="relative space-y-4 border-b border-border/50 bg-gradient-to-r from-muted/40 via-background to-muted/20 p-6 md:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                <Building2 className="h-4 w-4" /> Department Details
              </div>
              <CardTitle className="text-2xl font-extrabold tracking-tight sm:text-3xl text-foreground">
                {department?.name}
              </CardTitle>
            </div>

            {/* Status Badge */}
            <Badge
              variant="outline"
              className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${
                department?.isActive
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400'
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  department?.isActive
                    ? 'bg-emerald-500 animate-pulse'
                    : 'bg-rose-500'
                }`}
              />
              {department?.isActive ? 'Admission Open' : 'Admission Closed'}
            </Badge>
          </div>

          <CardDescription className="text-sm sm:text-base leading-relaxed text-muted-foreground max-w-3xl">
            {department?.description ||
              'Explore the curriculum, offered courses, and admission procedures for this academic department.'}
          </CardDescription>
        </CardHeader>

        {/* Courses Section */}
        <div className="p-6 md:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" /> Available Courses (
              {courses.length})
            </h2>
          </div>

          {/* Empty State */}
          {courses.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/70 p-10 text-center bg-muted/20">
              <Info className="h-10 w-10 text-muted-foreground/60 mb-2" />
              <p className="text-base font-semibold text-foreground">
                No courses available
              </p>
              <p className="text-sm text-muted-foreground max-w-md">
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
                  className="group flex flex-col justify-between rounded-xl border border-border/60 bg-card p-5 transition-all duration-200 hover:border-primary/40 hover:shadow-md"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold uppercase text-primary bg-primary/10 px-2 py-0.5 rounded">
                        {course.code || 'COURSE'}
                      </span>
                      {course.credit && (
                        <span className="text-xs text-muted-foreground font-medium">
                          {course.credit} Credits
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    {course.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
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
        <CardFooter className="flex flex-wrap gap-3 border-t border-border/50 bg-muted/20 p-6">
          {canApplyStudent && (
            <Dialog open={studentOpen} onOpenChange={setStudentOpen}>
              <DialogTrigger
                render={
                  <Button className="flex-1 gap-2 font-semibold shadow-sm">
                    <GraduationCap className="h-4 w-4" /> Apply as Student
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
                    className="flex-1 gap-2 font-semibold shadow-sm"
                  >
                    <UserCheck className="h-4 w-4" /> Apply as Teacher
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
              className="flex-1 gap-2 font-medium"
              nativeButton={false}
              render={<Link href="/application" />}
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> View My
              Application
            </Button>
          )}

          {role && role !== 'USER' && (
            <Button
              variant="outline"
              className="flex-1 gap-2 font-medium"
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
