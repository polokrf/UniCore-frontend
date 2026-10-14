
import z from 'zod';

export const updateSemester = z
  .object({
    name: z
      .string('Please provide a valid semester name')
      .trim()
      .min(1, 'Semester name is required')
      .max(50, 'Semester name must be at most 50 characters'),

    year: z
      .number('Please provide a valid year')
      .int('Year must be an integer')
      .min(2000, 'Year must be at least 2000')
      .max(2100, 'Year must be at most 2100'),

    startDate: z
      .string()
      .min(1, 'Start date is required')
      .refine(value => !Number.isNaN(Date.parse(value)), {
        message: 'Please provide a valid start date',
      }),

    endDate: z
      .string()
      .min(1, 'End date is required')
      .refine(value => !Number.isNaN(Date.parse(value)), {
        message: 'Please provide a valid end date',
      }),

    isActive: z.boolean('isActive must be a boolean'),
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

