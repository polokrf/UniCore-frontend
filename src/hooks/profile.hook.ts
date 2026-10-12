'use client';

import { updateProfilePhoto } from '@/api/profile.api';
import { toast } from '@/components/ui/toast';
import { errorMessage } from '@/lib/format';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Shared by student and faculty profile pages
export const useUpdateProfilePhoto = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateProfilePhoto,
    onSuccess: () => {
      toast.add({ type: 'success', description: 'Photo updated' });
      qc.invalidateQueries({ queryKey: ['user'] });
    },
    onError: err =>
      toast.add({ type: 'error', description: errorMessage(err, 'Upload failed') }),
  });
};
