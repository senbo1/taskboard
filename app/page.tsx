'use client';

import { ModeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'unauthenticated') {
    return router.push('/signin');
  }

  return (
    <main>
      <Button onClick={() => signOut()}>Sign Out</Button>
      <ModeToggle />
      <div>{JSON.stringify(session)}</div>
    </main>
  );
}
