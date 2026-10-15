import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpenCheck, Target, Users } from 'lucide-react';

const features = [
  {
    icon: BookOpenCheck,
    title: 'Quality Education',
    description: 'Build strong academic foundations for your future.',
  },
  {
    icon: Target,
    title: 'Career Focused',
    description: 'Develop practical skills for real-world challenges.',
  },
  {
    icon: Users,
    title: 'Expert Faculty',
    description: 'Learn with guidance from experienced educators.',
  },
];

export default function AboutSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2">
        <div className="relative">
          <Image
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=85"
            alt="Students at a university campus"
            width={1200}
            height={900}
            className="h-[350px] w-full rounded-3xl object-cover sm:h-[470px]"
          />

          <div className="absolute -bottom-6 -right-3 rounded-2xl bg-blue-600 p-5 text-white shadow-xl sm:-right-6 sm:p-7">
            <p className="text-3xl font-extrabold">Excellence</p>
            <p className="mt-1 text-sm text-blue-100">
              In every learning experience
            </p>
          </div>
        </div>

        <div className="pt-4">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            About UniCore
          </span>

          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
            Education That Builds a Better Tomorrow
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            UniCore is designed to create an engaging academic environment where
            students can explore new ideas, develop their skills, and prepare
            for a successful future.
          </p>

          <div className="mt-8 space-y-6">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon size={24} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/about"
            className="mt-9 inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700"
          >
            Discover More <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
