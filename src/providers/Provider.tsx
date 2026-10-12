'use client'
import React, { ReactNode } from 'react';
import QueryProvider from './QueryProvider';

const Provider = ({children}:{children:ReactNode}) => {
  return (
    <div>
      <QueryProvider>{children}</QueryProvider>
    </div>
  );
};

export default Provider;