import { getSimpleEnrollments, getSingleEnrollments } from "@/api/admin-api/enrollment.api";
import { TEnrollments } from "@/type/addminAccess/enrollments.type";
import { TSingleEnrollments } from "@/type/addminAccess/singleEnroment.type";

import { useQuery } from "@tanstack/react-query";


export const useSimpleGetEnrollments = () => {
  return useQuery<TEnrollments>({
    queryKey: ['getEnrollments-simple'],
    queryFn: getSimpleEnrollments,
  });
};
export const useGetSingleEnrollments = (id: string) => {
  return useQuery<TSingleEnrollments>({
    queryKey: ['getSingleEnrollments', id],
    queryFn: () => getSingleEnrollments(id),
    enabled:!!id
  });
};
