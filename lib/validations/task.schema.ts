import z from 'zod';

export const taskSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title should be atleast 3 characters long' })
    .max(50, { message: 'Title should be atmost 50 characters long' }),
  status: z
    .enum(['TODO', 'DOING', 'DONE'], {
      message: 'Invalid status, status can only be todo|doing|done',
    })
    .optional(),
});

export type TaskSchema = z.infer<typeof taskSchema>;
