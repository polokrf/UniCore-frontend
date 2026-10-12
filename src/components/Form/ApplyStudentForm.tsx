import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@tanstack/react-form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

import { useStudentApply } from '@/hooks/applyStudent.teacher.hook';

import { toast } from '../ui/toast';
import { applyStudentProfile } from '@/validation/apply.validation';
import { apiErrorMessage } from '@/lib/apiError';
import { Spinner } from '../ui/spinner';

export function ApplyStudentForm({
  departmentId,
  onSuccess,
}: {
  departmentId: string;
  onSuccess: () => void;
}) {
  const { mutate: applyStudent, isPending } = useStudentApply();
  const form = useForm({
    defaultValues: {
      departmentId: departmentId,
      batch: 2000,
      phone: '',
      dateOfBirth: '',
      gender: '',
      address: '',
    },
    validators: {
      onSubmit: applyStudentProfile,
    },
    onSubmit: ({ value }) => {
      const data = {
        departmentId: value.departmentId,
        batch: value.batch,
        phone: value.phone,
        dateOfBirth: value.dateOfBirth,
        gender: value.gender,
        address: value.address,
      };

      applyStudent(data, {
        onSuccess: res => {
          // console.log(res);
          toast.add({
            type: 'success',
            description: 'Student Apply SuccessFul',
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

  const items = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ];

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
            Tell us about yourself. An admin reviews your application and approves it.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          {/* Batch Field */}
          <form.Field
            name="batch"
            children={field => {
              const inValid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={inValid}>
                  <Label htmlFor={field.name}>Batch</Label>
                  <Input
                    type="number"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={e => field.handleChange(Number(e.target.value))}
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
          {/*dateOfBirth*/}
          <form.Field
            name="dateOfBirth"
            children={field => {
              const inValid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={inValid}>
                  <Label htmlFor={field.name}>DateOfBirth</Label>
                  <Input
                    type="date"
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
          {/* gender Field */}
          <form.Field
            name="gender"
            children={field => {
              const inValid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={inValid}>
                  {/* <Label htmlFor={field.name}>Gender</Label> */}

                  <Select
                    items={items}
                    value={field.state.value}
                    onValueChange={value => field.handleChange(value ?? '')}
                    autoComplete="off"
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel> Gender</SelectLabel>

                        {items.map(item => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  {inValid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          {/* Address Field */}
          <form.Field
            name="address"
            children={field => {
              const inValid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={inValid}>
                  <Label htmlFor={field.name}>Address</Label>
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
