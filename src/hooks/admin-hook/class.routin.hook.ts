

import { createClassRoutine } from "@/api/admin-api/create.class.routine";
import { getSingleClassRoutine } from "@/api/routine.api";
import { IClassRoutine } from "@/type/addminAccess/get.class.routine.type";
import { TApiResponse } from "@/type/api.type";
import { useMutation,useQuery,useSuspenseQuery } from "@tanstack/react-query";

export const useCreateClassRoutine = () => {
  return useMutation({
    mutationFn: createClassRoutine,
  });
};

export const  useGetSingleClassRoutine=(id:string)=>{
  return useQuery<TApiResponse<IClassRoutine>>({
    queryKey: ['single get routine', id],
    queryFn: () => getSingleClassRoutine(id),
    enabled: !!id,
  });
} 
 