'use client';

import { createCourse, getCourse } from "@/api/admin-api/course.api";
import { TCourseGetResponse } from "@/type/addminAccess/course.type";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetCourse = () => {
  return useQuery<TCourseGetResponse>({
    queryKey: ['get-all-course'],
    queryFn: getCourse,
  });
};

export const useCreateCourse = () => {
  return useMutation({
    mutationFn: createCourse,
  });
};