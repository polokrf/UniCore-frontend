'use client'
import { ApplyStudentForm } from '@/components/Form/ApplyStudentForm';
import { ApplyTeacherForm } from '@/components/Form/ApplyTeacherForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { useSingleGetDepartment } from '@/hooks/department.hook';
import { useGetMe } from '@/hooks/auth.hook';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { dashboardPathFor } from '@/routes/dashboard';
import { TDepartment } from '@/type/depart.type';

import React, { useState } from 'react';

const DepartmentDetails = ({id}:{id:string}) => {
  const [studentOpen, setStudentOpen] = useState(false);
  const [teacherOpen, setTeacherOpen] = useState(false);
  const router = useRouter();
  const { data: me } = useGetMe();
  const role = me?.data.role;
  const studentApp = me?.data.studentProfile;
  const teacherApp = me?.data.teacherProfile;
  // a rejected applicant may apply again, but only for the same role
  const canApplyStudent =
    role === 'USER' && (!studentApp ? !teacherApp : studentApp.status === 'REJECTED');
  const canApplyTeacher =
    role === 'USER' && (!teacherApp ? !studentApp : teacherApp.status === 'REJECTED');
  const hasApplication = !!(studentApp || teacherApp);
  const goToApplication = () => router.push('/application');
  const {data}=useSingleGetDepartment(id)
     const department:TDepartment= data.data
     const cours = data.data.courses || []
  return (
    <section className="  md:max-w-4xl w-full mx-auto">
      <Card className=" p-2">
        <CardHeader className=" text-center">
          <div className=" text-right ">
            <span
              className={`${department.isActive ? 'text-green-400' : 'text-red-500'}`}
            >
              {department.isActive ? 'open' : 'close'}
            </span>
          </div>
          <CardTitle className=" text-xl  font-bold">
            {department.name}
          </CardTitle>
          <CardDescription>{department.description}</CardDescription>
        </CardHeader>

        <div>
          {cours.length === 0 && (
            <div className="text-center space-y-2  flex items-center  justify-center rounded-sm w-[50%] h-[100px] text-red-500 mx-auto">
              <p>any course not Available right now</p>
            </div>
          )}
        </div>

        <div className=" grid grid-cols-1 md:grid-cols-2 justify-center gap-3">
          {cours.map(c => (
            <CardContent
              key={c.id}
              className=" text-center space-y-2 shadow-sm  rounded-sm"
            >
              <div className=" text-right">
                <span
                  className={`${department.isActive ? 'text-green-400' : 'text-red-500'}`}
                >
                  {department.isActive ? 'open' : 'close'}
                </span>
              </div>
              <div>
                <h2 className=" text-sm font-semibold">{c.title}</h2>
                <p>{c.description}</p>
              </div>
            </CardContent>
          ))}
        </div>

        <CardFooter className="flex flex-wrap gap-2">
          {canApplyStudent && (
            <Dialog open={studentOpen} onOpenChange={setStudentOpen}>
              <DialogTrigger
                render={<Button className={'flex-1'}>Apply as Student</Button>}
              />
              <ApplyStudentForm
                departmentId={department.id}
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
                render={<Button className={'flex-1'}>Apply as Teacher</Button>}
              />
              <ApplyTeacherForm
                departmentId={department.id}
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
              className="flex-1"
              nativeButton={false}
              render={<Link href="/application" />}
            >
              View my application
            </Button>
          )}
          {role && role !== 'USER' && (
            <Button
              variant="outline"
              className="flex-1"
              nativeButton={false}
              render={<Link href={dashboardPathFor(role)} />}
            >
              Go to my dashboard
            </Button>
          )}
        </CardFooter>
      </Card>
    </section>
  );
};

export default DepartmentDetails;