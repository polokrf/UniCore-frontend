import { Button } from '@/components/ui/button';
import {
  
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  
} from '@/components/ui/dialog';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@tanstack/react-form';

import {  useTeacherApply } from '@/hooks/applyStudent.teacher.hook';

import { toast } from '../ui/toast';
import { applyTeacher } from '@/validation/apply.validation';
import { apiErrorMessage } from '@/lib/apiError';
import { Spinner } from '../ui/spinner';
import { Textarea } from '../ui/textarea';

export function ApplyTeacherForm({
  departmentId,
  onSuccess,
}: {
  departmentId: string;
  onSuccess: () => void;
}) {
  const { mutate:teacher, isPending } = useTeacherApply();
  const form = useForm({
    defaultValues: {
      departmentId: departmentId,
      designation: '',
      phone: '',
      qualification: '',
      specialization: '',
      bio: '',
    },
    validators: {
      onSubmit: applyTeacher,
    },
    onSubmit: ({ value }) => {
      const data = {
        departmentId: value.departmentId,
        designation: value.designation,
        phone: value.phone,
        qualification: value.qualification,
        specialization: value.specialization,
        bio: value.bio,
      };

      teacher(data, {
        onSuccess: res => {
          toast.add({
            type: 'success',
            description: 'Teacher Apply Successful',
          });

          onSuccess();
        },
        onError: error => {
          toast.add({
            type: 'error',
            description: apiErrorMessage(error, 'Could not submit your application'),
          });
        },
      });
    },
  });

  

  return (
    <DialogContent className="sm:max-w-sm">
      <form
        onSubmit={e => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <DialogHeader>
          <DialogTitle>Apply as Student</DialogTitle>
          <DialogDescription>
            Tell us about your teaching background. An admin reviews your application and approves it.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          {/* designation Field */}
          <form.Field
            name="designation"
            children={field => {
              const inValid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={inValid}>
                  <Label htmlFor={field.name}>Designation</Label>
                  <Input
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={e => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    autoComplete="off"
                  />

                  {inValid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          {/* Phone Field */}
          <form.Field
            name="phone"
            children={field => {
              const inValid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={inValid}>
                  <Label htmlFor={field.name}>Phone</Label>
                  <Input
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={e => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    autoComplete="off"
                  />

                  {inValid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          {/*qualification*/}
          <form.Field
            name="qualification"
            children={field => {
              const inValid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={inValid}>
                  <Label htmlFor={field.name}>Qualification</Label>
                  <Input
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={e => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    autoComplete="off"
                  />

                  {inValid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          {/*specialization Field */}
          <form.Field
            name="specialization"
            children={field => {
              const inValid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={inValid}>
                  <Label htmlFor={field.name}>Specialization</Label>
                  <Input
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={e => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    autoComplete="off"
                  />

                  {inValid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          {/* bio Field */}
          <form.Field
            name="bio"
            children={field => {
              const inValid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={inValid}>
                  <Label htmlFor={field.name}>Bio</Label>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={e => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    autoComplete="off"
                  />

                  {inValid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </FieldGroup>
        <div className=" mt-2">
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit" disabled={isPending}>
              {isPending ? <Spinner /> : 'Submit application'}
            </Button>
          </DialogFooter>
        </div>
      </form>
    </DialogContent>
  );
}
