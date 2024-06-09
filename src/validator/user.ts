import { z } from 'zod';

export const userSchema = z.object({
  firstName: z.string({ required_error: 'Please enter first name!' }),
  lastName: z.string({ required_error: 'Please enter last name!' }),
  email: z
    .string({ required_error: 'Please enter email!' })
    .email('Please enter correct email form'),
});
export type UserUpdateCredentials = z.infer<typeof userSchema>;
