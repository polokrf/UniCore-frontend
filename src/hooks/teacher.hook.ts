'use client';

import { getTeacherProfiles, updateMyTeacherProfile } from '@/api/profile.api';
import { getRoster } from '@/api/roster.api';
import { TRosterQuery } from '@/type/api.type';
import { toast } from '@/components/ui/toast';
import { useGetMe } from '@/hooks/auth.hook';
import { useOfferings } from '@/hooks/catalog.hook';
import { errorMessage } from '@/lib/format';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';

const PROFILES = ['teacher-profiles'];

// The API has no "my teacher profile" endpoint, so find the row whose userId
// matches the logged-in user in the (approved) teacher list.
export const useMyTeacherProfile = () => {
  const { data: me } = useGetMe();
  const userId = me?.data.id;
  return useQuery({
    queryKey: PROFILES,
    queryFn: getTeacherProfiles,
    enabled: !!userId,
    select: res => res.data.find(t => t.userId === userId) ?? null,
  });
};

// Offerings are not filtered by teacher on the server, so filter here.
export const useMyOfferings = () => {
  const profile = useMyTeacherProfile();
  const offerings = useOfferings();
  const teacherId = profile.data?.id;
  const mine = useMemo(
    () => (offerings.data ?? []).filter(o => o.teacherId === teacherId),
    [offerings.data, teacherId],
  );
  return {
    mine,
    profile: profile.data ?? null,
    isPending: profile.isPending || offerings.isPending,
    isError: profile.isError || offerings.isError,
  };
};

export const useUpdateTeacherProfile = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateMyTeacherProfile,
    onSuccess: () => {
      toast.add({ type: 'success', description: 'Profile updated' });
      qc.invalidateQueries({ queryKey: PROFILES });
    },
    onError: err =>
      toast.add({ type: 'error', description: errorMessage(err, 'Update failed') }),
  });
};

// Class roster of one offering. `keepPreviousData` keeps the table steady while
// the next page / filter loads.
export const useRoster = (offeringId: string | undefined, query: TRosterQuery) =>
  useQuery({
    queryKey: ['roster', offeringId, query],
    queryFn: () => getRoster(offeringId as string, query),
    enabled: !!offeringId,
    select: res => res.data,
    placeholderData: prev => prev,
  });
