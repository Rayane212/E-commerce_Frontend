import React, {useState, useEffect} from 'react'


export type PaginationState = {
    currentPage: number;
    itemsPerPage: number;
    pageCount: number;
}



export default function usePagination() {
    const [paginationState, setPaginationState] = useState<PaginationState>({
        currentPage: 1,
        itemsPerPage: 10,
        pageCount: 0
    })
    
    
    
    const changePage = (value: number) => {
        setPaginationState((prevState: any) => ({
            ...prevState,
            currentPage: value as number
        }))
    }

    const changeItemsPerPage = (value: number) => {
        setPaginationState((prevState: any) => ({
            ...prevState,
            itemsPerPage: value as number
        }))
    }

    

    const changePageCount = (listLength: number) => {
        const pageCount = Math.ceil(listLength / paginationState.itemsPerPage);
        setPaginationState((prevState: any) => ({
            ...prevState,
            pageCount: pageCount
        }))
    }

  return {
        paginationState,
        changePage,
        changePageCount
  }
}
