import z from 'zod';
import { da } from 'zod/locales';
export const loginPayload = z.object({
  email: z.email('plz provide valid email'),
  password: z.string().min(6, 'plz provide 6 digit pin number'),
});

export const registerPayload = z
  .object({
    firstName: z.string('not a string'),
    email: z.email('plz only provide email'),
    password: z.string().min(6, 'plz provide 6 digit pin number'),
    confirmPassword: z.string().min(6, 'plz provide 6 digit pin number'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'password and confirm password not match',
    path: ['confirmPassword'],
  });