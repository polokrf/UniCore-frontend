import z from 'zod'
export const createDepartment = z.object({
  name: z.string('plz provide a string'),
  code: z.string('plz provide a string like CSE'),
  description: z.string('plz provide a string'),
});
