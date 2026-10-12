'use client'
import { useGetMe} from '@/hooks/auth.hook';
import { IUserRole } from '@/type/user.type';

import React, { ReactNode, useEffect } from 'react';
import AuthLoading from './AuthLoading';
import AccessDenied from './AccessDenied';
import { useRouter } from 'next/navigation';



interface IAuthGardProps {
  children: ReactNode;
  roles:IUserRole[]
}

const AuthRoleGard = ({children,roles}:IAuthGardProps) => {
  const {data,isPending,isError}= useGetMe()
 
  const router =useRouter()
  const user = data?.data
  
   const isAuthorized = !!user && roles.includes(user.role);

  //  console.log(isAuthorized)

  useEffect(()=>{
    if(isPending){
      return
    }
    if(isError || !user){
      router.replace('/login')
    }
    
    

  },[isPending,isError,user,router])

  if(isPending){
   return <AuthLoading/>
  }
   
   if (isError || !user) {
     return <AuthLoading />;
   }

  if(isAuthorized){
    return <>{children}</>
  }
  
  return <AccessDenied/>

};

export default AuthRoleGard;