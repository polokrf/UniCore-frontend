import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, Users, GraduationCap } from 'lucide-react';

const stats = [
  { label: 'Students', value: '5,000+', icon: Users },
  { label: 'Programs', value: '25+', icon: BookOpen },
  { label: 'Faculty', value: '150+', icon: GraduationCap },
];

export default function HeroSection() {
  return (
    <section className="overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:py-28 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-700">
            <GraduationCap size={18} />
            Welcome to UniCore University
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Empowering Minds,
            <span className="block text-blue-600">Shaping the Future.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 md:text-lg">
            Discover your potential through quality education, innovative
            learning, and a community that inspires you to achieve more.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/departments"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Explore Programs
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/register"
              className="rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-800 transition hover:border-blue-300 hover:text-blue-600"
            >
              Apply Now
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4 border-t border-slate-200 pt-8">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label}>
                <Icon className="mb-3 text-blue-600" size={23} />
                <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
                  {value}
                </h3>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-5 -top-5 h-32 w-32 rounded-full bg-blue-200/50 blur-2xl" />

          <div className="relative overflow-hidden rounded-3xl border border-white shadow-2xl shadow-blue-900/10">
            <Image
              src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85"
              alt="University campus building"
              width={1200}
              height={900}
              priority
              className="h-[350px] w-full object-cover sm:h-[450px]"
            />
          </div>

          <div className="absolute -bottom-5 left-4 rounded-2xl bg-white p-4 shadow-xl sm:-left-5 sm:p-5">
            <p className="text-sm font-semibold text-slate-500">
              Your future starts here
            </p>
            <p className="mt-1 text-lg font-bold text-slate-900">
              Learn. Grow. Succeed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
