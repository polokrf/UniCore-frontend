'use client'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Dispatch, SetStateAction, useState } from 'react';


const paginationBtn = (totalPage: number,page:number):(number |'ellipsis')[] => {
  if (totalPage <= 7) {
    return Array.from({ length: totalPage }, (_, index) => index + 1);
  }

  if(page <= 4){
    return [1,2,3,4,5,'ellipsis',totalPage]
  }

  if(page >= totalPage -3){
   return [
    totalPage - 4 ,
    totalPage - 3,
    totalPage - 2 ,
    totalPage - 1,
    totalPage
  ]
  }

  return [1,'ellipsis',page-1,page,page + 1,'ellipsis',totalPage]

};

type Props = {
  totalPage: number;
  page: number;
  handleChangPage:Dispatch<SetStateAction<number>>
};

export function PagePagination({totalPage,handleChangPage,page}:Props) {
  
  const onGoPage=(pageBtn:number)=>{
   handleChangPage(pageBtn)
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={`${page === 1 && ' pointer-events-none opacity-50'}`}
            onClick={() => onGoPage(page - 1)}
          />
        </PaginationItem>

        {paginationBtn(totalPage, page).map((item, index) =>
          item === 'ellipsis' ? (
            <PaginationItem key={`ellipsis${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationLink
                isActive={page === item}
                onClick={() => onGoPage(item)}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            className={`${page === totalPage && ' pointer-events-none opacity-50'}`}
            onClick={() => onGoPage(page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
