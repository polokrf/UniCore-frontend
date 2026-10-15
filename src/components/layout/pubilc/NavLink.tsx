'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react';

interface NavLinkProps {
  children: ReactNode;
  href: string;
}

const NavLink = ({ children, href }: NavLinkProps) => {
  const pathname = usePathname();

  const isActive =
    pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={`inline-flex items-center rounded-lg px-3 py-2 text-sm transition-colors duration-200 ${
        isActive
          ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
      }`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
