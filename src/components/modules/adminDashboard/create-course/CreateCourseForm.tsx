'use client'
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { toast, Toast } from '@/components/ui/toast';
import { useCreateCourse } from '@/hooks/admin-hook/course.hook';
import { useGetDepartment } from '@/hooks/department.hook';
import { crateCourseValidation } from '@/validation/course.validation';
import { useForm } from '@tanstack/react-form';
import React from 'react';

const CreateCourseForm = () => {
  const { mutate:createCourse, isPending: insertPeending } = useCreateCourse();
  const{data} = useGetDepartment({ limit: 100 }) 
  const departments = data.data?.data || []

  const departmentItem = departments.map(department =>{
   const item = {
    value:department.id,
    label: department?.name
   }
   return item
  }
)



  const form =useForm({
    defaultValues:{
    departmentId: '',
    code:'',
    title:'',
    description:'',
    credit:0,
    },
    validators:{
      onSubmit:crateCourseValidation
    },
    onSubmit:({value})=>{
      const payload = {
        departmentId: value.departmentId,
        code:value.code,
        title:value.title,
        description: value.description,
        credit:value.credit,
      };
       createCourse(payload, {
         onSuccess: res => {
           // console.log(res)
           toast.add({
             type: 'success',
             title: 'Create Course Successful',
           });

           
         },
         onError:(err) => {
           console.log(err.message);
           toast.add({
             type: 'success',
             title: 'something was worn',
           });
         },
       });
    }
  })
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        {/* departmentId*/}
        <form.Field
          name="departmentId"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid}>
                {/* <Label htmlFor={field.name}>Gender</Label> */}
                
                <Label>Chose Department</Label>
                <Select
                  items={departmentItem}
                  value={field.state.value}
                  onValueChange={value => field.handleChange(value ?? '')}
                  autoComplete="off"
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Department</SelectLabel>

                      {departmentItem.map(item => (
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
        {/* course code */}
        <form.Field
          name="code"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid}>
                <Label htmlFor={field.name}>Course Code</Label>
                <Input
                  type="text"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  autoComplete="off"
                  placeholder="plz provide your course code"
                />

                {inValid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        {/* title */}
        <form.Field
          name="title"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid}>
                <Label htmlFor={field.name}>Title</Label>
                <Input
                  type="text"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  autoComplete="off"
                  placeholder="give course title"
                />

                {inValid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        {/*Description*/}
        <form.Field
          name="description"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid}>
                <Label htmlFor={field.name}>Description</Label>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  autoComplete="off"
                  placeholder="give course details"
                />

                {inValid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        {/* Address Field */}
        <form.Field
          name="credit"
          children={field => {
            const inValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={inValid}>
                <Label htmlFor={field.name}>Credit</Label>
                <Input
                  type="number"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(Number(e.target.value))}
                  onBlur={field.handleBlur}
                  autoComplete="off"
                  placeholder="give credit"
                />

                {inValid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
      </FieldGroup>


      <div className=" mt-2">
       
        
           <Button disabled={insertPeending} type="submit" className="w-full">
             {insertPeending ? <Spinner /> : 'Submit'}</Button>
     
      </div>
    </form>
  );
};

export default CreateCourseForm;