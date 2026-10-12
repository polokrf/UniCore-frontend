import apiFetch from '@/lib/apiFetch';
import { TApiResponse, TRoster, TRosterQuery } from '@/type/api.type';

// Teachers only get offerings assigned to them (403 otherwise); admins get any.
export const getRoster = (offeringId: string, query: TRosterQuery = {}) =>
  apiFetch<TApiResponse<TRoster>>(`/api/course-offering/${offeringId}/roster`, {
    query: {
      page: query.page,
      limit: query.limit,
      search: query.search || undefined,
      status: query.status || undefined,
    },
  });
