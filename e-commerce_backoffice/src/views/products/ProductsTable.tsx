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


interface TableProps {
    productState : ProductState;
    filter__view: any;
    sort_view: any;
    search_view: any;
    tableLoading: any;
    handlePagination: any;
    optionsList: Record<string, string>;
    tableHeaders: string[];
}

export default function ProductsTable({ productState, filter__view, sort_view, search_view, tableLoading, optionsList, tableHeaders, handlePagination }: TableProps) { 
    const columnsKeys = ['id', 'name', 'stock', 'is_listed', 'sell_price', 'supplier'];
    
    
    const handleSearch = (searchValue : string) => {
        if (searchValue !== '') {
            tableLoading(true);
            setTimeout(() => {
                search_view(searchValue);
                tableLoading(false);
            }, 100);
        }
        else{
            search_view(searchValue);
        }
    }

    const handleFilter = (filterValue : string) => {
        tableLoading(true);
        setTimeout(() => {
            filter__view(filterValue);
            tableLoading(false);
        }, 100);
        reinitInputs();
    }

    const reinitInputs = () => {
        const searchInput = document.getElementById('products_research') as HTMLInputElement;
        const sortSelect = document.getElementById('sort_select') as HTMLSelectElement;
        searchInput.value = '';
        sortSelect.value = 'id_asc';
    }
      

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
            <ProductTableFilter handleFilter={handleFilter} sort_view={sort_view} handleSearch={handleSearch} optionsList={optionsList}/>
            <div className='table_list'>
                {!productState?.isTableLoading && productState.tableLoaded ? tableComponent() : <Loader/>}
            </div>
            <Pagination listLength={parseInt((productState?.products?.activeList?.allList.length).toString())} tableLoading={tableLoading} callback_pagination={handlePagination} options={productState?.pagination}/>
        </div>
        
    )
}
