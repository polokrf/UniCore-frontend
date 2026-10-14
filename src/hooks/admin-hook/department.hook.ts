'use client'

import { createDepartment } from "@/api/admin-api/department.api"
import { updateDepartment } from "@/api/department.api"
import { useMutation } from "@tanstack/react-query"

export const useCreateDepartment=()=>{
  return useMutation({
    mutationFn:createDepartment
  })
}
export const useUpdateDepartment=()=>{
  return useMutation({
    mutationFn:updateDepartment
  })
}