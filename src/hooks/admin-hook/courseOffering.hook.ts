import { getTeachers } from '@/api/admin-api/admin.access.api';
import { createCourseOffering, getCourseOffering } from '@/api/admin-api/courseOffering.api';
import { assignOfferingTeacher } from '@/api/catalog.api';
import { catalogKeys } from '@/hooks/catalog.hook';
import { TCourseOfferingGetResponse } from '@/type/addminAccess/courseOffering.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// The admin offering list has its OWN key. It used to share ['get-all-course']
// with the course list, so the two lists overwrote each other's cache.
export const OFFERING_LIST_KEY = ['course-offerings'] as const;

// A new offering or a new teacher changes: the admin list, the offerings that
// students / faculty see, and the class rosters.
const useRefreshOfferings = () => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: OFFERING_LIST_KEY });
    queryClient.invalidateQueries({ queryKey: catalogKeys.offerings });
    queryClient.invalidateQueries({ queryKey: ['roster'] });
  };
};

export const useCourseOffering = () => {
  const refresh = useRefreshOfferings();
  return useMutation({
    mutationFn: createCourseOffering,
    onSuccess: refresh,
  });
};

export const useGetCourseOffering = () => {
  return useQuery<TCourseOfferingGetResponse>({
    queryKey: OFFERING_LIST_KEY,
    queryFn: getCourseOffering,
  });
};

export const useAssignOfferingTeacher = () => {
  const refresh = useRefreshOfferings();
  return useMutation({
    mutationFn: ({ id, teacherId }: { id: string; teacherId: string }) =>
      assignOfferingTeacher(id, teacherId),
    onSuccess: refresh,
  });
};

// Every teacher (any status) with name and department. The table needs the
// names of already-assigned teachers, the pickers filter for eligible ones.
export const useAllTeachers = () => {
  return useQuery({
    queryKey: ['teacher-options'],
    queryFn: () => getTeachers({ limit: 1000 }),
    select: res => res.data.data,
  });
};
