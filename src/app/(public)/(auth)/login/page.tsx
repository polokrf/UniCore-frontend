
import DemoLogin from '@/components/Form/DemoLogin';
import LoginForm from '@/components/Form/LoginForm';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import React from 'react';
import {
  GraduationCap,
  BookOpen,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

const LoginPage = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-blue-50/60 p-2 sm:p-6 lg:p-8">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-sky-200/40 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-violet-200/30 blur-3xl" />

      {/* Main Container */}
      <div className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-xl shadow-blue-100/60 sm:rounded-3xl lg:grid-cols-2">

        {/* Left Branding Section */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 p-8 lg:flex xl:p-12">

          {/* Decorative Circles */}
          <div className="absolute -right-16 top-16 h-56 w-56 rounded-full border border-blue-200/60" />

          <div className="absolute -right-8 top-24 h-40 w-40 rounded-full border border-indigo-200/60" />

          <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-sky-200/30 blur-2xl" />

          {/* Branding */}
          <div className="relative z-10">
            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-lg shadow-blue-200">
                <GraduationCap size={28} />
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-tight text-blue-900">
                  UniCore
                </h2>

                <p className="text-xs tracking-widest text-blue-500">
                  UNIVERSITY MANAGEMENT
                </p>
              </div>

            </div>

            {/* Welcome Content */}
            <div className="mt-20">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-3 py-1.5 text-xs font-medium text-blue-600 shadow-sm">
                <Sparkles size={14} />
                Your Future Starts Here
              </div>

              <h1 className="max-w-md text-4xl font-bold leading-tight text-blue-950 xl:text-5xl">
                Empowering

                <span className="mt-2 block bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
                  Education.
                </span>

                Inspiring Futures.
              </h1>

              <p className="mt-6 max-w-sm text-sm leading-7 text-slate-600">
                Welcome to UniCore, your centralized platform for
                managing academic activities and connecting with
                your university community.
              </p>

            </div>
          </div>

          {/* Features Section */}
          <div className="relative z-10 mt-16 space-y-5">

            {/* Academic Management */}
            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm ring-1 ring-blue-100">
                <BookOpen size={19} />
              </div>

              <div>
                <p className="text-sm font-semibold text-blue-950">
                  Academic Management
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Your academic journey, organized.
                </p>
              </div>

            </div>

            {/* Secure Access */}
            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm ring-1 ring-indigo-100">
                <ShieldCheck size={19} />
              </div>

              <div>
                <p className="text-sm font-semibold text-blue-950">
                  Secure Access
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  A dedicated portal for your university.
                </p>
              </div>

            </div>

            {/* Footer */}
            <div className="border-t border-blue-200/70 pt-5">
              <p className="text-xs text-slate-500">
                © {new Date().getFullYear()} UniCore. All rights reserved.
              </p>
            </div>

          </div>
        </section>

        {/* Right Login Section */}
        <section className="flex min-w-0 flex-col justify-center p-2 sm:p-8 lg:p-10 xl:p-12">

          {/* Mobile Branding */}
          <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-lg shadow-blue-200">
              <GraduationCap size={28} />
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight text-blue-900">
                UniCore
              </h2>

              <p className="text-xs tracking-widest text-blue-500">
                UNIVERSITY MANAGEMENT
              </p>
            </div>

          </div>

          {/* Login Card */}
          <Card className="w-full min-w-0 border-0 bg-transparent p-0 shadow-none">

            {/* Heading */}
            <div className="mb-8">

              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-blue-600 ring-1 ring-blue-100">
                <GraduationCap size={26} />
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-blue-950 sm:text-4xl">
                Welcome Back!
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Plz login now , you give your email and password
              </p>

              <div className="mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500" />

            </div>

            {/* Existing Login Form */}
            <LoginForm />

            {/* Existing Demo Login */}
            <div className="mt-5">
              <DemoLogin />
            </div>

            {/* Registration Link */}
            <div className="mt-8 border-t border-blue-100 pt-6 text-center">

              <p className="text-sm text-slate-500">
                you have no account{' '}

                <Link
                  href="/register"
                  className="font-semibold text-blue-600 underline-offset-4 transition-colors hover:text-indigo-600 hover:underline"
                >
                  register now
                </Link>
              </p>

            </div>

          </Card>

          {/* Mobile Footer */}
          <p className="mt-8 text-center text-xs text-slate-400 lg:hidden">
            © {new Date().getFullYear()} UniCore. All rights reserved.
          </p>

        </section>
      </div>
    </main>
  );
};

export default LoginPage;

