
import RegisterForm from '@/components/Form/RegisterForm';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import React from 'react';
import {
  GraduationCap,
  BookOpen,
  Users,
  Sparkles,
} from 'lucide-react';

const RegisterPage = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-blue-50/60 p-2 sm:p-6 lg:p-8">

      {/* Soft Background Decorations */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-sky-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-violet-200/30 blur-3xl" />

      <div className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-xl shadow-blue-100/60 sm:rounded-3xl lg:grid-cols-2">

        {/* Left Branding Section */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 p-8 sm:p-10 lg:flex xl:p-12">

          {/* Decorative Circles */}
          <div className="absolute -right-16 top-16 h-56 w-56 rounded-full border border-blue-200/60" />
          <div className="absolute -right-8 top-24 h-40 w-40 rounded-full border border-indigo-200/60" />
          <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-sky-200/30 blur-2xl" />

          <div className="relative z-10">

            {/* Brand */}
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

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-3 py-2 text-xs font-semibold text-blue-600 shadow-sm">
                <Sparkles size={15} />
                Start Your Journey
              </div>

              <h1 className="max-w-md text-4xl font-bold leading-tight text-blue-950 xl:text-5xl">
                Build Your
                <span className="mt-2 block bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
                  Academic Future.
                </span>
              </h1>

              <p className="mt-6 max-w-sm text-sm leading-7 text-slate-600">
                Create your UniCore account and become part of a
                community dedicated to learning, collaboration,
                and academic excellence.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="relative z-10 mt-12 space-y-5">

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm ring-1 ring-blue-100">
                <BookOpen size={20} />
              </div>

              <div>
                <p className="text-sm font-semibold text-blue-950">
                  Organized Learning
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Keep your academic journey organized.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm ring-1 ring-indigo-100">
                <Users size={20} />
              </div>

              <div>
                <p className="text-sm font-semibold text-blue-950">
                  Join Our Community
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Connect with your university community.
                </p>
              </div>
            </div>

            <div className="border-t border-blue-200/70 pt-5">
              <p className="text-xs text-slate-500">
                © {new Date().getFullYear()} UniCore. All rights reserved.
              </p>
            </div>
          </div>
        </section>

        {/* Right Registration Section */}
        <section className="flex min-w-0 flex-col justify-center p-2 sm:p-8 lg:p-10 xl:p-12">

          {/* Mobile Branding */}
          <div className="mb-6 flex items-center justify-center gap-3 lg:hidden">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-md shadow-blue-100">
              <GraduationCap size={26} />
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-blue-900">
                UniCore
              </h2>
              <p className="text-[10px] tracking-widest text-blue-500">
                UNIVERSITY MANAGEMENT
              </p>
            </div>
          </div>

          <Card className="w-full min-w-0 border-0 bg-transparent p-0 shadow-none">

            {/* Heading */}
            <div className="mb-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-blue-600 ring-1 ring-blue-100">
                <Sparkles size={24} />
              </div>

              <CardTitle className="text-2xl font-bold tracking-tight text-blue-950 sm:text-3xl">
                Register Now!
              </CardTitle>

              <CardDescription className="mt-3 text-sm leading-6 text-slate-500">
                Plz create a new account and join our community
              </CardDescription>

              <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500" />
            </div>

            {/* Existing Registration Form */}
            <RegisterForm />

            {/* Login Link */}
            <div className="mt-6 border-t border-blue-50 pt-5 text-center">
              <p className="text-sm text-slate-500">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="font-semibold text-blue-600 underline-offset-4 transition-colors hover:text-indigo-600 hover:underline"
                >
                  Login now
                </Link>
              </p>
            </div>

          </Card>

          {/* Mobile Footer */}
          <p className="mt-6 text-center text-xs text-slate-400 lg:hidden">
            © {new Date().getFullYear()} UniCore. All rights reserved.
          </p>

        </section>
      </div>
    </main>
  );
};

export default RegisterPage;

