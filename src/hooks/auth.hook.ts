import { getMe, logout, userLogin, userRegister } from "@/api/auth.api";
import { toast } from "@/components/ui/toast";
import { dashboardPathFor } from "@/routes/dashboard";
import { useRouter } from "next/navigation";
import { IUserResponse } from "@/type/user.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useLogin =()=>{
 return  useMutation({
    mutationFn: userLogin,
  });
} 


export const useRegister = ()=>{
  return useMutation({
    mutationFn:userRegister
  })
}
export const useLogout = ()=>{
  return useMutation({
    mutationFn:logout
  })
}

export const useGetMe =()=>{
  return useQuery<IUserResponse>({
    queryKey:['user'],
    queryFn:getMe,
    retry:false
  })
}

// Logs in, refreshes the cached user and sends them to their role's dashboard.
export const useLoginFlow = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate, isPending, variables } = useLogin();

  const login = (body: { email: string; password: string }) =>
    mutate(body, {
      onSuccess: async () => {
        const me = await queryClient.fetchQuery({
          queryKey: ['user'],
          queryFn: getMe,
          staleTime: 0,
        });
        toast.add({ type: 'success', description: 'Logged in successfully' });
        router.push(dashboardPathFor(me.data.role));
      },
      onError: (err: unknown) => {
        const e = err as { data?: { message?: string } };
        toast.add({
          type: 'error',
          description: e?.data?.message ?? 'Wrong email or password',
        });
      },
    });

  return { login, isPending, variables };
};
