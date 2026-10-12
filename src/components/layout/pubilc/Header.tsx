'use client'
import { INavLink } from '@/type/header.type';
import React from 'react';
import Link from 'next/link';

import { useGetMe, useLogout } from '@/hooks/auth.hook';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import { IUserRole } from '@/type/user.type';
import { dashboardPathFor } from '@/routes/dashboard';


const Header = () => {

 const { data: me , isLoading } = useGetMe();
 const { mutate: logout } = useLogout();
 const queryClient = useQueryClient();

  if(isLoading){
    return <p>Loading...</p>
  }
   

 const role: IUserRole | undefined = me?.data.role;

 const dashboardPath = role ? dashboardPathFor(role) : '/login';
  
  const navLink: INavLink[] = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
   ...(me?.data ? [ {name:'Departments',path:"/chose-department"}] : []),
    ...(me?.data && role !== 'USER'
      ? [{ name: 'Dashboard', path: dashboardPath }]
      : []),
    ...(me?.data && role === 'USER'
      ? [{ name: 'My Application', path: '/application' }]
      : []),
  ];

   
   const handleLogout = () => {
     logout(undefined, {
       onSuccess: res => {
         toast.add({
           title: 'Tata',
           description: 'Logged out successfully',
           type: 'success',
         });
         queryClient.removeQueries({ queryKey: ['user'] });
       },
       onError: error => {
         console.log(error.message);
         toast.add({
           title: 'Logout failed',
           description: 'Something Went Wrong',
           type: 'error',
         });
       },
     });
   };
  return (
    <header className=" py-5 px-4 bg-accent shadow-sm flex justify-between items-center gap-3">
      <div></div>
      <nav className=" space-x-3">
        {navLink.map(nav => (
          <Link key={nav.path} href={nav.path}>
            {nav.name}{' '}
          </Link>
        ))}
      </nav>

      <div>
        {me ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <Button
            nativeButton={false}
            render={<Link href={'/login'}>Login</Link>}
          ></Button>
        )}
      </div>
    </header>
  );
};

export default Header;