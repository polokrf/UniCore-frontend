import z from 'zod';

export const createOfferingValid = z.object({
  courseId: z.string('plz provide a string value'),
  semesterId: z.string('plz provide a string value'),
  section: z.string('plz provide a string value'),
  capacity: z.number().int(),
  fee: z.number().int(),
  // '' means "no teacher"; the form leaves it out of the request then
  teacherId: z.string(),
});
