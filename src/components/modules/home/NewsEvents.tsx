import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarDays } from 'lucide-react';

const news = [
  {
    category: 'Academic',
    date: 'October 20, 2026',
    title: 'New Academic Programs Coming Soon',
    description:
      'Discover new learning opportunities designed to support student growth.',
    image:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
  },
  {
    category: 'Events',
    date: 'October 25, 2026',
    title: 'Annual Campus Orientation',
    description:
      'An opportunity for students to connect with faculty and fellow learners.',
    image:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
  },
  {
    category: 'Community',
    date: 'November 02, 2026',
    title: 'Student Innovation Showcase',
    description:
      'Explore creative ideas and projects developed by our student community.',
    image:
      'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80',
  },
];

export default function NewsEvents() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              News & Events
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              What's Happening at UniCore?
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              Stay informed about university activities, announcements, and
              upcoming events.
            </p>
          </div>

          <Link
            href="/news"
            className="inline-flex items-center gap-2 font-semibold text-blue-600"
          >
            View All News <ArrowRight size={18} />
          </Link>
        </div>

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {news.map(item => (
            <article
              key={item.title}
              className="overflow-hidden rounded-2xl border border-slate-200 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={800}
                  height={450}
                  className="h-56 w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
                    {item.category}
                  </span>

                  <span className="flex items-center gap-1.5 text-xs text-slate-500">
                    <CalendarDays size={15} />
                    {item.date}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold leading-snug text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>

                <Link
                  href="/news"
                  className="mt-5 inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700"
                >
                  Read More <ArrowRight size={17} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
