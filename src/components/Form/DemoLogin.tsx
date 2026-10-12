'use client';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useLoginFlow } from '@/hooks/auth.hook';
import { DEMO_ACCOUNTS } from '@/lib/demo';

// One click: sends the seeded demo credentials straight to the login API.
export default function DemoLogin() {
  const { login, isPending, variables } = useLoginFlow();

  return (
    <div className="space-y-2">
      <p className="text-muted-foreground text-center text-xs">
        Or try the app instantly with a demo account
      </p>
      <div className="grid gap-2 sm:grid-cols-3">
        {DEMO_ACCOUNTS.map(account => {
          console.log(account)
          const active = isPending && variables?.email === account.email;
          return (
            <Button
              key={account.email}
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => login({ email: account.email, password: account.password })}
            >
              {active ? <Spinner /> : account.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
