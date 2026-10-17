'use client';

import { useGetMe } from '@/hooks/auth.hook';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';
import AuthLoading from './AuthLoading';

const LoginPageAuthGard = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { data, isPending, isError } = useGetMe();

  const isAuthenticated = !!data?.data?.email;

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated || isPending) {
    return <AuthLoading />;
  }

  if (isError) {
    return <>{children}</>;
  }

  return <>{children}</>;
};

export default LoginPageAuthGard;
