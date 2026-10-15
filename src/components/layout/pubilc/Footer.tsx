
import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  
  ArrowUpRight,
} from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-accent ">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
          {/* Brand Information */}
          <div>
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-md transition-transform duration-300 group-hover:scale-105">
                <GraduationCap className="h-6 w-6" />
              </div>

              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
                  Uni<span className="text-blue-600">Core</span>
                </h2>
                <p className="text-[10px] font-semibold uppercase tracking-[2px] text-muted-foreground">
                  University Management
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">
              Empowering education through smarter university management.
              Bringing students, teachers, and administrators together in
              one connected platform.
            </p>

       
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-base font-bold text-foreground">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-blue-600"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="mb-5 text-base font-bold text-foreground">
              Get in Touch
            </h3>

            <p className="max-w-xs text-sm leading-7 text-muted-foreground">
              Have questions or need assistance? We are here to help you
              make the most of UniCore.
            </p>

            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md"
            >
              Contact Us
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-muted-foreground">
            © {currentYear} UniCore. All rights reserved.
          </p>

          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-blue-600"
          >
            Built for better education.
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

