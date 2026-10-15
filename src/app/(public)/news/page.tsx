'use client';

import React, { useState } from 'react';
import {
  Newspaper,
  Search,
  Calendar,
  User,
  Tag,
  Clock,
  TrendingUp,
  BellRing,
  X,
  Bookmark,
  Share2,
  ChevronRight,
} from 'lucide-react';

// Sample News Data
const newsData = [
  {
    id: 1,
    title: 'UniCore Spring 2026 Semester Registration Notice & Schedule',
    category: 'Notice',
    date: '14 Oct, 2026',
    author: 'Academic Registrar',
    readTime: '3 min read',
    featured: true,
    summary:
      'Spring 2026 registration will officially commence from October 20th. All students are advised to clear outstanding dues before enrolling.',
    content: `All undergraduate and graduate students of UniCore are hereby notified that the Course Registration for the Spring 2026 semester will officially open on October 20, 2026. 

Key Instructions:
1. Clear all pending tuition fees and semester dues prior to registration.
2. Consult with your assigned Academic Advisor for course sequence approval.
3. Registration portals will remain accessible 24/7 during the scheduled registration window.

Late registration penalties will apply starting November 5, 2026.`,
  },
  {
    id: 2,
    title: 'UniCore Tech Team Wins National Inter-University Hackathon 2026',
    category: 'Achievement',
    date: '10 Oct, 2026',
    author: 'Dept. of CSE',
    readTime: '5 min read',
    featured: true,
    summary:
      'Team UniCore Bytes secured 1st position in AI & Web Innovation track at the National Tech Fest with their real-time automation project.',
    content: `We are thrilled to announce that Team "UniCore Bytes" from the Department of Computer Science & Engineering secured the Champion title at the National Inter-University Hackathon 2026!

The team built an AI-powered automated workflow manager that impressed the industry panel. The Vice-Chancellor praised the students for their innovative mindset and problem-solving skills.`,
  },
  {
    id: 3,
    title: 'Central Library Operating Hours Extended for Mid-Term Exams',
    category: 'Campus Life',
    date: '05 Oct, 2026',
    author: 'Library Admin',
    readTime: '2 min read',
    featured: false,
    summary:
      'To support students during mid-term preparations, the central library will remain open until 11:00 PM starting next week.',
    content: `In view of the upcoming Mid-Term examinations, the Central Library authority has extended its operating hours.

New Schedule:
• Saturday – Thursday: 8:00 AM – 11:00 PM
• Friday: 3:00 PM – 10:00 PM

High-speed Wi-Fi, silent study rooms, and reading pods will be accessible throughout the extended hours.`,
  },
  {
    id: 4,
    title: 'Workshop on Cloud Computing & Next.js Architecture Announced',
    category: 'Events',
    date: '01 Oct, 2026',
    author: 'UniCore IT Club',
    readTime: '4 min read',
    featured: false,
    summary:
      'Join us for an intensive hands-on workshop on modern cloud solutions, serverless backends, and full-stack web architecture.',
    content: `The UniCore IT Club is organizing a hands-on workshop on Cloud Infrastructure & Modern Web Development.

Topics Covered:
• Next.js App Router & Server Actions
• Microservices and API Gateway design
• Deployment pipelines on Cloud Platforms

Seats are limited! Registered participants will receive certificates of completion.`,
  },
  {
    id: 5,
    title: 'Annual Blood Donation Drive Collects Over 250 Bags',
    category: 'Campus Life',
    date: '25 Sep, 2026',
    author: 'Red Cross Club',
    readTime: '3 min read',
    featured: false,
    summary:
      'UniCore Blood Donors Club successfully organized its annual blood donation camp with overwhelming participation from students.',
    content: `The annual Blood Donation Drive organized by the UniCore Blood Donors Club concluded with remarkable success.

Over 250 bags of blood were collected in collaboration with local medical institutes. Special gratitude to all student volunteers, faculty members, and donors who participated in this noble cause.`,
  },
];

const categories = ['All', 'Notice', 'Achievement', 'Events', 'Campus Life'];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNews, setSelectedNews] = useState<(typeof newsData)[0] | null>(
    null,
  );

  // Filtering Logic
  const filteredNews = newsData.filter(item => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredNews = newsData.filter(item => item.featured);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <BellRing className="w-3.5 h-3.5" /> UniCore Bulletin & Newsfeed
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Campus <span className="text-indigo-400">News & Notices</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
            Stay updated with official academic notices, student achievements,
            upcoming events, and campus life updates.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto pt-4">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search notices, events, news..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-800/80 border border-slate-700/80 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm shadow-inner"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured News Section (Shown when category is 'All' and no search query) */}
        {selectedCategory === 'All' && !searchQuery && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-bold text-slate-900">
                Featured Headlines
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredNews.map(news => (
                <div
                  key={news.id}
                  onClick={() => setSelectedNews(news)}
                  className="bg-white p-6 sm:p-8 rounded-3xl border border-indigo-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg border border-indigo-100">
                        {news.category}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {news.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                      {news.title}
                    </h3>
                    <p className="text-slate-600 text-sm mt-3 line-clamp-3 leading-relaxed">
                      {news.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" /> {news.author}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {news.date}
                      </span>
                    </div>
                    <span className="text-indigo-600 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                      Read Full <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* News Feed Grid */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            {selectedCategory === 'All'
              ? 'Recent Updates'
              : `${selectedCategory} News`}
          </h2>

          {filteredNews.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <Newspaper className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-700">
                No News Found
              </h3>
              <p className="text-slate-500 text-sm mt-1">
                Try tweaking your search keyword or selecting a different
                category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map(news => (
                <div
                  key={news.id}
                  onClick={() => setSelectedNews(news)}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md">
                        {news.category}
                      </span>
                      <span className="text-xs text-slate-400">
                        {news.readTime}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-slate-500 text-xs mt-2 line-clamp-3 leading-relaxed">
                      {news.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {news.date}
                    </span>
                    <span className="text-indigo-600 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                      Details <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* News Details Modal (In-page Read Popup - No Navigation Needed) */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white max-w-2xl w-full rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-auto">
            {/* Modal Header */}
            <div className="p-6 sm:p-8 bg-slate-900 text-white relative">
              <button
                onClick={() => setSelectedNews(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-bold rounded-md">
                  {selectedNews.category}
                </span>
                <span className="text-xs text-slate-400">
                  • {selectedNews.readTime}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white pr-8 leading-snug">
                {selectedNews.title}
              </h2>

              <div className="flex items-center gap-4 mt-4 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5" /> {selectedNews.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {selectedNews.date}
                </span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 max-h-[50vh] overflow-y-auto space-y-4">
              <p className="text-slate-800 text-sm leading-relaxed whitespace-pre-line font-normal">
                {selectedNews.content}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 transition text-xs font-medium flex items-center gap-1.5">
                  <Bookmark className="w-4 h-4" /> Save
                </button>
                <button className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 transition text-xs font-medium flex items-center gap-1.5">
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>

              <button
                onClick={() => setSelectedNews(null)}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs rounded-xl shadow-md transition"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
