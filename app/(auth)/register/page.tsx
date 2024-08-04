'use client';
import SubmitButton from '@/components/SubmitButton';
import { register } from '@/actions/user.actions';

const page = () => {
  return (
    <div>
      <form action={register} onSubmit={(e) => e.preventDefault()}>
        <input type="text" name="name" placeholder="name" required />
        <input type="email" name="email" placeholder="email" required />
        <input
          type="password"
          name="password"
          placeholder="password"
          required
        />
        <SubmitButton>Register</SubmitButton>
      </form>
    </div>
  );
};

export default page;
