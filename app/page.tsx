'use client';

import { ModeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Playfair_Display } from 'next/font/google';
import { cn } from '@/lib/utils';

const playFairFont = Playfair_Display({ subsets: ['latin'] });

const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12 && currentHour > 6) return 'Good morning';
  else if (currentHour < 18) return 'Good afternoon';
  else if (currentHour < 24) return 'Good evening';
  else return 'Have a good late night';
};

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <main className="container min-h-screen">
      <header className="flex justify-between items-center py-4">
        <h1 className={cn(playFairFont.className, 'text-2xl font-bold')}>
          Taskboard
        </h1>
        <div className="flex items-center space-x-4">
          {session ? (
            <>
              <Button onClick={() => signOut()}>Sign out</Button>
            </>
          ) : (
            <Button onClick={() => router.push('/signin')}>Sign in</Button>
          )}
          <ModeToggle />
        </div>
      </header>

      <h2
        className={cn(
          playFairFont.className,
          'text-center text-4xl font-medium'
        )}
      >
        {getGreeting()},{' '}
        <span>{session?.user?.name?.split(' ')[0] ?? 'Guest'}</span>
      </h2>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
        <Card>
          <CardHeader>
            <CardTitle>todos</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Card>
              <CardHeader className="p-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  <p>First Todo</p>
                  <Button>Delete</Button>
                </CardTitle>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="p-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  <p>First Todo</p>
                  <Button>Delete</Button>
                </CardTitle>
              </CardHeader>
            </Card>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>on going</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>done 🎉</CardTitle>
          </CardHeader>
        </Card>
      </section>
    </main>
  );
}
