'use client';

import useDebounced from '@/hooks/debounced';
import { useUrlParams } from '@/hooks/use-url-params';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

/*
 * useState-shaped adapters over hooks/use-url-params, so the admin list tabs
 * keep their code and only their state moves into the URL
 * (?search=ali&status=PENDING&page=2). Components using these must sit
 * inside <Suspense>.
 */

export function useUrlPageState(): [number, Dispatch<SetStateAction<number>>] {
  const { getNumber, set } = useUrlParams();
  const page = getNumber('page', 1);
  const setPage = useCallback(
    (next: SetStateAction<number>) => {
      const n = typeof next === 'function' ? next(page) : next;
      set({ page: n <= 1 ? null : n });
    },
    [page, set],
  );
  return [page, setPage];
}

// A filter with a fixed set of values. Unknown values in a hand-edited URL
// fall back to `fallback`, so they never reach the API.
export function useUrlEnumState<T extends string>(
  key: string,
  fallback: T,
  allowed: readonly T[],
): [T, (value: T) => void] {
  const { get, set } = useUrlParams();
  const raw = get(key, fallback) as T;
  const value = allowed.includes(raw) ? raw : fallback;
  const setValue = useCallback(
    (next: T) => set({ [key]: next === fallback ? null : next }),
    [key, fallback, set],
  );
  return [value, setValue];
}

// Free-text search. The input stays instant (local state); the URL is updated
// after a short pause, and back/forward navigation updates the input again.
export function useUrlSearchState(key = 'search'): [string, (value: string) => void] {
  const { get, set } = useUrlParams();
  const fromUrl = get(key);
  const [text, setText] = useState(fromUrl);
  const debounced = useDebounced(text, 400);
  const pushed = useRef(fromUrl);
  const setRef = useRef(set);
  setRef.current = set;

  useEffect(() => {
    if (debounced === pushed.current) return;
    pushed.current = debounced;
    setRef.current({ [key]: debounced || null });
  }, [debounced, key]);

  useEffect(() => {
    if (fromUrl !== pushed.current) {
      pushed.current = fromUrl;
      setText(fromUrl);
    }
  }, [fromUrl]);

  return [text, setText];
}
