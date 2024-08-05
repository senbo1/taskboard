'use server';

import bcrypt from 'bcryptjs';
import { getUserByEmail } from '@/data/user';
import { registerSchema } from '@/lib/validations/userSchema';
import { db } from '@/lib/db';

type RegisterActionState = {
  success: boolean;
  message: string;
  fields?: Record<string, string>;
};

export const registerAction = async (
  prevState: RegisterActionState,
  values: FormData
) => {
  const formData = Object.fromEntries(values);
  const validatedFields = registerSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid Credentials',
      fields: validatedFields.data,
    };
  }

  const { name, email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      success: false,
      message: 'Email already in use!',
      fields: validatedFields.data,
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: true, message: 'User registered successfully' };
};
