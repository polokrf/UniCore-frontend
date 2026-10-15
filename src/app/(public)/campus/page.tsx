'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  BookOpen,
  Users,
  Trophy,
  MapPin,
  Calendar,
  ArrowRight,
  Building2,
  Sparkles,
  Award,
} from 'lucide-react';

// Sample Data
const stats = [
  { id: 1, label: 'Departments', value: '12+', icon: BookOpen },
  { id: 2, label: 'Active Students', value: '5,000+', icon: Users },
  { id: 3, label: 'Expert Faculty', value: '150+', icon: GraduationCap },
  { id: 4, label: 'Clubs & Society', value: '25+', icon: Trophy },
];

const departments = [
  {
    id: 1,
    name: 'Computer Science & Engineering',
    code: 'CSE',
    students: '1,200+',
  },
  {
    id: 2,
    name: 'Electrical & Electronic Engineering',
    code: 'EEE',
    students: '800+',
  },
  { id: 3, name: 'Business Administration', code: 'BBA', students: '950+' },
  { id: 4, name: 'Civil Engineering', code: 'CE', students: '650+' },
];

const facilities = [
  {
    title: 'Central Digital Library',
    desc: 'Access to over 50,000+ physical books & online research journals with high-speed Wi-Fi.',
    category: 'Academic',
  },
  {
    title: 'Advanced AI & Software Lab',
    desc: 'Equipped with modern GPU workstations for high-performance computing and research.',
    category: 'Technology',
  },
  {
    title: 'Sports Complex & Gymnasium',
    desc: 'Indoor & outdoor sports facilities including football turf, basketball, and fitness gym.',
    category: 'Recreation',
  },
  {
    title: 'Student Cafeteria & Lounge',
    desc: 'Hygienic food, open lounge area, and collaborative spaces for project discussions.',
    category: 'Life on Campus',
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: 'UniCore Inter-University Hackathon 2026',
    date: '28 Oct, 2026',
    location: 'Auditorium Hall A',
    tag: 'Tech Event',
  },
  {
    id: 2,
    title: 'Annual Cultural Fest & Freshers Orientation',
    date: '10 Nov, 2026',
    location: 'Main Campus Ground',
    tag: 'Cultural',
  },
  {
    id: 3,
    title: 'National Career & Innovation Fair',
    date: '02 Dec, 2026',
    location: 'Central Plaza',
    tag: 'Career',
  },
];

export default function CampusPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-slate-900 to-blue-900 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" /> Welcome to UniCore Campus Life
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
            Explore <span className="text-indigo-400">UniCore</span> Academic
            Environment
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-300 mb-8 leading-relaxed">
            Discover a vibrant community dedicated to innovation, research,
            academic excellence, and holistic student development.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/chose-department"
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition duration-200 shadow-lg shadow-indigo-600/30 flex items-center gap-2"
            >
              Explore Departments <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#facilities"
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium transition duration-200"
            >
              Campus Facilities
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-100">
          {stats.map(stat => {
            const Icon = stat.icon;
            return (
              <div key={stat.id} className="text-center p-4">
                <div className="inline-flex p-3 rounded-xl bg-indigo-50 text-indigo-600 mb-3">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900">
                  {stat.value}
                </h3>
                <p className="text-sm text-slate-500 font-medium mt-1">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Departments Section */}
      <section
        id="departments"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">
            Academic Departments
          </h2>
          <p className="text-slate-600 mt-2">
            World-class education tailored for future industry leaders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map(dept => (
            <div
              key={dept.id}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold px-2.5 py-1 bg-indigo-100 text-indigo-700 rounded-lg">
                  {dept.code}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {dept.students} Students
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {dept.name}
              </h3>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-medium text-indigo-600">
                <span>View Syllabus</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Facilities Section */}
      <section
        id="facilities"
        className="bg-slate-100/70 py-20 border-y border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              Campus Facilities
            </h2>
            <p className="text-slate-600 mt-2">
              Everything you need to thrive both academically and socially.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {facilities.map((facility, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex gap-4"
              >
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl h-fit">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                    {facility.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">
                    {facility.title}
                  </h3>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                    {facility.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Upcoming Campus Events
            </h2>
            <p className="text-slate-600 mt-2">
              Stay updated with the latest activities and workshops.
            </p>
          </div>
    
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map(event => (
            <div
              key={event.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition duration-200"
            >
              <span className="inline-block px-3 py-1 bg-amber-50 text-amber-700 font-medium text-xs rounded-full mb-4">
                {event.tag}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                {event.title}
              </h3>
              <div className="space-y-2 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA / Join Club Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Want to join UniCore Student Clubs?
            </h2>
            <p className="text-indigo-100 max-w-xl">
              Get involved in programming clubs, robotics, debate, sports, and
              cultural societies to enhance your skillsets.
            </p>
          </div>
          <Link
            href="/chose-department"
            className="px-6 py-3 bg-white text-indigo-600 hover:bg-indigo-50 rounded-xl font-semibold shadow-md transition duration-200 whitespace-nowrap"
          >
            Apply for Membership
          </Link>
        </div>
      </section>
    </div>
  );
}
