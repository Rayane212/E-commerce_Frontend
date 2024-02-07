import React, {useState, useEffect} from 'react'



type HookProps = {
    listLength: number;
    options: {
        currentPage: number;
        itemsPerPage: number;
    }
}

export default function usePagination(paginationOptions: HookProps) {
    const [paginationState, setPaginationState] = useState({
        currentPage: paginationOptions?.options?.currentPage,
        pageCount: Math.ceil(paginationOptions?.listLength / paginationOptions?.options?.itemsPerPage),
        itemsPerPage: paginationOptions?.options?.itemsPerPage
    })
    
    
    
    const changePage = (value: string) => {
        setPaginationState((prevState: any) => ({
            ...prevState,
            currentPage: parseInt(value as string)
        }))
    }
  return {
        paginationState,
        changePage
  }
}
