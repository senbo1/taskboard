'use client';

import { FC, useRef, useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import SubmitButton from '@/components/SubmitButton';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginSchemaType } from '@/lib/validations/userSchema';
import { FaGoogle } from 'react-icons/fa';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormError } from '@/components/FormError';
import Link from 'next/link';

interface pageProps {}

const Page: FC<pageProps> = () => {
  const [error, setError] = useState<string | null | undefined>();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const router = useRouter();

  const onSubmit = async (values: LoginSchemaType) => {
    const res = await signIn('credentials', { ...values, redirect: false });

    if (res?.ok) {
      router.push('/');
    } else {
      setError(res?.error);
    }
  };

  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className="w-full sm:max-w-sm mx-6 flex flex-col gap-3">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold opacity-70">Welcome Back</h1>
          <p className="text-sm text-neutral-500">
            Please enter your details to sign in.
          </p>
        </div>
        <Button onClick={() => signIn('google', { callbackUrl: '/' })}>
          <FaGoogle className="mr-2" />
          Sign In with Google
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">or</span>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <FormError message={error}></FormError>}
            <SubmitButton>Sign In</SubmitButton>
          </form>
        </Form>
        <Link
          href="/register"
          className="text-sm text-foreground/60 text-center underline underline-offset-4"
        >
          Don&apos;t have an account? Sign Up
        </Link>
      </div>
    </section>
  );
};

export default Page;
