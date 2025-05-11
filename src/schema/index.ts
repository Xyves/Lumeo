import { z } from 'zod';

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
