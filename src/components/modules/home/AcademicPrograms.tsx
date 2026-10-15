import Link from 'next/link';
import {
  ArrowUpRight,
  Code2,
  BriefcaseBusiness,
  Cpu,
  FlaskConical,
} from 'lucide-react';

const programs = [
  {
    title: 'Computer Science',
    category: 'Engineering',
    description:
      'Explore software development, algorithms, and modern computing.',
    icon: Code2,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Business Administration',
    category: 'Business',
    description:
      'Develop leadership, management, and business strategy skills.',
    icon: BriefcaseBusiness,
    color: 'bg-violet-50 text-violet-600',
  },
  {
    title: 'Electrical Engineering',
    category: 'Engineering',
    description: 'Discover electronics, electrical systems, and innovation.',
    icon: Cpu,
    color: 'bg-amber-50 text-amber-600',
  },
  {
    title: 'Applied Sciences',
    category: 'Science',
    description:
      'Build scientific knowledge through research and practical learning.',
    icon: FlaskConical,
    color: 'bg-emerald-50 text-emerald-600',
  },
];

export default function AcademicPrograms() {
  return (
    <section className="bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Academics
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Explore Our Programs
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              Find the right academic path to develop your knowledge and prepare
              for your future career.
            </p>
          </div>

          <Link
            href="/departments"
            className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700"
          >
            View All Programs <ArrowUpRight size={18} />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map(
            ({ title, category, description, icon: Icon, color }) => (
              <article
                key={title}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${color}`}
                >
                  <Icon size={27} />
                </div>

                <p className="mt-6 text-xs font-bold uppercase tracking-wider text-blue-600">
                  {category}
                </p>

                <h3 className="mt-2 text-xl font-bold text-slate-900">
                  {title}
                </h3>

                <p className="mt-3 min-h-20 text-sm leading-7 text-slate-600">
                  {description}
                </p>

                <Link
                  href="/departments"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-800 transition group-hover:text-blue-600"
                >
                  Learn More <ArrowUpRight size={16} />
                </Link>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
