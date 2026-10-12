'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

type TValue = string | number | null | undefined;

/**
 * Single source of truth for list state (search, filters, sort, page).
 * Everything lives in the URL so views are shareable, bookmarkable and survive
 * refresh / back-forward navigation.
 *
 * Components that use this must be rendered inside <Suspense> (Next.js rule
 * for useSearchParams).
 */
export function useUrlParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const get = useCallback(
    (key: string, fallback = '') => searchParams.get(key) ?? fallback,
    [searchParams],
  );

  const getNumber = useCallback(
    (key: string, fallback: number) => {
      const n = Number(searchParams.get(key));
      return Number.isFinite(n) && n > 0 ? n : fallback;
    },
    [searchParams],
  );

  // Empty values remove the key. Any change other than `page` resets to page 1.
  const set = useCallback(
    (updates: Record<string, TValue>) => {
      const next = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined || value === '') {
          next.delete(key);
        } else {
          next.set(key, String(value));
        }
      });
      if (!('page' in updates)) next.delete('page');
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  return { get, getNumber, set };
}
