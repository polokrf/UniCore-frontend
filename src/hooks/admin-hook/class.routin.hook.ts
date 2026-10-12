import { createClassRoutine } from "@/api/admin-api/create.class.routine";
import { useMutation } from "@tanstack/react-query";

export const useCreateClassRoutine = () => {
  return useMutation({
    mutationFn: createClassRoutine,
  });
};
