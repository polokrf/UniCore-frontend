
import PageHeader from '@/components/shared/PageHeader';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  Layers3,
  LibraryBig,
  ShieldCheck,
  Sparkles,
  Users,
  UserRoundCheck,
  ChartNoAxesCombined,
  Building2,
  Clock,
} from 'lucide-react';

export const metadata = {
  title: 'Academic Programs | UniCore',
  description:
    'Explore UniCore academic management services, including student management, faculty management, courses, enrollments, class routines, and academic results.',
};

const services = [
  {
    icon: Users,
    number: '01',
    title: 'Student Management',
    description:
      'Manage student profiles, academic information, enrollment records, and essential student details in one organized place.',
    features: [
      'Student profile management',
      'Academic information',
      'Enrollment tracking',
    ],
    color: 'bg-blue-500/10 text-blue-600',
  },
  {
    icon: UserRoundCheck,
    number: '02',
    title: 'Faculty Management',
    description:
      'Organize faculty information and support academic responsibilities through a centralized management system.',
    features: [
      'Faculty profiles',
      'Teacher applications',
      'Academic assignments',
    ],
    color: 'bg-purple-500/10 text-purple-600',
  },
  {
    icon: BookOpen,
    number: '03',
    title: 'Course Management',
    description:
      'Create and organize courses, assign course offerings, and maintain a structured academic curriculum.',
    features: [
      'Course organization',
      'Course offerings',
      'Teacher assignments',
    ],
    color: 'bg-amber-500/10 text-amber-600',
  },
  {
    icon: Building2,
    number: '04',
    title: 'Department Management',
    description:
      'Keep university departments organized with centralized information and structured academic administration.',
    features: [
      'Department records',
      'Academic organization',
      'Department information',
    ],
    color: 'bg-emerald-500/10 text-emerald-600',
  },
  {
    icon: CalendarDays,
    number: '05',
    title: 'Class Routine',
    description:
      'Organize class schedules with course, time, room, and day information to make academic planning easier.',
    features: [
      'Weekly class schedules',
      'Classroom information',
      'Routine management',
    ],
    color: 'bg-pink-500/10 text-pink-600',
  },
  {
    icon: ChartNoAxesCombined,
    number: '06',
    title: 'Academic Results',
    description:
      'Maintain organized academic result records and support a clearer view of student academic performance.',
    features: [
      'Result records',
      'Academic progress',
      'Performance information',
    ],
    color: 'bg-indigo-500/10 text-indigo-600',
  },
  {
    icon: Layers3,
    number: '07',
    title: 'Semester Management',
    description:
      'Organize academic semesters and keep important semester-related information accessible.',
    features: [
      'Semester information',
      'Academic timelines',
      'Course organization',
    ],
    color: 'bg-cyan-500/10 text-cyan-600',
  },
  {
    icon: ClipboardCheck,
    number: '08',
    title: 'Course Enrollment',
    description:
      'Organize enrollment requests and provide a structured workflow for managing student course registrations.',
    features: [
      'Enrollment requests',
      'Registration tracking',
      'Enrollment status',
    ],
    color: 'bg-orange-500/10 text-orange-600',
  },
  {
    icon: ShieldCheck,
    number: '09',
    title: 'Secure Administration',
    description:
      'Support responsible access to academic information with role-based permissions and account management.',
    features: [
      'Role-based access',
      'Account management',
      'Protected information',
    ],
    color: 'bg-teal-500/10 text-teal-600',
  },
];

const highlights = [
  {
    icon: LibraryBig,
    title: 'Centralized Information',
    description:
      'Keep essential academic information organized in one platform.',
  },
  {
    icon: Clock,
    title: 'Efficient Workflows',
    description:
      'Simplify routine academic administration with structured workflows.',
  },
  {
    icon: ShieldCheck,
    title: 'Role-Based Management',
    description:
      'Organize access according to the responsibilities of different users.',
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative border-b">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/[0.08] via-background to-blue-500/[0.07]" />

        <div className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl sm:h-80 sm:w-80" />

        <div className="mx-auto max-w-7xl px-2 py-10 sm:px-8 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-2 text-xs font-medium shadow-sm sm:mb-6 sm:px-4 sm:text-sm">
              <Sparkles className="h-4 w-4 shrink-0 text-primary" />
              <span>Discover Our Academic Services</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Academic Management,
              <span className="mt-2 block text-primary">
                Made Simpler.
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:mt-6 sm:text-lg sm:leading-8">
              UniCore brings essential university operations together,
              helping administrators, faculty members, and students manage
              academic activities through one organized platform.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2 sm:mt-8 sm:gap-3">
              <Link
                href="#academic-services"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition hover:-translate-y-0.5 hover:shadow-xl sm:px-6"
              >
                Explore Services
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-xl border bg-background px-4 py-3 text-sm font-semibold transition hover:bg-muted sm:px-6"
              >
                About UniCore
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-3 text-xs text-muted-foreground sm:mt-10 sm:gap-x-7 sm:text-sm">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Academic Organization
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Student & Faculty
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Centralized Management
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Services */}
      <section
        id="academic-services"
        className="mx-auto max-w-7xl px-2 py-10 sm:px-8 sm:py-20 lg:py-24"
      >
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary sm:text-sm sm:tracking-[0.2em]">
            What We Offer
          </span>

          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:mt-4 sm:text-4xl">
            Our Academic Services
          </h2>

          <p className="mt-3 text-sm leading-7 text-muted-foreground sm:mt-4 sm:text-base">
            Explore the essential services that help organize university
            operations, academic records, and everyday workflows.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.number}
                className="group flex min-w-0 flex-col rounded-xl border bg-card p-2 transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 sm:rounded-2xl sm:p-6 lg:p-7"
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${service.color}`}
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>

                  <span className="text-xs font-semibold tracking-wider text-muted-foreground">
                    {service.number}
                  </span>
                </div>

                <h3 className="mt-4 text-base font-bold tracking-tight sm:mt-5 sm:text-lg">
                  {service.title}
                </h3>

                <p className="mt-2 text-xs leading-6 text-muted-foreground sm:mt-3 sm:text-sm sm:leading-7">
                  {service.description}
                </p>

                <div className="mt-4 space-y-2 border-t pt-3 sm:mt-5 sm:pt-4">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-2 text-xs text-muted-foreground sm:text-sm"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto flex items-center gap-2 pt-4 text-xs font-semibold text-primary sm:pt-5 sm:text-sm">
                  <span>Academic Service</span>
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Why Choose UniCore */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-7xl px-2 py-10 sm:px-8 sm:py-20">
          <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary sm:text-sm sm:tracking-[0.2em]">
              Why UniCore
            </span>

            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:mt-4 sm:text-4xl">
              One Platform, Better Organization
            </h2>

            <p className="mt-3 text-sm leading-7 text-muted-foreground sm:mt-4 sm:text-base">
              Designed to bring essential academic information and
              management workflows into a consistent experience.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-xl border bg-card p-2 transition duration-300 hover:border-primary/40 hover:shadow-lg sm:rounded-2xl sm:p-6"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-12 sm:w-12">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>

                  <h3 className="mt-4 text-base font-bold sm:mt-5 sm:text-lg">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-muted-foreground sm:mt-3 sm:text-sm sm:leading-7">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Helps */}
      <section className="mx-auto max-w-7xl px-2 py-10 sm:px-8 sm:py-20 lg:py-24">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary sm:text-sm sm:tracking-[0.2em]">
              Our Approach
            </span>

            <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight sm:mt-4 sm:text-4xl">
              Focus on Education.
              <span className="mt-1 block text-primary">
                Simplify Administration.
              </span>
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:mt-5 sm:text-base sm:leading-8">
              Academic management involves many connected activities.
              UniCore aims to make those activities easier to organize
              through structured information and a consistent digital
              experience.
            </p>

            <div className="mt-5 space-y-3 sm:mt-7 sm:space-y-4">
              {[
                'Keep academic information organized.',
                'Make course and enrollment management easier.',
                'Support structured academic scheduling.',
                'Provide appropriate access to different user roles.',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                  <span className="text-sm leading-6 sm:text-base">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Information Card */}
          <div className="relative">
            <div className="absolute -inset-2 -z-10 rounded-3xl bg-primary/10 blur-2xl sm:-inset-4" />

            <div className="rounded-2xl border bg-card p-2 shadow-xl shadow-primary/5 sm:rounded-3xl sm:p-7">
              <div className="flex items-center gap-3 border-b pb-4 sm:pb-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground sm:h-12 sm:w-12">
                  <GraduationCap className="h-6 w-6" />
                </div>

                <div className="min-w-0">
                  <h3 className="font-bold">The UniCore Ecosystem</h3>

                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                    Connected academic management
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 py-4 sm:gap-4 sm:py-6">
                {[
                  {
                    icon: Users,
                    title: 'Students',
                    description: 'Student information',
                    color: 'bg-blue-500/10 text-blue-600',
                  },
                  {
                    icon: GraduationCap,
                    title: 'Faculty',
                    description: 'Faculty management',
                    color: 'bg-purple-500/10 text-purple-600',
                  },
                  {
                    icon: BookOpen,
                    title: 'Courses',
                    description: 'Academic courses',
                    color: 'bg-amber-500/10 text-amber-600',
                  },
                  {
                    icon: CalendarDays,
                    title: 'Routines',
                    description: 'Class scheduling',
                    color: 'bg-green-500/10 text-green-600',
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="rounded-xl border bg-muted/30 p-2 transition hover:border-primary/40 sm:rounded-2xl sm:p-4"
                    >
                      <div
                        className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg sm:h-10 sm:w-10 sm:rounded-xl ${item.color}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      <h4 className="text-sm font-semibold">
                        {item.title}
                      </h4>

                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-primary/15 bg-primary/[0.04] p-2 sm:rounded-2xl sm:p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Layers3 className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold">
                    Everything Connected
                  </p>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Organized academic information in one platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-2 pb-10 sm:px-8 sm:pb-20">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl bg-primary px-3 py-10 text-center text-primary-foreground sm:rounded-3xl sm:px-12 sm:py-16">
          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border border-white/10" />
          <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full border border-white/10" />

          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 sm:h-14 sm:w-14 sm:rounded-2xl">
              <GraduationCap className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>

            <h2 className="mt-5 text-2xl font-bold tracking-tight sm:mt-6 sm:text-4xl">
              Ready to Explore UniCore?
            </h2>

            <p className="mt-3 text-sm leading-7 text-primary-foreground/80 sm:mt-4 sm:text-base sm:leading-8">
              Discover a more organized way to manage academic activities
              and bring essential university operations together.
            </p>

            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:shadow-xl sm:mt-8 sm:px-6 sm:py-3.5"
            >
              Discover UniCore
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

