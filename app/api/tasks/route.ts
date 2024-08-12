import { db } from '@/lib/db';
import { taskSchema } from '@/lib/validations/task.schema';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const userId = 'clzi5dtls0000oniyfdsp2ate';

    const tasks = await db.task.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'An error occurred while fetching tasks', error },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = 'clzi5dtls0000oniyfdsp2ate';
    const res = await req.json();

    const validatedFields = taskSchema.safeParse(res);

    if (!validatedFields.success) {
      return NextResponse.json(
        { message: validatedFields.error.issues[0].message },
        { status: 400 }
      );
    }

    const { title, status } = validatedFields.data;

    const task = await db.task.create({
      data: {
        title,
        status,
        userId,
      },
    });

    return NextResponse.json({ task }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'An error occurred while creating a task', error },
      { status: 500 }
    );
  }
}
