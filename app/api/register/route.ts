import bcrypt from 'bcryptjs';
import { getUserByEmail } from '@/data/user';
import { registerSchema } from '@/lib/validations/userSchema';
import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const validatedFields = registerSchema.safeParse(body);
    if (!validatedFields.success) {
      return new NextResponse(validatedFields.error.issues[0].message, {
        status: 400,
      });
    }

    const { name, email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return new NextResponse('Email is already in use.', { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return new NextResponse('User Registered', { status: 201 });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
