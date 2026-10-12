'use client'

import { useEffect, useState } from "react";

export default function useDebounced<T>(value:T ,delay:number = 500){
   const [debouncedSearch, setDebouncedSearch]=useState(value);

   useEffect(()=>{
    const timer = setTimeout(()=> setDebouncedSearch(value),delay)
    return () => {
      clearTimeout(timer);
    }
   },[value,delay])

   return debouncedSearch
}