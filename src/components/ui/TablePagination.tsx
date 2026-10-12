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

const paginationButton = (
  totalPage: number,
  page: number,
):(number | 'ellipsis' )[]=> {

 if(totalPage <= 7){
   return Array.from({ length: totalPage }, (_, index) => index + 1);
 }

 if(page <= 4){
  return [1,2,3,4,5,'ellipsis',totalPage]
 }

 if(page >= totalPage -3){
  return [
    totalPage - 4,
    totalPage -3,
    totalPage-2,
    totalPage-1,
    totalPage
  ]
 }

 return [1,'ellipsis',page-1 ,page,page+1,'ellipsis',totalPage]

};
interface Props {
  totalPage: number;
  handlePageChange: Dispatch<SetStateAction<number>>;
  page: number;
}

export function TablePagination({ totalPage, page, handlePageChange }: Props) {
  const goToPage = (page: number) => {
    handlePageChange(page);
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={`${page === 1 && ' pointer-events-none opacity-50'}`}
            onClick={() => goToPage(page - 1)}
          />
        </PaginationItem>

        {paginationButton(totalPage, page).map((item, index) =>
          item === 'ellipsis' ? (
            <PaginationItem key={`ellipsis${index}`}>
              <PaginationEllipsis></PaginationEllipsis>
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationLink
                isActive={page === item}
                onClick={() => goToPage(item as number)}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            className={`${page === totalPage && ' pointer-events-none opacity-50'}`}
            onClick={() => goToPage(page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
