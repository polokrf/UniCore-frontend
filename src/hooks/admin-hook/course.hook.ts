'use client';

import { createCourse, getCourse, updateCourse } from "@/api/admin-api/course.api";

import { TCourseGetResponse } from "@/type/addminAccess/course.type";
import { ICourseQuery } from "@/type/query.types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetCourse = (params:ICourseQuery) => {
  return useQuery<TCourseGetResponse>({
    queryKey: ['get-all-course',params],
    queryFn:()=> getCourse(params),
  });
};

export const useCreateCourse = () => {
  return useMutation({
    mutationFn: createCourse,
  });
};
export const useUpdateCourse = () => {
  return useMutation({
    mutationFn: updateCourse,
  });
};