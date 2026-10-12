import z from 'zod';

export const applyStudentProfile = z.object({
  departmentId: z.string('department-uuid'),
  batch: z.int('give batch year'),
  phone: z.string().regex(/^01[3-9]\d{8}$/, 'Enter a valid Bangladesh phone number'),
  dateOfBirth: z.string('give string date'),
  gender: z.enum(['male', 'female', 'other']),
  address: z.string('give me string address like Naogaon, Bangladesh'),
});


export const applyTeacher = z.object({
  departmentId: z.string('only provide string departmentId'),
  designation: z.string('only provide string data'),
  phone: z.string().regex(/^01[3-9]\d{8}$/, 'Enter a valid Bangladesh phone number'),
  qualification: z.string('only provide string data'),
  specialization: z.string('only provide string data'),
  bio: z.string('only provide string data'),
});
