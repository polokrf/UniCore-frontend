'use client';

import { Button } from '@/components/ui/button';
import { useUrlParams } from '@/hooks/use-url-params';

export default function UrlPagination({
  page,
  totalPage,
}: {
  page: number;
  totalPage: number;
}) {
  const { set } = useUrlParams();
  if (totalPage <= 1) return null;
  return (
    <div className="flex items-center justify-end gap-2 pt-3">
      <Button
        variant="outline"
        nativeButton={false}
        size="sm"
        disabled={page <= 1}
        onClick={() => set({ page: page - 1 })}
      >
        Previous
      </Button>
      <span className="text-muted-foreground text-xs">
        Page {page} of {totalPage}
      </span>
      <Button
        variant="outline"
        nativeButton={false}
        size="sm"
        disabled={page >= totalPage}
        onClick={() => set({ page: page + 1 })}
      >
        Next
      </Button>
    </div>
  );
}
