import { z } from 'zod';

export const lessonSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Lesson name must be at least 2 characters.',
    })
    .trim(),
  description: z.string().min(2, {
    message: 'Lesson content must be at least 2 characters.',
  }),
});
