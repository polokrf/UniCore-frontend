import Image from 'next/image';
import Link from 'next/link';
import {
ArrowRight,
BookOpenCheck,
Target,
Users,
} from 'lucide-react';

const features = [
{
icon: BookOpenCheck,
title: 'Quality Education',
description:
'Build strong academic foundations for your future.',
},
{
icon: Target,
title: 'Career Focused',
description:
'Develop practical skills for real-world challenges.',
},
{
icon: Users,
title: 'Expert Faculty',
description:
'Learn with guidance from experienced educators.',
},
];

export default function AboutSection() {
return ( <section className="overflow-hidden bg-white py-14 sm:py-20 lg:py-28"> <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 md:gap-14 lg:grid-cols-2 lg:px-8">


    {/* Image Section */}
    <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl sm:rounded-3xl">
        <Image
          src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=85"
          alt="Students at a university campus"
          fill
          priority={false}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 50vw"
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>

      {/* Excellence Badge */}
      <div className="absolute -bottom-3 right-3 max-w-[calc(100%-1.5rem)] rounded-xl bg-blue-600 px-4 py-3 text-white shadow-xl sm:-bottom-5 sm:right-5 sm:rounded-2xl sm:px-6 sm:py-5 lg:-right-4">
        <p className="text-xl font-extrabold sm:text-3xl">
          Excellence
        </p>

        <p className="mt-1 text-xs text-blue-100 sm:text-sm">
          In every learning experience
        </p>
      </div>
    </div>

    {/* Content Section */}
    <div className="pt-5 sm:pt-7 lg:pt-0">
      <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-blue-600 sm:text-sm">
        About UniCore
      </span>

      <h2 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:mt-4 sm:text-3xl md:text-4xl xl:text-5xl">
        Education That Builds a Better Tomorrow
      </h2>

      <p className="mt-4 text-sm leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
        UniCore is designed to create an engaging academic
        environment where students can explore new ideas,
        develop their skills, and prepare for a successful future.
      </p>

      {/* Features */}
      <div className="mt-7 space-y-5 sm:mt-8 sm:space-y-6">
        {features.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex items-start gap-3 sm:gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 sm:h-12 sm:w-12">
              <Icon size={22} className="sm:h-6 sm:w-6" />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                {title}
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <Link
        href="/about"
        className="mt-7 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-blue-700 sm:mt-9 sm:px-6 sm:text-base"
      >
        Discover More
        <ArrowRight size={18} />
      </Link>
    </div>

  </div>
</section>


);
}
