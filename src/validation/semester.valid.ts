import z from 'zod';

export const createSemesterValidation = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, 'Semester name is required'),

    year: z
      .number()
      .int()
      .min(2000)
      .max(2100),

    startDate: z
      .string()
      .min(1, 'Start date is required'),

    endDate: z
      .string()
      .min(1, 'End date is required'),
  })
  .superRefine((data, ctx) => {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    if (startDate.getFullYear() !== data.year) {
      ctx.addIssue({
        code: 'custom',
        message: 'Start date year must match semester year',
        path: ['startDate'],
      });
    }

    if (endDate.getFullYear() !== data.year) {
      ctx.addIssue({
        code: 'custom',
        message: 'End date year must match semester year',
        path: ['endDate'],
      });
    }

    if (endDate <= startDate) {
      ctx.addIssue({
        code: 'custom',
        message: 'End date must be after start date',
        path: ['endDate'],
      });
    }
  });