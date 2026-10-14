import z from 'zod'

export const updateDepartment = z.object({
  
  name: z.string('plz provide a string'),
  code: z.string('plz provide a string'),
  description: z.string('plz provide a string'),
  isActive: z.boolean('plz provide a string'),
});
