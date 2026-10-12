import RegisterForm from '@/components/Form/RegisterForm';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import React from 'react';

const RegisterPage = () => {
  return (
    <div className="flex flex-col justify-center items-center p-4 min-h-screen">
      <Card className="sm:p-4 p-2">
        <div>
          <CardTitle className=" text-center">Register Now!</CardTitle>
          <CardDescription className=" text-center">
            {' '}
            plz create a new account and join our community
          </CardDescription>
        </div>

         <RegisterForm/>
      </Card>
    </div>
  );
};

export default RegisterPage;