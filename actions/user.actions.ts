'use server';

import bcrypt from 'bcryptjs';
import { getUserByEmail } from '@/data/user';
import { registerSchema } from '@/lib/validations/userSchema';
import { db } from '@/lib/db';

export const register = async (values: FormData) => {
  const validatedFields = registerSchema.safeParse({
    name: values.get('name'),
    email: values.get('email'),
    password: values.get('password'),
  });

  if (!validatedFields.success) {
    return { error: 'Invalid Credentials' };
  }

  const { name, email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: 'Email already in use!' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: 'User registered successfully' };
};
