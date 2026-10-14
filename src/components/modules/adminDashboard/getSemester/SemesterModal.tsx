'use client';

import { useForm } from '@tanstack/react-form';
import { Building2, Code2, FileText, Loader2 } from 'lucide-react';

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
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

import { TDepartment } from '@/type/depart.type';
import { updateDepartment } from '@/validation/departmentUpdate.validation';
import { useUpdateDepartment } from '@/hooks/admin-hook/department.hook';
import { toast } from '@/components/ui/toast';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { ICourseGet } from '@/type/addminAccess/course.type';
import { updateCourse } from '@/validation/course.validation';
import { useUpdateCourse } from '@/hooks/admin-hook/course.hook';
import { updateSemester } from '@/validation/updateSemester.validation';
import { Label } from '@/components/ui/label';
import { ISemester } from '@/type/addminAccess/enrollments.type';
import { useUpdateSemester } from '@/hooks/admin-hook/semester.hook';


type CourseModalProps = {
  semester: ISemester;
};

export function SemesterModal({ semester }: CourseModalProps) {
  const [open, setOpen] = useState(false);
  const { mutate: update } = useUpdateSemester();
  const queryClient = useQueryClient();
  const form = useForm({
    defaultValues: {
      name:semester.name,
      year:semester.year,
      startDate:semester.startDate,
      endDate:semester.endDate,
      isActive:true
    },
    validators: {
      onSubmit:updateSemester,
    },

    onSubmit: async ({ value }) => {
      console.log('Updated Department:', value);
      const data = {
        payload: {
          ...value,
          startDate: new Date(value.startDate).toISOString(),
          endDate: new Date(value.endDate).toISOString(),
        },
        id: semester.id,
      };
       update(data, {
        onSuccess: res => {
          // console.log(res)
          toast.add({
            type: 'success',
            title: 'update course Successful',
          });
          queryClient.invalidateQueries({
            queryKey: ['get-all-semester'],
          });
          setOpen(false);
        },
        onError: err => {
          console.log(err);
          toast.add({
            type: 'error',
            title: 'Could not update the course',
            description: 'Something went wrong',
          });
        },
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" size="sm" className="gap-2">
            <Building2 className="size-4" />
            Update
          </Button>
        }
      />

      <DialogContent className="max-h-[90vh] overflow-y-auto p-0 sm:max-w-lg">
        {/* Header */}
        <DialogHeader className="border-b bg-muted/30 px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Building2 className="size-5" />
            </div>

            <div className="space-y-1">
              <DialogTitle className="text-xl font-semibold">
                Edit Semester
              </DialogTitle>

              <DialogDescription className="text-sm leading-6">
                Update your Semester information and manage its availability.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Form */}
        <form
          id={`semester-form-${semester.id}`}
          className="space-y-5 px-6 py-5"
          onSubmit={event => {
            event.preventDefault();
            event.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="name"
              children={field => {
                const inValid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <div>
                    <Field data-invalid={inValid}>
                      <Label htmlFor={field.name}>Semester Name</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        onBlur={field.handleBlur}
                        value={field.state.value}
                        onChange={e => field.handleChange(e.target.value)}
                        type="text"
                        placeholder="plz give you semester name"
                        autoComplete="off"
                      />
                      {inValid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  </div>
                );
              }}
            />

            <form.Field
              name="year"
              children={field => {
                const inValid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={inValid}>
                    <Label htmlFor={field.name}>Year</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={e => field.handleChange(Number(e.target.value))}
                      placeholder="plz give semester year"
                      onBlur={field.handleBlur}
                      autoComplete="off"
                      type="number"
                    />
                    {inValid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />
            <form.Field
              name="startDate"
              children={field => {
                const inValid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={inValid}>
                    <Label htmlFor={field.name}>StartDate</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={e => field.handleChange(e.target.value)}
                      placeholder="plz give semester start date"
                      onBlur={field.handleBlur}
                      autoComplete="off"
                      type="date"
                    />
                    {inValid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />
            <form.Field
              name="endDate"
              children={field => {
                const inValid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={inValid}>
                    <Label htmlFor={field.name}>EndDate</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={e => field.handleChange(e.target.value)}
                      placeholder="plz give semester End date"
                      onBlur={field.handleBlur}
                      autoComplete="off"
                      type="date"
                    />
                    {inValid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />

            {/* Department Status */}
            <form.Field name="isActive">
              {field => (
                <Field className="rounded-xl border p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <FieldLabel htmlFor={field.name}>
                        Semester Status
                      </FieldLabel>

                      <FieldDescription>
                        {field.state.value
                          ? 'This department is currently active.'
                          : 'This department is currently inactive.'}
                      </FieldDescription>
                    </div>

                    <Switch
                      id={field.name}
                      checked={field.state.value}
                      onCheckedChange={field.handleChange}
                      aria-label="Toggle department status"
                    />
                  </div>
                </Field>
              )}
            </form.Field>
          </FieldGroup>
        </form>

        {/* Footer */}
        <DialogFooter className="border-t bg-muted/20 px-6 py-4 sm:flex-row sm:justify-end">
          <DialogClose
            render={
              <Button type="button" variant="outline">
                Cancel
              </Button>
            }
          />

          <form.Subscribe
            selector={state => [state.isSubmitting, state.canSubmit]}
          >
            {([isSubmitting, canSubmit]) => (
              <Button
                type="submit"
                form={`semester-form-${semester.id}`}
                disabled={!canSubmit || isSubmitting}
                className="gap-2"
              >
                {isSubmitting && <Loader2 className="size-4 animate-spin" />}

                {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
              </Button>
            )}
          </form.Subscribe>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
