import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = { title: 'Payment cancelled | UniCore' };

export default async function PaymentCancelPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const failed = status === 'failure';
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-16 text-center">
      <h1 className="text-2xl font-bold">
        {failed ? 'Payment failed' : 'Payment cancelled'}
      </h1>
      <p className="text-muted-foreground text-sm">
        No money was taken. You can try again from your payments page.
      </p>
      <Button render={<Link href="/student/payments" />}>Back to payments</Button>
    </div>
  );
}
