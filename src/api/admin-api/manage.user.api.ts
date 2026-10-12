import apiFetch from "@/lib/apiFetch";

export const updateUserStatus = (payload: {id:string,status:string}) => {
  return apiFetch(`/api/user/update-status/${payload.id}`, {
    method: 'PATCH',
    body:{status: payload.status},
  });
};
