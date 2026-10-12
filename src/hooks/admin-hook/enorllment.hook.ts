import { getSingleEnrollments } from "@/api/admin-api/enrollment.api";
import { TSingleEnrollments } from "@/type/addminAccess/singleEnroment.type";

import { useQuery } from "@tanstack/react-query";

export const useGetSingleEnrollments = (id: string) => {
  return useQuery<TSingleEnrollments>({
    queryKey: ['getSingleEnrollments', id],
    queryFn: () => getSingleEnrollments(id),
    enabled:!!id
  });
};
