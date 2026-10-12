import { createResult, updateResult } from '@/api/result.api';
import { TResultUpdatePayload } from '@/type/api.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// both admin lists show results, so both are refreshed after a change
const useRefreshLists = () => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: ['getResults'] });
    queryClient.invalidateQueries({ queryKey: ['getEnrollments'] });
  };
};

export const useCreateResult = () => {
  const refresh = useRefreshLists();
  return useMutation({ mutationFn: createResult, onSuccess: refresh });
};

export const useUpdateResult = () => {
  const refresh = useRefreshLists();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TResultUpdatePayload }) =>
      updateResult(id, payload),
    onSuccess: refresh,
  });
};
