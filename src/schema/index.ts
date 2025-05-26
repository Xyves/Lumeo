import { z } from 'zod';

export const editProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .transform(val => (val === '' ? undefined : val))
    .refine(val => val === undefined || val.length >= 3, {
      message: 'Username must be at least 3 characters',
    })
    .refine(val => val === undefined || val.length <= 15, {
      message: 'Username must be at most 15 characters long',
    })
    .optional(),

  email: z
    .string()
    .trim()
    .transform(val => (val === '' ? undefined : val))
    .refine(
      val => val === undefined || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      { message: 'Please enter a valid email address' }
    )
    .optional(),
});
export const RegisterSchema = z.object({
  name: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(10, { message: 'Username must be at most 10 characters long' }),
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(15, { message: 'Password must be at most 15 characters long' })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    }) // Uppercase letter
    .regex(/\d/, { message: 'Password must contain at least one number' }),
});
