// ofetch errors carry the backend body in `error.data`
// ({ success:false, message, ... }). Show that instead of a generic text.
export function apiErrorMessage(err: unknown, fallback = 'Something went wrong') {
  const e = err as { data?: { message?: string }; message?: string };
  return e?.data?.message || fallback;
}
