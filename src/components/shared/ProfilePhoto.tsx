'use client';

import { Button } from '@/components/ui/button';
import { useGetMe } from '@/hooks/auth.hook';
import { useUpdateProfilePhoto } from '@/hooks/profile.hook';
import Image from 'next/image';
import { useRef } from 'react';

export default function ProfilePhoto() {
  const { data } = useGetMe();
  const { mutate, isPending } = useUpdateProfilePhoto();
  const input = useRef<HTMLInputElement>(null);
  const user = data?.data;

  return (
    <div className="flex items-center gap-4">
      {user?.image ? (
        <Image
          src={user.image}
          alt={user.firstName}
          width={72}
          height={72}
          className="size-18 rounded-full object-cover"
        />
      ) : (
        <div className="bg-muted flex size-18 items-center justify-center rounded-full text-2xl font-semibold">
          {user?.firstName?.charAt(0).toUpperCase() ?? '?'}
        </div>
      )}
      <div className="space-y-1">
        <p className="font-medium">{user?.firstName}</p>
        <p className="text-muted-foreground text-xs">{user?.email}</p>
        <input
          ref={input}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) mutate(file);
            e.target.value = '';
          }}
        />
        <Button
          size="sm"
          variant="outline"
          
          disabled={isPending}
          onClick={() => input.current?.click()}
        >
          {isPending ? 'Uploading…' : 'Change photo'}
        </Button>
      </div>
    </div>
  );
}
