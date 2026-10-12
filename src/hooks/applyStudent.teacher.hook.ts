import { applyStudent, applyTeacher } from "@/api/apply.student and teacher"
import { useMutation, useQueryClient } from "@tanstack/react-query"

// after a successful application the user's profile (which carries the
// application status) must be refetched
export const useStudentApply = ()=>{
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn:applyStudent,
    onSuccess:()=> queryClient.invalidateQueries({queryKey:['user']}),
  })
}
export const useTeacherApply = ()=>{
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn:applyTeacher,
    onSuccess:()=> queryClient.invalidateQueries({queryKey:['user']}),
  })
}
