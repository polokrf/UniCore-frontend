'use client';

import { useForm } from '@tanstack/react-form';
import { z } from 'zod';

import { useSimpleGetEnrollments } from '@/hooks/admin-hook/enorllment.hook';
import { IEnrollment } from '@/type/addminAccess/enrollments.type';
import { createResult } from '@/validation/create.result.validation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
Card,
CardContent,
CardDescription,
CardHeader,
CardTitle,
} from '@/components/ui/card';

import {
Field,
FieldDescription,
FieldError,
FieldLabel,
} from '@/components/ui/field';
import { useCreateResult } from '@/hooks/admin-hook/result.hook';
import { TGrade } from '@/type/api.type';
import { toast } from '@/components/ui/toast';

const grades = [
{ value: 'A_PLUS', label: 'A+ (4.00)' },
{ value: 'A', label: 'A (3.75)' },
{ value: 'A_MINUS', label: 'A- (3.50)' },
{ value: 'B_PLUS', label: 'B+ (3.25)' },
{ value: 'B', label: 'B (3.00)' },
{ value: 'B_MINUS', label: 'B- (2.75)' },
{ value: 'C_PLUS', label: 'C+ (2.50)' },
{ value: 'C', label: 'C (2.25)' },
{ value: 'D', label: 'D (2.00)' },
{ value: 'F', label: 'F (0.00)' },
] as const;

type ResultFormValues = z.infer<typeof createResult>;

const getErrorMessage = (errors: unknown[]) =>
errors
.map((error) => {
if (typeof error === 'string') return error;


  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message;
  }

  return '';
})
.filter(Boolean)
.join(', ');


const CreateResultForm = () => {
const { data, isPending, isError } = useSimpleGetEnrollments();

const enrollments = (data?.data?.data ?? []) as IEnrollment[];

const {mutate:result}=useCreateResult()

const form = useForm({
defaultValues: {
enrollmentId: '',
marks: 0,
grade: 'A_PLUS',
gradePoint: 4,
},


validators: {
  onSubmit: createResult,
},

onSubmit: async ({ value }) => {
  const payload = {
    enrollmentId: value.enrollmentId,
    marks:value.marks,
    grade: value.grade as TGrade,
    gradePoint:value.gradePoint,
  };


  result(payload ,{
    onSuccess:()=>{
     toast.add({
      type:'success',
      title:'create result success fully'
     })

     form.reset()
    },
    onError:(err)=>{
     toast.add({
       type: 'error',
       title: err.message,
     });
     form.reset();
    }
  })


  
},


});

return (
  <Card className="mx-auto w-full max-w-2xl">
    {' '}
    <CardHeader>
      {' '}
      <CardTitle className="text-2xl font-bold">
        Create Student Result{' '}
      </CardTitle>
      <CardDescription>
        Select a student enrollment and enter the academic result.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form
        onSubmit={event => {
          event.preventDefault();
          event.stopPropagation();
          void form.handleSubmit();
        }}
        className="space-y-6"
      >
        {/* Enrollment */}
        <form.Field name="enrollmentId">
          {field => (
            <Field>
              <FieldLabel htmlFor={field.name}>Student Enrollment</FieldLabel>

              <select
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={event => field.handleChange(event.target.value)}
                disabled={isPending || isError}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">
                  {isPending
                    ? 'Loading enrollments...'
                    : 'Select student enrollment'}
                </option>

                {enrollments.map(enrollment => (
                  <option key={enrollment.id} value={enrollment.id}>
                    {enrollment.student.user.firstName} (
                    {enrollment.courseOffering.semester.name})
                  </option>
                ))}
              </select>

              <FieldDescription>
                Select the enrollment for which you want to create a result.
              </FieldDescription>

              {isError && (
                <p className="text-sm text-destructive">
                  Failed to load enrollments. Please try again.
                </p>
              )}

              {field.state.meta.isTouched &&
                field.state.meta.errors.length > 0 && (
                  <FieldError>
                    {getErrorMessage(field.state.meta.errors) ||
                      'Please select an enrollment.'}
                  </FieldError>
                )}
            </Field>
          )}
        </form.Field>

        {/* Marks */}
        <form.Field name="marks">
          {field => (
            <Field>
              <FieldLabel htmlFor={field.name}>Marks (0–100)</FieldLabel>

              <Input
                id={field.name}
                name={field.name}
                type="number"
                min={0}
                max={100}
                step={1}
                placeholder="Enter marks"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={event =>
                  field.handleChange(Number(event.target.value))
                }
              />

              {field.state.meta.isTouched &&
                field.state.meta.errors.length > 0 && (
                  <FieldError>
                    {getErrorMessage(field.state.meta.errors) ||
                      'Please enter valid marks.'}
                  </FieldError>
                )}
            </Field>
          )}
        </form.Field>

        {/* Grade */}
        <form.Field name="grade">
          {field => (
            <Field>
              <FieldLabel htmlFor={field.name}>Grade</FieldLabel>

              <select
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={event =>
                  field.handleChange(
                    event.target.value as ResultFormValues['grade'],
                  )
                }
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {grades.map(grade => (
                  <option key={grade.value} value={grade.value}>
                    {grade.label}
                  </option>
                ))}
              </select>

              {field.state.meta.isTouched &&
                field.state.meta.errors.length > 0 && (
                  <FieldError>
                    {getErrorMessage(field.state.meta.errors) ||
                      'Please select a valid grade.'}
                  </FieldError>
                )}
            </Field>
          )}
        </form.Field>

        {/* Grade Point */}
        <form.Field name="gradePoint">
          {field => (
            <Field>
              <FieldLabel htmlFor={field.name}>Grade Point (0–4)</FieldLabel>

              <Input
                id={field.name}
                name={field.name}
                type="number"
                min={0}
                max={4}
                step={0.01}
                placeholder="Enter grade point"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={event =>
                  field.handleChange(Number(event.target.value))
                }
              />

              {field.state.meta.isTouched &&
                field.state.meta.errors.length > 0 && (
                  <FieldError>
                    {getErrorMessage(field.state.meta.errors) ||
                      'Please enter a valid grade point.'}
                  </FieldError>
                )}
            </Field>
          )}
        </form.Field>

        {/* Submit */}
        <form.Subscribe
          selector={state => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              className="w-full"
              disabled={
                !canSubmit ||
                isSubmitting ||
                isPending ||
                isError ||
                enrollments.length === 0
              }
            >
              {isSubmitting ? 'Creating Result...' : 'Create Result'}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </CardContent>
  </Card>
);
};

export default CreateResultForm;
