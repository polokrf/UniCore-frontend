'use client';

import React from 'react';
import Link from 'next/link';
import { AlertCircle, RefreshCw, ArrowLeft, LifeBuoy } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PaymentCancel() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-8">
        {/* Main Card */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-8 shadow-sm backdrop-blur-md text-center transition-all">
          {/* Top Decorative Circle & Cancel Icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-50 ring-8 ring-amber-50/50">
            <AlertCircle className="h-10 w-10 text-amber-600" />
          </div>

          {/* Title & Subtitle */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Payment Cancelled
            </h1>
            <p className="text-sm text-slate-500">
              Your payment process was cancelled or was not completed. No
              charges were made to your account.
            </p>
          </div>

          {/* Info Callout Box */}
          <div className="mt-8 rounded-xl bg-slate-50/80 p-5 border border-slate-100 text-left space-y-2">
            <h3 className="text-sm font-semibold text-slate-800">
              What happened?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              You may have closed the payment window or clicked back before
              completing the transaction. If you experienced a technical issue,
              you can try again anytime.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
            <Button
              nativeButton={false}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm flex items-center justify-center gap-2 h-11 font-medium transition-all"
              render={<Link href="/student/payments" />}
            >
              <RefreshCw className="w-4 h-4" />
              Try Payment Again
            </Button>

            <Button
              nativeButton={false}
              variant="outline"
              className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 h-11 flex items-center justify-center gap-2 font-medium transition-colors"
              render={<Link href="/student/my-course" />}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Courses
            </Button>
          </div>
        </div>

        {/* Footer Support Text */}
        <p className="text-center text-xs text-slate-400">
          Need help? Contact support at{' '}
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
