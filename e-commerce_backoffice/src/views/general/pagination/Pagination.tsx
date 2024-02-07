import React from 'react'
import './pagination.css';
import { PaginationState } from '../../../hooks/usePagination';

export default function Pagination({paginationState, callback_pagination}: {paginationState: PaginationState, callback_pagination: any}) {

  return (
    <div className='pagination_container'>
        <ul className='page_index_container'>
            {Array(paginationState?.pageCount).fill(0).map((_, index) => {
              const real_index = index + 1;
              return (
                <li key={real_index} className={paginationState?.currentPage === real_index ? 'page_index index_active' : 'page_index'}>
                  <button className='btn' onClick={(btn : React.MouseEvent<HTMLButtonElement>) => callback_pagination(real_index)}>{real_index}</button>
                </li>
              );
            })}
        </ul>
    </div> 
  )
}
