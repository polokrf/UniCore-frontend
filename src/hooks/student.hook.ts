'use client';

import {
  cancelEnrollment,
  enrollNow,
  getMyEnrollments,
} from '@/api/enrollment.api';
import { createCheckout } from '@/api/payment.api';
import { getMyStudentProfile, updateMyStudentProfile } from '@/api/profile.api';
import { getMyResults } from '@/api/result.api';
import { toast } from '@/components/ui/toast';
import { errorMessage } from '@/lib/format';
import { TApiResponse } from '@/type/api.type';
import { TMyEnrollment } from '@/type/domain.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const ENROLLMENTS = ['enrollments', 'me'];
const PROFILE = ['student-profile', 'me'];

// Every query below caches the raw API response and unwraps `.data` in `select`.
export const useMyEnrollments = () =>
  useQuery({
    queryKey: ENROLLMENTS,
    queryFn: getMyEnrollments,
    select: res => res.data,
  });

export const useMyResults = () =>
  useQuery({
    queryKey: ['results', 'me'],
    queryFn: getMyResults,
    select: res => res.data,
  });

export const useMyStudentProfile = () =>
  useQuery({
    queryKey: PROFILE,
    queryFn: getMyStudentProfile,
    select: res => res.data,
  });

// variables = courseOfferingId
export const useEnrollNow = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: enrollNow,
    onSuccess: () =>
      toast.add({ type: 'success', description: 'Enrolled. Pay the fee to confirm your seat.' }),
    onError: err =>
      toast.add({ type: 'error', description: errorMessage(err, 'Could not enroll') }),
    onSettled: () => qc.invalidateQueries({ queryKey: ENROLLMENTS }),
  });
};

// Optimistic: the row flips to CANCELLED instantly and rolls back on error.
export const useCancelEnrollment = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: cancelEnrollment,
    onMutate: async (id: string) => {
      await qc.cancelQueries({ queryKey: ENROLLMENTS });
      const previous = qc.getQueryData<TApiResponse<TMyEnrollment[]>>(ENROLLMENTS);
      if (previous) {
        qc.setQueryData<TApiResponse<TMyEnrollment[]>>(ENROLLMENTS, {
          ...previous,
          data: previous.data.map(e =>
            e.id === id ? { ...e, status: 'CANCELLED' } : e,
          ),
        });
      }
      return { previous };
    },
    onError: (err, _id, ctx) => {
      if (ctx?.previous) qc.setQueryData(ENROLLMENTS, ctx.previous);
      toast.add({ type: 'error', description: errorMessage(err, 'Could not cancel') });
    },
    onSuccess: () => toast.add({ type: 'success', description: 'Enrollment cancelled' }),
    onSettled: () => qc.invalidateQueries({ queryKey: ENROLLMENTS }),
  });
};

// bKash tokenized checkout: send the browser to the returned bkashURL.
// variables = enrollmentId
export const useCheckout = () =>
  useMutation({
    mutationFn: createCheckout,
    onSuccess: res => {
      const url = res.data?.bkashURL;
      if (url) {
        window.location.href = url;
        return;
      }
      toast.add({
        type: 'error',
        description: res.data?.statusMessage || 'bKash did not return a payment link',
      });
    },
    onError: err =>
      toast.add({ type: 'error', description: errorMessage(err, 'Could not start payment') }),
  });

export const useUpdateStudentProfile = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateMyStudentProfile,
    onSuccess: () => {
      toast.add({ type: 'success', description: 'Profile updated' });
      qc.invalidateQueries({ queryKey: PROFILE });
    },
    onError: err =>
      toast.add({ type: 'error', description: errorMessage(err, 'Update failed') }),
  });
};
