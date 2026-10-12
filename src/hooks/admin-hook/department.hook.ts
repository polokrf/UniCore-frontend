'use client'

import { createDepartment } from "@/api/admin-api/department.api"
import { useMutation } from "@tanstack/react-query"

export const useCreateDepartment=()=>{
  return useMutation({
    mutationFn:createDepartment
  })
}