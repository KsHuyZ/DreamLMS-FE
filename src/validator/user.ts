import { z } from 'zod';

export const userSchema = z.object({
  firstName: z.string({ required_error: 'Please enter first name!' }),
  lastName: z.string({ required_error: 'Please enter last name!' }),
  email: z
    .string({ required_error: 'Please enter email!' })
    .email('Please enter correct email form'),
});
export type UserUpdateCredentials = z.infer<typeof userSchema>;

export const profileSchema = z.object({
  email: z.string().optional().or(z.literal('')),
  firstName: z.string().optional().or(z.literal('')),
  lastName: z.string().optional().or(z.literal('')),
  walletAddress: z
    .string()
    .optional()
    .or(
      z.literal('').refine((address) => /^[a-zA-Z0-9]{26,42}$/.test(address), {
        message: 'Invalid wallet address format',
      })
    ),
});
