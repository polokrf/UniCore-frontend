'use client';

import { deleteDepartment, updateDepartment } from '@/api/department.api';
import { deleteClassRoutine } from '@/api/routine.api';
import { toast } from '@/components/ui/toast';
import { errorMessage } from '@/lib/format';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useToggleDepartment = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateDepartment,
    onSuccess: () => toast.add({ type: 'success', description: 'Department updated' }),
    onError: err =>
      toast.add({ type: 'error', description: errorMessage(err, 'Update failed') }),
    onSettled: () => qc.invalidateQueries({ queryKey: ['department'] }),
  });
};

export const useDeleteDepartment = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteDepartment,
    onSuccess: () => toast.add({ type: 'success', description: 'Department deleted' }),
    onError: err =>
      toast.add({
        type: 'error',
        description: errorMessage(err, 'Could not delete (departments with courses cannot be deleted)'),
      }),
    onSettled: () => qc.invalidateQueries({ queryKey: ['department'] }),
  });
};

export const useDeleteRoutine = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteClassRoutine,
    onSuccess: () => toast.add({ type: 'success', description: 'Class removed from the routine' }),
    onError: err =>
      toast.add({ type: 'error', description: errorMessage(err, 'Delete failed') }),
    onSettled: () => qc.invalidateQueries({ queryKey: ['class-routines'] }),
  });
};
