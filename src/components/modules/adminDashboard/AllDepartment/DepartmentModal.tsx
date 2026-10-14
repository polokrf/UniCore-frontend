
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

type DepartmentModalProps = {
  department: TDepartment;
};



export function DepartmentModal({
  department,
}: DepartmentModalProps) {
const [open, setOpen] = useState(false);
  const {mutate:update}=useUpdateDepartment()
  const queryClient = useQueryClient()
  const form  = useForm({
    defaultValues: {
      name: department.name,
      code: department.code,
      description: department.description ?? '',
      isActive: department.isActive,
    },
    validators:{
     onSubmit:updateDepartment
    },

    onSubmit: async ({ value }) => {
      console.log('Updated Department:', value);
     const payload ={
      id:department.id,
       name: value.name,
      code:value.code,
      description:value.description ?? '',
      isActive: value.isActive,
     }
      update(payload, {
        onSuccess: res => {
          // console.log(res)
          toast.add({
            type: 'success',
            title: 'update Department Successful',
          });
         queryClient.invalidateQueries({
           queryKey: ['department'],
         });
         setOpen(false)
        },
        onError: err => {
          console.log(err)
          toast.add({
            type: 'error',
            title: 'Could not update the department',
            description:'Something went wrong',
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
                Edit Department
              </DialogTitle>

              <DialogDescription className="text-sm leading-6">
                Update your department information and manage its availability.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Form */}
        <form
          id={`department-form-${department.id}`}
          className="space-y-5 px-6 py-5"
          onSubmit={event => {
            event.preventDefault();
            event.stopPropagation();
            void form.handleSubmit();
          }}
        >
          {/* Department Name */}
          <FieldGroup>
            <form.Field name="name">
              {field => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Department Name
                      <span className="text-destructive">*</span>
                    </FieldLabel>

                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={event =>
                          field.handleChange(event.target.value)
                        }
                        placeholder="e.g. Computer Science"
                        className="h-11 pl-9"
                        aria-invalid={isInvalid}
                      />
                    </div>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Department Code */}
            <form.Field name="code">
              {field => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Department Code
                      <span className="text-destructive">*</span>
                    </FieldLabel>

                    <div className="relative">
                      <Code2 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={event =>
                          field.handleChange(event.target.value.toUpperCase())
                        }
                        placeholder="e.g. CSE"
                        className="h-11 pl-9 uppercase"
                        aria-invalid={isInvalid}
                      />
                    </div>

                    <FieldDescription>
                      Use a unique short code for this department.
                    </FieldDescription>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Description */}
            <form.Field name="description">
              {field => (
                <Field>
                  <FieldLabel htmlFor={field.name}>
                    Description
                    <span className="text-muted-foreground">(Optional)</span>
                  </FieldLabel>

                  <div className="relative">
                    <FileText className="absolute left-3 top-3 size-4 text-muted-foreground" />

                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={event => field.handleChange(event.target.value)}
                      placeholder="Write a short description about this department..."
                      className="min-h-28 resize-y pl-9"
                      rows={4}
                    />
                  </div>

                  <FieldDescription>
                    Provide a brief overview of the department.
                  </FieldDescription>
                </Field>
              )}
            </form.Field>

            {/* Department Status */}
            <form.Field name="isActive">
              {field => (
                <Field className="rounded-xl border p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <FieldLabel htmlFor={field.name}>
                        Department Status
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
                form={`department-form-${department.id}`}
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

