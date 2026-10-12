'use client'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetDepartment } from '@/hooks/department.hook';
import { TDepartment, TDepartmentResponse } from '@/type/depart.type';
import Link from 'next/link';
import React from 'react';

const Department = () => {
  const {data} = useGetDepartment({}) ;
  const departments = data?.data.data || []
    
  return (
    <section className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {departments.map(department => (
        <Card key={department?.id}>
          <CardHeader className=" text-center">
            <div className={`text-right ${department.isActive ? 'text-green-400' :'text-red-500'}`}>
              <span>{department.isActive ? 'open' : 'close'}</span>
            </div>
            <CardTitle>{department.name}</CardTitle>
          </CardHeader>

          <CardContent className=" text-center space-y-2">
            <p>{department.description}</p>

            <CardFooter>
              <Button
                className="w-full"
                nativeButton={false}
                render={<Link href={`/chose-department/${department.id}`} />}
              >
                View
              </Button>
            </CardFooter>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};

export default Department;