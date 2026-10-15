'use client';

import { useMemo, useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import {
  Search,
  ChevronDown,
  HelpCircle,
  GraduationCap,
  Users,
  BookOpen,
  CalendarDays,
  ShieldCheck,
  CreditCard,
  MessageCircleQuestion,
} from 'lucide-react';

export default function FaqPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = [
    { name: 'All', icon: HelpCircle },
    { name: 'General', icon: GraduationCap },
    { name: 'Students', icon: Users },
    { name: 'Academics', icon: BookOpen },
    { name: 'Schedules', icon: CalendarDays },
    { name: 'Account & Security', icon: ShieldCheck },
  ];

  const faqs = [
    {
      category: 'General',
      question: 'What is UniCore?',
      answer:
        'UniCore is a university management system designed to simplify academic and administrative operations. It helps universities manage students, teachers, departments, courses, class routines, enrollments, and academic results from one centralized platform.',
    },
    {
      category: 'General',
      question: 'Who can use UniCore?',
      answer:
        'UniCore supports different user roles, including administrators, teachers, and students. Each user can access the features and information permitted by their assigned role.',
    },
    {
      category: 'Students',
      question: 'How can students access their academic information?',
      answer:
        'Students can sign in to their accounts to access the academic information and services available to them. Depending on their permissions, these may include course enrollments, class routines, semester information, and results.',
    },
    {
      category: 'Students',
      question: 'How can I check my course enrollment?',
      answer:
        'After signing in, navigate to the course enrollment section. There, you can review the enrollment information available for your account, including the current enrollment status when provided by the system.',
    },
    {
      category: 'Academics',
      question: 'Can teachers manage their courses?',
      answer:
        'UniCore is designed to organize course-related information and academic activities. The specific actions available to a teacher depend on their assigned role and the permissions configured by the university administration.',
    },
    {
      category: 'Academics',
      question: 'How are academic results managed?',
      answer:
        'The academic results module helps authorized users organize and manage student result information. Access to view or manage results depends on the user’s role and permissions.',
    },
    {
      category: 'Schedules',
      question: 'Where can I find my class routine?',
      answer:
        'Open the class routine section after signing in. If your account has access to the relevant information, you can review the available schedule details, including class days, times, and rooms.',
    },
    {
      category: 'Schedules',
      question: 'What should I do if my class schedule looks incorrect?',
      answer:
        'Contact your department or university administrator and provide the relevant course, day, and time details. An authorized user can review the schedule and make corrections if needed.',
    },
    {
      category: 'Account & Security',
      question: 'How does UniCore protect user information?',
      answer:
        'UniCore is designed with role-based access control so users can access only the information and operations permitted for their roles. Always keep your login credentials private and sign out when using a shared device.',
    },
    {
      category: 'Account & Security',
      question: 'What should I do if I cannot access my account?',
      answer:
        'First, check that your login credentials are correct. If you still cannot access your account, contact your university administrator or the designated support team for assistance.',
    },
  ];

  const filteredFaqs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return faqs.filter(faq => {
      const matchesCategory =
        activeCategory === 'All' || faq.category === activeCategory;

      const matchesSearch =
        !query ||
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <main className="mx-auto w-full max-w-7xl space-y-10 px-2 py-10 sm:space-y-16 sm:px-8 sm:py-16 lg:py-20">
      {/* Page Header */}
      {/* Page Header */}
      <section className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between sm:pb-8">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-12 sm:w-12">
            <HelpCircle className="h-6 w-6" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Frequently Asked Questions
              </h1>

              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                FAQ
              </span>
            </div>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Find answers to common questions about UniCore and its academic
              management features.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start rounded-xl border bg-card px-3 py-2 text-sm text-muted-foreground sm:self-center">
          <MessageCircleQuestion className="h-4 w-4 text-primary" />
          <span>{faqs.length} Questions</span>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl border bg-card p-2 sm:rounded-3xl sm:p-8 lg:p-12">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl sm:h-64 sm:w-64" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary sm:h-16 sm:w-16">
            <MessageCircleQuestion className="h-7 w-7 sm:h-8 sm:w-8" />
          </div>

          <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground sm:text-sm">
            <HelpCircle className="h-4 w-4 text-primary" />
            Frequently Asked Questions
          </span>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Got Questions?
            <span className="mt-2 block text-primary">We Have Answers.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
            Find answers to common questions about UniCore, academic management,
            student services, class schedules, and account security.
          </p>

          {/* Search */}
          <div className="mx-auto mt-7 flex max-w-xl items-center gap-3 rounded-xl border bg-background p-2 shadow-sm transition focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 sm:mt-9 sm:p-3">
            <Search className="ml-1 h-5 w-5 shrink-0 text-muted-foreground" />

            <input
              type="search"
              value={search}
              onChange={event => {
                setSearch(event.target.value);
                setOpenIndex(null);
              }}
              placeholder="Search your questions..."
              aria-label="Search frequently asked questions"
              className="h-10 min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground sm:text-base"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="rounded-lg px-2 py-1 text-xs font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6" aria-label="Frequently asked questions">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            How can we help you?
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base">
            Browse topics or search for a specific answer.
          </p>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(category => {
            const Icon = category.icon;
            const isActive = activeCategory === category.name;

            return (
              <button
                key={category.name}
                type="button"
                onClick={() => {
                  setActiveCategory(category.name);
                  setOpenIndex(null);
                }}
                className={`inline-flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition sm:px-4 ${
                  isActive
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Questions */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <article
                  key={faq.question}
                  className={`overflow-hidden rounded-2xl border bg-card p-2 transition-all duration-200 sm:p-4 ${
                    isOpen
                      ? 'border-primary/40 shadow-sm'
                      : 'hover:border-primary/20'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-3 rounded-xl p-2 text-left sm:gap-4 sm:p-3"
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors sm:h-10 sm:w-10 ${
                        isOpen
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-primary/10 text-primary'
                      }`}
                    >
                      <HelpCircle className="h-5 w-5" />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold leading-6 text-foreground sm:text-base">
                        {faq.question}
                      </span>

                      <span className="mt-1 block text-xs text-muted-foreground">
                        {faq.category}
                      </span>
                    </span>

                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-primary' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="ml-2 border-t px-2 pb-3 pt-4 sm:ml-14 sm:px-4 sm:pb-4">
                      <p className="text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </article>
              );
            })
          ) : (
            <div className="rounded-2xl border border-dashed bg-card p-6 text-center sm:p-12">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-foreground">
                No questions found
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Try a different search term or select another category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setActiveCategory('All');
                  setOpenIndex(0);
                }}
                className="mt-5 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground sm:text-sm">
          Showing {filteredFaqs.length} of {faqs.length} questions
        </p>
      </section>

      {/* Contact Support CTA */}
      <section className="overflow-hidden rounded-2xl bg-primary p-2 text-primary-foreground sm:rounded-3xl sm:p-8 lg:p-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-foreground/10 sm:h-14 sm:w-14">
              <MessageCircleQuestion className="h-6 w-6" />
            </div>

            <div>
              <h2 className="text-xl font-bold sm:text-2xl">
                Still have questions?
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-primary-foreground/80 sm:text-base">
                If you need more help, visit our Contact page to find out how to
                reach the UniCore support team.
              </p>
            </div>
          </div>

          <a
            href="/contact"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:opacity-90"
          >
            Contact Us
            <ChevronDown className="h-4 w-4 -rotate-90" />
          </a>
        </div>
      </section>
    </main>
  );
}
