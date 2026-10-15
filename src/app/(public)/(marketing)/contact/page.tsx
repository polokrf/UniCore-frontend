
'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Clock,
  GraduationCap,
  Headphones,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Send us your questions anytime.',
    value: 'support@unicore.edu',
    href: 'mailto:support@unicore.edu',
    color: 'bg-blue-500/10 text-blue-600',
  },
  {
    icon: Phone,
    title: 'Call Us',
    description: 'We are happy to assist you.',
    value: '+880 1XXX-XXXXXX',
    href: 'tel:+8801XXXXXXXXX',
    color: 'bg-green-500/10 text-green-600',
  },
  {
    icon: MapPin,
    title: 'Our Location',
    description: 'Connect with our support team.',
    value: 'Rajshahi, Bangladesh',
    href: 'https://www.google.com/maps/search/?api=1&query=Rajshahi%2C%20Bangladesh',
    color: 'bg-purple-500/10 text-purple-600',
  },
];

const supportItems = [
  {
    icon: GraduationCap,
    title: 'Student Support',
    description:
      'Get assistance with enrollment, courses, academic records, and student accounts.',
  },
  {
    icon: Building2,
    title: 'Faculty & Administration',
    description:
      'Find help with faculty profiles, departments, class routines, and academic management.',
  },
  {
    icon: ShieldCheck,
    title: 'Account & Security',
    description:
      'Get guidance on account access, authentication, and account-related concerns.',
  },
];

const ContactPage = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Connect this form to your backend API to submit messages.
  };

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative border-b">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/[0.08] via-background to-blue-500/[0.07]" />

        <div className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-2 py-10 sm:px-8 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-2 text-xs font-medium shadow-sm sm:mb-6 sm:px-4 sm:text-sm">
              <Sparkles className="h-4 w-4 shrink-0 text-primary" />
              <span>We Are Here to Help</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Let&apos;s Start a
              <span className="mt-2 block text-primary">
                Conversation.
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:mt-6 sm:text-lg sm:leading-8">
              Have a question about UniCore? Need assistance with academic
              management or your account? We&apos;re here to help you find
              the right solution.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground sm:mt-8 sm:gap-3 sm:text-sm">
              <span className="flex items-center gap-2 rounded-full border bg-card px-3 py-2 sm:px-4">
                <MessageCircle className="h-4 w-4 shrink-0 text-primary" />
                Friendly Support
              </span>

              <span className="flex items-center gap-2 rounded-full border bg-card px-3 py-2 sm:px-4">
                <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
                Secure Communication
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="mx-auto max-w-7xl px-2 py-10 sm:px-8 sm:py-20 lg:py-24">
        <div className="grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* Contact Information */}
          <div className="min-w-0">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary sm:text-sm sm:tracking-[0.2em]">
              Get In Touch
            </span>

            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:mt-4 sm:text-4xl">
              We&apos;d Love to Hear From You
            </h2>

            <p className="mt-3 text-sm leading-7 text-muted-foreground sm:mt-5 sm:text-base sm:leading-8">
              Whether you need technical assistance, have a suggestion, or
              want to learn more about our platform, feel free to contact us.
            </p>

            <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
              {contactInfo.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.title}
                    href={item.href}
                    target={
                      item.title === 'Our Location' ? '_blank' : undefined
                    }
                    rel={
                      item.title === 'Our Location'
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    className="group flex min-w-0 items-center gap-3 rounded-xl border bg-card p-2 transition duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 sm:gap-4 sm:rounded-2xl sm:p-5"
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${item.color}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold sm:text-base">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">
                        {item.description}
                      </p>

                      <p className="mt-1 break-all text-xs font-medium text-primary sm:mt-2 sm:text-sm">
                        {item.value}
                      </p>
                    </div>

                    <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-primary sm:h-5 sm:w-5" />
                  </a>
                );
              })}
            </div>

            {/* Support Availability */}
            <div className="mt-4 rounded-xl border border-primary/15 bg-primary/[0.04] p-2 sm:mt-6 sm:rounded-2xl sm:p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-11 sm:w-11">
                  <Clock className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <h3 className="text-sm font-semibold sm:text-base">
                    Support Availability
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-muted-foreground sm:text-sm">
                    Send us your message anytime. Our team will respond
                    according to its availability.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative min-w-0">
            <div className="absolute -inset-2 -z-10 rounded-3xl bg-primary/[0.06] blur-2xl sm:-inset-3" />

            <div className="rounded-2xl border bg-card p-2 shadow-xl shadow-primary/5 sm:rounded-3xl sm:p-8 lg:p-9">
              <div className="mb-5 border-b pb-5 sm:mb-8 sm:pb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-12 sm:w-12">
                  <Send className="h-5 w-5" />
                </div>

                <h2 className="mt-4 text-xl font-bold tracking-tight sm:mt-5 sm:text-2xl">
                  Send Us a Message
                </h2>

                <p className="mt-2 text-xs leading-6 text-muted-foreground sm:text-sm">
                  Fill out the form below and let us know how we can help.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  <div className="min-w-0 space-y-2">
                    <label
                      htmlFor="fullName"
                      className="text-sm font-medium"
                    >
                      Full Name <span className="text-destructive">*</span>
                    </label>

                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      required
                      autoComplete="name"
                      className="h-11 w-full min-w-0 rounded-xl border border-input bg-background px-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15 sm:h-12 sm:px-4"
                    />
                  </div>

                  <div className="min-w-0 space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium"
                    >
                      Email Address{' '}
                      <span className="text-destructive">*</span>
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      autoComplete="email"
                      className="h-11 w-full min-w-0 rounded-xl border border-input bg-background px-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15 sm:h-12 sm:px-4"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject <span className="text-destructive">*</span>
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="What is your message about?"
                    required
                    className="h-11 w-full min-w-0 rounded-xl border border-input bg-background px-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15 sm:h-12 sm:px-4"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">
                    Inquiry Type
                  </label>

                  <select
                    id="category"
                    name="category"
                    defaultValue=""
                    className="h-11 w-full min-w-0 rounded-xl border border-input bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 sm:h-12 sm:px-4"
                  >
                    <option value="" disabled>
                      Select an inquiry type
                    </option>
                    <option value="student-support">Student Support</option>
                    <option value="faculty-support">Faculty Support</option>
                    <option value="technical-support">Technical Support</option>
                    <option value="general-inquiry">General Inquiry</option>
                    <option value="feedback">Feedback & Suggestions</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Your Message{' '}
                    <span className="text-destructive">*</span>
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell us how we can help you..."
                    required
                    className="min-h-32 w-full min-w-0 resize-y rounded-xl border border-input bg-background px-3 py-3 text-sm leading-6 outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15 sm:px-4"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:h-12 sm:px-6"
                >
                  Send Message
                  <ArrowRight className="h-4 w-4" />
                </button>

                <p className="text-center text-xs leading-5 text-muted-foreground">
                  Your information should be handled securely and only used
                  to respond to your inquiry.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Support Categories */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-7xl px-2 py-10 sm:px-8 sm:py-20">
          <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary sm:text-sm sm:tracking-[0.2em]">
              How Can We Help?
            </span>

            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:mt-4 sm:text-4xl">
              Find the Right Support
            </h2>

            <p className="mt-3 text-sm leading-7 text-muted-foreground sm:mt-4 sm:text-base sm:leading-7">
              Choose the area that best matches your question so you can
              get the right assistance.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {supportItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-xl border bg-card p-2 transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 sm:rounded-2xl sm:p-7"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground sm:h-12 sm:w-12">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>

                  <h3 className="mt-4 text-base font-bold sm:mt-5 sm:text-lg">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-muted-foreground sm:mt-3 sm:text-sm sm:leading-7">
                    {item.description}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-primary sm:mt-5 sm:text-sm">
                    Get assistance
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-2 py-10 sm:px-8 sm:py-20">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl bg-primary px-3 py-10 text-center text-primary-foreground sm:rounded-3xl sm:px-12 sm:py-16">
          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border border-white/10" />
          <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full border border-white/10" />

          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 sm:h-14 sm:w-14 sm:rounded-2xl">
              <Headphones className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>

            <h2 className="mt-5 text-2xl font-bold tracking-tight sm:mt-6 sm:text-4xl">
              Need More Assistance?
            </h2>

            <p className="mt-3 text-sm leading-7 text-primary-foreground/80 sm:mt-4 sm:text-base sm:leading-8">
              We&apos;re here to help make your UniCore experience smoother.
              Reach out to us and tell us what you need.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:shadow-xl sm:mt-8 sm:px-6 sm:py-3.5"
            >
              Explore UniCore
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;

