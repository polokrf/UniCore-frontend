

import { createClassRoutine } from "@/api/admin-api/create.class.routine";
import { deleteClassRoutine, getSingleClassRoutine, updateClassRoutine } from "@/api/routine.api";
import { IClassRoutine } from "@/type/addminAccess/get.class.routine.type";
import { TApiResponse } from "@/type/api.type";
import { useMutation,useQuery,useSuspenseQuery } from "@tanstack/react-query";



export const  useGetSingleClassRoutine=(id:string)=>{
  return useQuery<TApiResponse<IClassRoutine>>({
    queryKey: ['single-get-routine', id],
    queryFn:async () =>{
      const res = await getSingleClassRoutine(id);
      return res
    },
    enabled: !!id,
  });
} 


export const useCreateClassRoutine = () => {
  return useMutation({
    mutationFn: createClassRoutine,
  });
};
export const useUpdateClassRoutine = () => {
  return useMutation({
    mutationFn: updateClassRoutine,
  });
};


export const useDeleteClassRoutine = ()=>{
   return useMutation({
     mutationFn: deleteClassRoutine,
   });
}
 