import { z } from 'zod';

export const signUpSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required!',
    })
    .email('This is not valid email')
    .trim(),
  firstName: z
    .string({
      required_error: 'First name is required!',
    })
    .trim(),
  lastName: z.string({ required_error: 'Last name is required!' }).trim(),
  password: z.string({ required_error: 'Password is required!' }).trim(),
});

export const signInSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required!',
    })
    .email('This is not valid email')
    .trim(),
  password: z.string({ required_error: 'Password is required!' }).trim(),
  rememberMe: z.boolean().default(false),
});

export const forgetPasswordSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required!',
    })
    .email('This is not valid email')
    .trim(),
});
