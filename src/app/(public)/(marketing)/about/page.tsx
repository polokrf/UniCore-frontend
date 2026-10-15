
'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  BookOpen,
  Users,
  Target,
  Eye,
  ShieldCheck,
  CalendarDays,
  ChartNoAxesCombined,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Building2,
  Globe2,
  Lightbulb,
} from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Student Management',
    description:
      'Manage student profiles, academic information, enrollments, and records from one centralized platform.',
  },
  {
    icon: GraduationCap,
    title: 'Faculty Management',
    description:
      'Empower faculty members to manage courses, class routines, student progress, and academic responsibilities.',
  },
  {
    icon: BookOpen,
    title: 'Course Management',
    description:
      'Organize departments, semesters, course offerings, and enrollments with a streamlined workflow.',
  },
  {
    icon: CalendarDays,
    title: 'Academic Scheduling',
    description:
      'Keep academic schedules organized with structured class routines and accessible course information.',
  },
  {
    icon: ChartNoAxesCombined,
    title: 'Academic Results',
    description:
      'Make academic performance easier to manage with organized student results and academic records.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Access',
    description:
      'Support role-based access to help protect information and provide appropriate permissions to users.',
  },
];

const values = [
  'Simple and intuitive user experience',
  'Organized academic information',
  'Role-based access and management',
  'Efficient academic workflows',
];

const AboutPage = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative border-b">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/[0.08] via-background to-blue-500/[0.07]" />

        <div className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 -z-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm font-medium shadow-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Discover the UniCore Experience</span>
            </div>

            <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Empowering Education,
              <span className="mt-2 block text-primary">
                Simplifying Management.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
              UniCore is a university management platform designed to bring
              students, faculty, courses, and academic activities together in
              one organized digital environment.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                Explore UniCore
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="#our-mission"
                className="inline-flex items-center gap-2 rounded-xl border bg-background px-6 py-3.5 text-sm font-semibold transition hover:bg-muted"
              >
                Discover Our Mission
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Student-focused
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Organized academics
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Modern experience
              </span>
            </div>
          </div>

          {/* Visual Dashboard Card */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-4 rounded-[2rem] bg-primary/10 blur-2xl" />

            <div className="relative rounded-3xl border bg-card p-5 shadow-2xl shadow-primary/10 sm:p-7">
              <div className="flex items-center justify-between border-b pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                    <GraduationCap className="h-7 w-7" />
                  </div>

                  <div>
                    <h2 className="font-bold tracking-tight">UniCore</h2>
                    <p className="text-xs text-muted-foreground">
                      University Management
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600">
                  Smart Campus
                </span>
              </div>

              <div className="py-7">
                <p className="text-sm text-muted-foreground">
                  Everything in one place
                </p>

                <h3 className="mt-2 text-2xl font-bold">Your Academic Hub</h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Connect academic operations through one streamlined platform.
                </p>
              </div>

              <div className="grid md:grid-cols-2 md:gap-4 grid-cols-1 gap-2">
                <div className="rounded-2xl border bg-muted/40 p-2 md:p-4 transition hover:border-primary/40">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
                    <Users className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold">Students</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Student records
                  </p>
                </div>

                <div className="rounded-2xl border bg-muted/40 p-4 transition hover:border-primary/40">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold">Departments</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Academic structure
                  </p>
                </div>

                <div className="rounded-2xl border bg-muted/40 p-4 transition hover:border-primary/40">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold">Courses</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Course offerings
                  </p>
                </div>

                <div className="rounded-2xl border bg-muted/40 p-4 transition hover:border-primary/40">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-600">
                    <CalendarDays className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold">Class Routine</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Academic scheduling
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-2xl border border-primary/15 bg-primary/5 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Globe2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    One Connected Platform
                  </p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Bringing academic information together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section
        id="our-mission"
        className="mx-auto max-w-7xl p-2 md:px-5 py-20 sm:px-8 md:py-24"
      >
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Who We Are
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Building a Better Academic Experience
          </h2>

          <p className="mt-4 leading-7 text-muted-foreground">
            We believe that managing education should be as seamless as learning
            itself. UniCore brings essential academic operations into a more
            connected and accessible experience.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="group rounded-3xl border bg-card p-7 transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 sm:p-9">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
              <Target className="h-7 w-7" />
            </div>

            <h3 className="text-2xl font-bold">Our Mission</h3>

            <p className="mt-4 leading-8 text-muted-foreground">
              Our mission is to simplify university administration by providing
              a centralized platform for managing students, faculty,
              departments, courses, enrollments, class routines, and academic
              results.
            </p>
          </div>

          <div className="group rounded-3xl border bg-card p-7 transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 sm:p-9">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
              <Eye className="h-7 w-7" />
            </div>

            <h3 className="text-2xl font-bold">Our Vision</h3>

            <p className="mt-4 leading-8 text-muted-foreground">
              Our vision is to make academic management more accessible,
              efficient, and transparent through modern technology, thoughtful
              design, and connected digital experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-7xl p-2 md:px-5 py-20 sm:px-8 md:py-24">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              What We Offer
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything Your Campus Needs
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Essential academic management tools designed to make everyday
              university operations more organized.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-2xl border bg-card p-2 md:p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 sm:p-7"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold">{feature.title}</h3>
                    <span className="text-xs font-semibold text-muted-foreground">
                      0{index + 1}
                    </span>
                  </div>

                  <p className="text-sm leading-7 text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why UniCore */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-2 py-20 sm:px-8 md:py-24 lg:grid-cols-2 lg:gap-20">
        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Why UniCore
          </span>

          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Designed Around Your Academic Needs
          </h2>

          <p className="mt-5 leading-8 text-muted-foreground">
            A well-organized academic environment helps students and faculty
            focus on what matters most. UniCore brings essential information and
            workflows together in a clear, structured interface.
          </p>

          <div className="mt-8 space-y-4">
            {values.map(value => (
              <div key={value} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm font-medium sm:text-base">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl" />

          <div className="relative rounded-3xl border bg-card p-5 shadow-xl sm:p-9">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Lightbulb className="h-7 w-7" />
            </div>

            <h3 className="mt-7 text-2xl font-bold">Technology With Purpose</h3>

            <p className="mt-4 leading-8 text-muted-foreground">
              Great academic software is not just about managing data. It is
              about making information easier to access, tasks easier to
              complete, and collaboration easier to organize.
            </p>

            <div className="mt-8 rounded-2xl bg-muted/60 p-5">
              <p className="text-sm font-semibold">Our Core Principle</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Make academic management simpler, more organized, and accessible
                through a thoughtful digital experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-2 pb-20 sm:px-8 md:pb-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground sm:px-12 sm:py-20">
          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border border-white/10" />
          <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full border border-white/10" />

          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
              <GraduationCap className="h-8 w-8" />
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Explore UniCore?
            </h2>

            <p className="mt-4 leading-8 text-primary-foreground/80">
              Discover a more organized way to manage academic activities and
              bring your university experience together.
            </p>

            <Link
              href="/"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-background px-6 py-3.5 text-sm font-semibold text-foreground shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;

