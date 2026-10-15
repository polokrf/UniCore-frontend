'use client';

import React from 'react';
import Link from 'next/link';
import { XCircle, RefreshCw, HelpCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PaymentFailure() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-8">
        {/* Main Card */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-8 shadow-sm backdrop-blur-md text-center transition-all">
          {/* Top Decorative Circle & Failure Icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-rose-50 ring-8 ring-rose-50/50">
            <XCircle className="h-10 w-10 text-rose-600" />
          </div>

          {/* Title & Subtitle */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Payment Failed
            </h1>
            <p className="text-sm text-slate-500">
              We couldn't process your payment. Please review the issue and try
              again.
            </p>
          </div>

          {/* Error Details Box */}
          <div className="mt-8 rounded-xl bg-slate-50/80 p-5 border border-slate-100 text-left space-y-3">
            <h3 className="text-sm font-semibold text-slate-800">
              Possible Reasons:
            </h3>
            <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside leading-relaxed">
              <li>Insufficient funds or daily transaction limit exceeded.</li>
              <li>Incorrect card details, OTP, or PIN entered.</li>
              <li>Network timeout or gateway error from your provider.</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
            <Button
              nativeButton={false}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm flex items-center justify-center gap-2 h-11 font-medium transition-all"
              render={<Link href="/student/payments" />}
            >
              <RefreshCw className="w-4 h-4" />
              Retry Payment
            </Button>

            <Button
              nativeButton={false}
              variant="outline"
              className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 h-11 flex items-center justify-center gap-2 font-medium transition-colors"
              render={<Link href="/student" />}
            >
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </Button>
          </div>
        </div>

        {/* Footer Support Text */}
        <p className="text-center text-xs text-slate-400">
          If your account was debited, contact support at{' '}
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
