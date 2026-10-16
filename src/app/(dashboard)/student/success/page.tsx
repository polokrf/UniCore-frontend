'use client';

import React from 'react';
import { Check } from 'lucide-react';

export default function PaymentSuccess() {
return ( <div className="flex min-h-[80vh] items-center justify-center px-4"> <div className="flex w-full max-w-md flex-col items-center text-center">


    {/* Custom Success Icon */}
    <div className="relative mb-7 flex h-28 w-28 items-center justify-center">

      {/* Outer Glow */}
      <div className="absolute inset-0 animate-pulse rounded-full bg-emerald-100/70" />

      {/* Main Circle */}
      <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-xl shadow-emerald-200/60">

        {/* Inner Circle */}
        <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-white/30 bg-white/10">
          <Check
            className="h-12 w-12 text-white"
            strokeWidth={3}
          />
        </div>
      </div>

      {/* Decorative Dots */}
      <span className="absolute right-0 top-3 h-3 w-3 rounded-full bg-emerald-400" />
      <span className="absolute bottom-2 left-1 h-2.5 w-2.5 rounded-full bg-emerald-300" />
    </div>

    {/* Success Text */}
    <div className="space-y-3">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Payment Successful!
      </h1>

      <p className="mx-auto max-w-sm text-sm leading-6 text-slate-500 sm:text-base">
        Your payment has been completed successfully.
        Thank you for choosing UniCore!
      </p>
    </div>

    {/* Success Badge */}
    <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
      <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
      Payment Confirmed
    </div>

  </div>
</div>


);
}
