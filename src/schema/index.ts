import { z } from 'zod';

export const RegisterSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  name: z.string().min(2, {
    message: 'Name is required',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long',
  }),
});
export type RegisterType = z.infer<typeof RegisterSchema>;
