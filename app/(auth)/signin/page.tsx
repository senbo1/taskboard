'use client';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import SubmitButton from '@/components/SubmitButton';
import { useRouter } from 'next/navigation';

interface pageProps {}

type FormStateType = {
  email: string;
  password: string;
};

const Page: FC<pageProps> = () => {
  const [formState, setFormState] = useState<FormStateType>({
    email: '',
    password: '',
  });
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn('credentials', {
      ...formState,
      redirect: false,
    }).then((res) => {
      if (res?.ok) {
        router.push('/');
      } else {
        console.log(res?.error);
      }
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={formState.email}
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={formState.password}
          required
          onChange={handleChange}
        />
        <SubmitButton>Sign in</SubmitButton>
      </form>
      <Button onClick={() => signIn('google', { callbackUrl: '/' })}>
        Sign in with Google
      </Button>
    </div>
  );
};

export default Page;
