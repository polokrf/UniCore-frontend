import { updateUserStatus } from "@/api/admin-api/manage.user.api";
import { useMutation } from "@tanstack/react-query";

export const useUpdateUserStatus = () => {
  return useMutation({
    mutationFn:updateUserStatus,
  });
};
