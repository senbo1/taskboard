'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  registerSchema,
  RegisterSchemaType,
} from '@/lib/validations/userSchema';
import { registerAction } from './actions';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import SubmitButton from '@/components/SubmitButton';
import { Input } from '@/components/ui/input';
import { useFormState } from 'react-dom';
import { useRef, useTransition } from 'react';
import { FormSucess } from '@/components/FormSucess';
import { FormError } from '@/components/FormError';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa';
import Link from 'next/link';

const initialState = {
  success: false,
  message: '',
  fields: undefined,
};

const Signup = () => {
  const [state, formAction] = useFormState(registerAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      ...(state.fields ?? {}),
    },
  });

  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className="w-full sm:max-w-sm mx-6 flex flex-col gap-3">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold opacity-70">Sign Up</h1>
          <p className="text-sm text-neutral-500">
            Create an account to start managing your tasks
          </p>
        </div>
        <Button onClick={() => signIn('google', { callbackUrl: '/' })}>
          <FaGoogle className="mr-2" />
          Sign Up with Google
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
            ref={formRef}
            action={formAction}
            onSubmit={form.handleSubmit(() => formRef.current?.submit())}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            {state.success && <FormSucess message={state.message} />}
            {!state.success && <FormError message={state.message} />}
            <SubmitButton>Register</SubmitButton>
          </form>
        </Form>
        <Link
          href="/signin"
          className="text-sm text-foreground/60 text-center underline underline-offset-4"
        >
          Already have an account? Sign In
        </Link>
      </div>
    </section>
  );
};

export default Signup;
