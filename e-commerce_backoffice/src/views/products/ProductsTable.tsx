import React, {useState, useEffect, useCallback} from 'react'
import { Product } from '../../models/products/Product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TableTitle from '../general/TableTitle';
import TableList from '../general/TableList';
import NoResult from '../general/NoResult';
import MapOptions from '../general/MapOptionsRecord';
import useProductsTable from '../../hooks/useProductsTable';
import { ProductState } from '../../hooks/useProducts';
import ProductTableFilter from './ProductTableFilter';
import Loader from '../general/Loader';
import Pagination from '../general/pagination/Pagination';
import { PaginationState } from '../../hooks/usePagination';


interface TableProps {
    productState : ProductState;
    callback_filter: any;
    callback_search: any;
    callback_sort: any;
    optionsList: Record<string, string>;
    tableHeaders: string[];
}

export default function ProductsTable({ productState, callback_filter, callback_search, callback_sort, optionsList, tableHeaders }: TableProps) { 
    const columnsKeys = ['id', 'name', 'stock', 'is_listed', 'sell_price', 'supplier'];
    
    
    
      

    const tableComponent = () => {
        return (
            <div className='results'>
                {productState?.showList ?
                    <table className='tg'>
                        <TableTitle list={tableHeaders}/>
                        <TableList list={productState?.products?.activeList?.slicedList} columnsKeys={columnsKeys}/>
                    </table> :
                 <NoResult/>}
            </div>
        )
    }
   
    
    return (
        <div className='table_container'>
            <ProductTableFilter handleFilter={callback_filter} handleSort={callback_sort} handleSearch={callback_search} optionsList={optionsList}/>
            <div className='table_list'>
                {!productState?.isTableLoading && productState.tableLoaded ? tableComponent() : <Loader/>}
            </div>
        </div>
        
    )
}
