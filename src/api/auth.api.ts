import apiFetch from "@/lib/apiFetch"
import { ILoginPayload, IRegisterPayload } from "@/type/auth.type"
import { IUserResponse } from "@/type/user.type"

export const userLogin=(payload:ILoginPayload)=>{
 return apiFetch('/api/auth/login',{method:'POST',body: payload})
}

export const userRegister=(payload:IRegisterPayload)=>{
   return apiFetch('/api/auth/register', { method: 'POST', body: payload });
}

export const getMe =()=>{
  return apiFetch<IUserResponse>('/api/auth/profile');
}

export const logout = ()=>{
   return apiFetch('/api/auth/logout',{method:'POST'});
}