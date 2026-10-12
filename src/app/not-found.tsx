import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center gap-3 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-muted-foreground text-sm">This page could not be found.</p>
      <Button render={<Link href="/" />}>Go home</Button>
    </div>
  );
}
