import React from 'react'
import './pagination.css';
import usePagination from '../../../hooks/usePagination';

export default function Pagination({listLength, tableLoading, callback_pagination, options}: {listLength: number, tableLoading: any, callback_pagination: any, options: any}) {
  const paginationOptions = {
    listLength: listLength,
    options: {
      currentPage: options?.currentPage,
      itemsPerPage: options?.itemsPerPage
    }
  }  
  const {paginationState, changePage} = usePagination(paginationOptions);


    const handlePagination = (btn : any) => {
        tableLoading(true);
        setTimeout(() => {
            changePage(btn.textContent);
            callback_pagination(btn.textContent, paginationState?.itemsPerPage);
            tableLoading(false);
        }, 100);
    }

    const mapPagination = (index:number) => {
        const real_index = index + 1;
        const className = real_index === paginationState?.currentPage ? 'page_index index_active' : 'page_index';
        return (
          <li key={index} className={className}>
            <button className='btn' onClick={(btn : React.MouseEvent<HTMLButtonElement, MouseEvent>) => handlePagination(btn.target)}>{real_index}</button>
          </li>
        )
    
      }
  return (
    <div className='pagination_container'>
        <ul className='page_index_container'>
            {paginationState?.pageCount > 1 ? Array(paginationState?.pageCount).fill(0).map((_, index) => (
                mapPagination(index)
              )) : <></>}
        </ul>
    </div>
  )
}
