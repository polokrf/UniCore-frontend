'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Home, BookOpen, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PaymentSuccess() {
  // You can pass real transaction data from search params or state
  const paymentDetails = {
    amount: '$150.00',
    transactionId: 'TXN-984201358',
    date: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    paymentMethod: 'Online Payment',
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-8">
        {/* Main Card */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-8 shadow-sm backdrop-blur-md text-center transition-all">
          {/* Top Decorative Circle & Success Icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 ring-8 ring-emerald-50/50">
            <CheckCircle2 className="h-10 w-10 text-emerald-600" />
          </div>

          {/* Title & Subtitle */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Payment Successful!
            </h1>
            <p className="text-sm text-slate-500">
              Thank you for your payment. Your enrollment request has been
              processed successfully.
            </p>
          </div>

          {/* Payment Summary Box */}
          <div className="mt-8 rounded-xl bg-slate-50/80 p-5 border border-slate-100 text-left space-y-3">
            <div className="flex justify-between items-center text-sm border-b border-slate-200/60 pb-2.5">
              <span className="text-slate-500 font-medium">Amount Paid</span>
              <span className="text-base font-bold text-slate-900">
                {paymentDetails.amount}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm border-b border-slate-200/60 pb-2.5">
              <span className="text-slate-500 font-medium">Transaction ID</span>
              <span className="font-mono text-xs font-semibold bg-slate-200/70 text-slate-800 px-2 py-0.5 rounded">
                {paymentDetails.transactionId}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm border-b border-slate-200/60 pb-2.5">
              <span className="text-slate-500 font-medium">Date</span>
              <span className="text-slate-700 font-medium">
                {paymentDetails.date}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm pt-0.5">
              <span className="text-slate-500 font-medium">Payment Method</span>
              <span className="text-slate-700 font-medium">
                {paymentDetails.paymentMethod}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
            <Button
              nativeButton={false}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm flex items-center justify-center gap-2 h-11 font-medium transition-all"
              render={<Link href="/student/my-course" />}
            >
              <BookOpen className="w-4 h-4" />
              My Courses
            </Button>

            <Button
              nativeButton={false}
              variant="outline"
              className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 h-11 flex items-center justify-center gap-2 font-medium transition-colors"
              render={<Link href="/student" />}
            >
              <Home className="w-4 h-4" />
              Dashboard
            </Button>
          </div>
        </div>

        {/* Footer Support Text */}
        <p className="text-center text-xs text-slate-400">
          Having trouble? Contact support at{' '}
          <a
            href="mailto:support@nexus.com"
            className="text-blue-600 underline hover:text-blue-700"
          >
            support@nexus.com
          </a>
        </p>
      </div>
    </div>
  );
}
