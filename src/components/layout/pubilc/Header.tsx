
'use client';

import { INavLink } from '@/type/header.type';
import React, { useState } from 'react';
import Link from 'next/link';
import { useGetMe, useLogout } from '@/hooks/auth.hook';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import { IUserRole } from '@/type/user.type';
import { dashboardPathFor } from '@/routes/dashboard';
import NavLink from './NavLink';
import {
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  UserRound,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const { data: me, isLoading } = useGetMe();
  const { mutate: logout } = useLogout();
  const queryClient = useQueryClient();
  const router = useRouter()

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (isLoading) {
    return (
      <header className="px-4 py-5">
        <p>Loading...</p>
      </header>
    );
  }

  const user = me?.data;
  const role: IUserRole | undefined = user?.role;
  const dashboardPath = role ? dashboardPathFor(role) : '/login';

  const navLink: INavLink[] = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Faq', path: '/faq' },
    { name: 'Contact', path: '/contact' },
    ...(user ? [{ name: 'Departments', path: '/chose-department' }] : []),
   
    ...(user && role === 'USER'
      ? [{ name: 'My Application', path: '/application' }]
      : []),
  ];

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.add({
          title: 'Tata',
          description: 'Logged out successfully',
          type: 'success',
        });

        queryClient.removeQueries({ queryKey: ['user'] });
        router.refresh()

        setIsProfileOpen(false);
        setIsMobileMenuOpen(false);
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

  // Support common profile image property names.
  const profileImage =
    (user as typeof user & {
      image?: string;
      profileImage?: string;
      photoURL?: string;
      avatar?: string;
    })?.image ??
    (user as typeof user & {
      profileImage?: string;
    })?.profileImage ??
    (user as typeof user & {
      photoURL?: string;
    })?.photoURL ??
    (user as typeof user & {
      avatar?: string;
    })?.avatar;

  const displayName =
    (user as typeof user & {
      name?: string;
    })?.name ||
    (user as typeof user & {
      firstName?: string;
    })?.firstName ||
    user?.email ||
    'User';

  const initial = displayName.charAt(0).toUpperCase();

  const ProfileButton = () => (
    <button
      type="button"
      onClick={() => setIsProfileOpen(prev => !prev)}
      aria-label="Open profile menu"
      aria-expanded={isProfileOpen}
      className="flex items-center gap-2 rounded-full p-1 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      {profileImage ? (
        <img
          src={profileImage}
          alt={displayName}
          className="h-10 w-10 rounded-full border object-cover"
        />
      ) : (
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
          {initial}
        </span>
      )}

      <ChevronDown
        className={`h-4 w-4 transition-transform ${
          isProfileOpen ? 'rotate-180' : ''
        }`}
      />
    </button>
  );

  const ProfileDropdown = () => (
    <div className="absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-xl border bg-background shadow-lg">
      <div className="flex items-center gap-3 border-b p-4">
        {profileImage ? (
          <img
            src={profileImage}
            alt={displayName}
            className="h-11 w-11 rounded-full border object-cover"
          />
        ) : (
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
            {initial}
          </span>
        )}

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{displayName}</p>
          <p className="truncate text-xs text-muted-foreground">
            {user?.email}
          </p>
        </div>
      </div>

      <div className="p-2">
        {role !== 'USER' && (
          <Link
            href={dashboardPath}
            onClick={() => {
              setIsProfileOpen(false);
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
        )}

        {role === 'USER' && (
          <Link
            href="/application"
            onClick={() => {
              setIsProfileOpen(false);
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted"
          >
            <UserRound className="h-4 w-4" />
            My Application
          </Link>
        )}

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-destructive transition-colors hover:bg-destructive/10"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <header className="top-0 z-100 border-b bg-accent px-4 py-3 shadow-sm sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
      
        {/* Logo */}
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          {/* Logo Icon */}
          <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 shadow-md shadow-blue-500/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg">
            <span className="text-xl font-extrabold tracking-tight text-white">
              U
            </span>

            <span className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-white/20 blur-sm" />
          </div>

          {/* Brand Name */}
          <div className="flex flex-col">
            <h1 className="text-xl font-extrabold leading-tight tracking-tight text-foreground sm:text-2xl">
              Uni
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                Core
              </span>
            </h1>

            
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLink.map(nav => (
            <NavLink key={nav.path} href={nav.path}>
              {nav.name}
            </NavLink>
          ))}
        </nav>
        {/* Desktop Profile / Login */}
        <div className="relative hidden shrink-0 lg:block">
          {user ? (
            <ProfileButton />
          ) : (
            <Button nativeButton={false} render={<Link href="/login" />}>
              Login
            </Button>
          )}

          {user && isProfileOpen && <ProfileDropdown />}
        </div>
        {/* Mobile Actions */}
        <div className="flex items-center gap-2 lg:hidden">
          {user && (
            <div className="relative">
              <ProfileButton />
              {isProfileOpen && <ProfileDropdown />}
            </div>
          )}

          {!user && (
            <Button nativeButton={false} render={<Link href="/login" />}>
              Login
            </Button>
          )}

          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(prev => !prev);
              setIsProfileOpen(false);
            }}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-muted"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="mx-auto mt-4 flex max-w-7xl flex-col gap-1 border-t pt-3 lg:hidden">
          {navLink.map(nav => (
            <div
              key={nav.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 transition-colors hover:bg-muted"
            >
              <NavLink href={nav.path}>{nav.name}</NavLink>
            </div>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;

