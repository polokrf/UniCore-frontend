import z from 'zod';

export const crateCourseValidation = z.object({
  departmentId: z.string('give string value'),
  code: z.string('give string value'),
  title: z.string('give string value'),
  description: z.string('give string value'),
  credit: z.number('give  a number value'),
});


export const updateCourse = z.object({
  code: z.string('give string value'),
  title: z.string('give string value'),
  description: z.string('give string value'),
  credit: z.int('give  a number value'),
});
