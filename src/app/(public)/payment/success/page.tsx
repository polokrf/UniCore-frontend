import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = { title: 'Payment successful | UniCore' };

export default function PaymentSuccessPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-16 text-center">
      <h1 className="text-2xl font-bold">Payment successful</h1>
      <p className="text-muted-foreground text-sm">
        Your payment was received and your enrollment is confirmed.
      </p>
      <Button render={<Link href="/student/payments" />}>View my payments</Button>
    </div>
  );
}
