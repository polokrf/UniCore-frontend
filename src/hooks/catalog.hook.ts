'use client';

import { getOfferings } from '@/api/catalog.api';
import { getClassRoutines } from '@/api/routine.api';
import { useQuery } from '@tanstack/react-query';

export const catalogKeys = {
  offerings: ['offerings'] as const,
  routines: ['class-routines'] as const,
};

export const useOfferings = () =>
  useQuery({
    queryKey: catalogKeys.offerings,
    queryFn: getOfferings,
    select: res => res.data,
  });

// Role-filtered by the backend (student / teacher / admin)
export const useClassRoutines = () =>
  useQuery({
    queryKey: catalogKeys.routines,
    queryFn: getClassRoutines,
    select: res => res.data,
  });
