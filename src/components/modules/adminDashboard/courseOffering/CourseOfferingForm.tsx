import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { toast, Toast } from '@/components/ui/toast';
import { useGetCourse } from '@/hooks/admin-hook/course.hook';
import { useCourseOffering } from '@/hooks/admin-hook/courseOffering.hook';
import { useGetSemester } from '@/hooks/admin-hook/semester.hook';
import { errorMessage } from '@/lib/format';
import TeacherSelect from './TeacherSelect';
import { createOfferingValid } from '@/validation/courseOffering.validation';

import { useForm } from '@tanstack/react-form';
import React from 'react';

const CourseOfferingForm = () => {
 
  const {data:courses,isLoading:courseLoading}=useGetCourse()

  const {data:semesters,isLoading:semesterLoading}=useGetSemester()

 
  const semesterData=semesters?.data || []
  const courseData =courses?.data || []
 
  
  const courseItems = courseData.map(
    item => {
      const course = {
        value: item.id,
        label: item.title,
      };

      return course;
    },
  );

  const semesterItems = semesterData.map(item =>{
    const semester ={
      value:item.id,
      label:item.name
    }

    return semester
  })


  const {mutate:createOffering ,isPending:insertPending}=useCourseOffering()


const form = useForm({
  defaultValues: {
  courseId:'',
  semesterId:'',
  section:'',
  capacity:0,
  fee:0,
  teacherId:''
  },
    validators: {
      onSubmit:createOfferingValid,
    },
    onSubmit: ({ value }) => {
      const payload = {
        courseId: value.courseId,
        semesterId:value.semesterId,
        section: value.section,
        capacity:value.capacity,
        fee:value.fee,
        // empty = no teacher; the backend validates and assigns it atomically
        ...(value.teacherId ? { teacherId: value.teacherId } : {}),
      };
      createOffering(payload, {
        onSuccess: () => {
          toast.add({
            type: 'success',
            title: 'Course offering created',
            description: payload.teacherId
              ? 'The teacher was assigned too.'
              : 'No teacher yet. Assign one from All-CourseOffering.',
          });
          form.reset();
        },
        onError: err => {
          // nothing was created (the backend does it all or nothing)
          toast.add({
            type: 'error',
            title: 'Could not create the offering',
            description: errorMessage(err, 'Something went wrong'),
          });
        },
      });
    },
  });

   if (courseLoading || semesterLoading) {
     return <p>loading...</p>;
   }
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        {/* CourseId*/}
        <form.Field
          name="courseId"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid}>
                {/* <Label htmlFor={field.name}>Gender</Label> */}

                <Label>Chose Course</Label>
                <Select
                  items={courseItems}
                  value={field.state.value}
                  onValueChange={value => {
                    field.handleChange(value ?? '');
                    form.setFieldValue('teacherId', '');
                  }}
                  autoComplete="off"
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Course</SelectLabel>

                      {courseItems.map(item => (
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
        {/* semester */}
        <form.Field
          name="semesterId"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid}>
                {/* <Label htmlFor={field.name}>Gender</Label> */}

                <Label>Chose semester</Label>
                <Select
                  items={semesterItems}
                  value={field.state.value}
                  onValueChange={value => field.handleChange(value ?? '')}
                  autoComplete="off"
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Semester</SelectLabel>

                      {semesterItems.map(item => (
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
        {/* section */}
        <form.Field
          name="section"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid}>
                <Label htmlFor={field.name}>Section</Label>
                <Input
                  type="text"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  autoComplete="off"
                  placeholder="plz provide section"
                />

                {inValid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        {/* Capacity */}
        <form.Field
          name="capacity"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid}>
                <Label htmlFor={field.name}>Capacity</Label>
                <Input
                  type="number"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(Number(e.target.value))}
                  onBlur={field.handleBlur}
                  autoComplete="off"
                  placeholder="give capacity"
                />

                {inValid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
       
      {/* Address Field */}
        <form.Field
          name="fee"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid}>
                <Label htmlFor={field.name}>Course Fee</Label>
                <Input
                  type="number"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(Number(e.target.value))}
                  onBlur={field.handleBlur}
                  autoComplete="off"
                  placeholder="give fee"
                />

                {inValid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
      {/* teacher (optional): only people who can teach the chosen course */}
        <form.Subscribe selector={state => state.values.courseId}>
          {courseId => (
            <form.Field
              name="teacherId"
              children={field => (
                <Field>
                  <Label htmlFor="teacherId">Teacher (optional)</Label>
                  <TeacherSelect
                    id="teacherId"
                    departmentId={courseData.find(c => c.id === courseId)?.departmentId}
                    value={field.state.value}
                    onChange={field.handleChange}
                    allowNone
                  />
                </Field>
              )}
            />
          )}
        </form.Subscribe>
      </FieldGroup>

      <div className=" mt-2">
        <Button disabled={insertPending} type="submit" className="w-full">
          {insertPending ? <Spinner /> : 'Submit'}
        </Button>
      </div>
    </form>
  );
};


export default CourseOfferingForm;