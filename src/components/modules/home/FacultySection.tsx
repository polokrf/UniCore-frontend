import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, GraduationCap } from 'lucide-react';

const faculty = [
  {
    name: 'Dr. Alex Morgan',
    role: 'Professor',
    department: 'Computer Science',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'Dr. Sarah Williams',
    role: 'Associate Professor',
    department: 'Business Administration',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'Prof. James Wilson',
    role: 'Senior Lecturer',
    department: 'Electrical Engineering',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80',
  },
];

export default function FacultySection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <div className="text-center">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Our Faculty
          </span>

          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Meet Our Expert Educators
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
            Learn from experienced educators who are committed to academic
            excellence and student success.
          </p>
        </div>

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {faculty.map(teacher => (
            <article
              key={teacher.name}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative">
                <Image
                  src={teacher.image}
                  alt={teacher.name}
                  width={500}
                  height={400}
                  className="h-64 w-full object-cover"
                />

                <div className="absolute bottom-4 left-4 rounded-xl bg-white p-3 text-blue-600 shadow-lg">
                  <GraduationCap size={25} />
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm font-semibold text-blue-600">
                  {teacher.department}
                </p>

                <h3 className="mt-2 text-xl font-bold text-slate-900">
                  {teacher.name}
                </h3>

                <p className="mt-1 text-sm text-slate-500">{teacher.role}</p>

                <Link
                  href="/faculty"
                  className="mt-5 inline-flex items-center gap-2 font-semibold text-slate-800 hover:text-blue-600"
                >
                  View Profile <ArrowRight size={17} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
