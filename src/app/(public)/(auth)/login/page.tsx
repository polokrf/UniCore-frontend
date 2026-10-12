import DemoLogin from '@/components/Form/DemoLogin';
import LoginForm from '@/components/Form/LoginForm';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import React from 'react';

const LoginPage = () => {
  return (
    <div className=" flex flex-col justify-center items-center p-4 min-h-screen">
      <Card className=" w-full max-w-md p-4">
        <div className=" text-center">
          <h1 className=" text-xl font-bold">Welcome Back!</h1>
          <p>Plz login now , you give your email and password</p>
        </div>

        <LoginForm />
        <DemoLogin />

        <div className=' text-center'>
          <p>
            you have no account{' '}
            <Link href={'/register'} className=" text-blue-500">
              register now
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;