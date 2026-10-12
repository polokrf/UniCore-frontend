import apiFetch from '@/lib/apiFetch';
import { TApiResponse, TBkashCheckout } from '@/type/api.type';

// STUDENT: POST /api/payment/checkout/create
// The backend uses bKash (tokenized checkout), not Stripe/SSLCommerz.
// Redirect the browser to `bkashURL` from the response. After payment bKash
// calls GET /api/payment/checkout/callback on the backend, which redirects
// back to the frontend (see payment routes in the app).
export const createCheckout = (enrollmentId: string) =>
  apiFetch<TApiResponse<TBkashCheckout>>('/api/payment/checkout/create', {
    method: 'POST',
    body: { enrollmentId },
  });
