import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const facilities = [
  {
    title: 'Modern Library',
    description: 'A comfortable space for reading and research.',
    image:
      'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=900&q=85',
    className: 'md:col-span-2',
  },
  {
    title: 'Smart Classrooms',
    description: 'Technology-supported learning environments.',
    image:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=85',
    className: '',
  },
  {
    title: 'Student Community',
    description: 'Connect, collaborate, and grow together.',
    image:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=85',
    className: '',
  },
  {
    title: 'Campus Life',
    description: 'Discover new experiences beyond the classroom.',
    image:
      'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=900&q=85',
    className: 'md:col-span-2',
  },
];

export default function CampusLife() {
  return (
    <section className="bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-2 md:px-5">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Campus Experience
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Life Beyond the Classroom
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              Explore the spaces and experiences that make university life
              meaningful.
            </p>
          </div>

          <Link
            href="/campus"
            className="inline-flex items-center gap-2 font-semibold text-blue-600"
          >
            Explore Campus <ArrowUpRight size={18} />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {facilities.map(facility => (
            <article
              key={facility.title}
              className={`group relative min-h-72 overflow-hidden rounded-2xl ${facility.className}`}
            >
              <Image
                src={facility.image}
                alt={facility.title}
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <h3 className="text-2xl font-bold">{facility.title}</h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-slate-200">
                  {facility.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
