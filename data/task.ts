import { db } from '@/lib/db';

const getTasks = async (userId: string) => {
  try {
    const tasks = await db.task.groupBy({
      by: ['status'],
      where: { userId },
    });

    return tasks;
  } catch (error) {
    return { error: 'An error occurred while fetching tasks' };
  }
};
