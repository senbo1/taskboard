'use client';
import { FC } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

interface pageProps {}

const page: FC<pageProps> = () => {
  return (
    <div>
      <Button onClick={() => signIn('google', { callbackUrl: '/' })}>
        Sign in with Google
      </Button>
    </div>
  );
};

export default page;
