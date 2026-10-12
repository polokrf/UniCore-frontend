'use client';

import { Input } from '@/components/ui/input';
import useDebounced from '@/hooks/debounced';
import { useUrlParams } from '@/hooks/use-url-params';
import { useEffect, useState } from 'react';

// Search box that writes `?<paramKey>=...` (debounced) and resets the page.
export default function UrlSearch({
  paramKey = 'search',
  placeholder = 'Search...',
  className,
}: {
  paramKey?: string;
  placeholder?: string;
  className?: string;
}) {
  const { get, set } = useUrlParams();
  const [value, setValue] = useState(get(paramKey));
  const debounced = useDebounced(value.trim(), 400);

  useEffect(() => {
    if (debounced !== get(paramKey)) set({ [paramKey]: debounced });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  return (
    <Input
      type="search"
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder={placeholder}
      className={className}
    />
  );
}
