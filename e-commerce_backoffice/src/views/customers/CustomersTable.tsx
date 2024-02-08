import React, {useState, useEffect} from 'react'
import { Customer } from '../../models/customers/Customer';
import TableList from '../general/TableList';
import NoResult from '../general/NoResult';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TableTitle from '../general/TableTitle';
import MapOptionsRecord from '../general/MapOptionsRecord';
import { CustomerState } from '../../hooks/useCustomers';
import Loader from '../general/Loader';
import CustomersTableFilter from './CustomersTableFilter';


interface TableProps {
    customerState : CustomerState;
    callback_filter: any;
    callback_search: any;
    callback_sort: any;
    optionsList: Record<string, string>;
    tableHeaders: string[];
}
export default function CustomersTable({ customerState, callback_filter, callback_search, callback_sort, optionsList, tableHeaders }: TableProps) { 
    const columnsKeys = ['id', 'lastname', 'email', 'orders_count', 'total_order_amount'];
    

    const tableComponent = () => {
        return (
            <div className='results'>
                {customerState?.showList ?
                    <table className='tg'>
                        <TableTitle list={tableHeaders}/>
                        <TableList list={customerState?.customers?.activeList?.slicedList} columnsKeys={columnsKeys}/>
                    </table> :
                 <NoResult/>}
            </div>
        )
    }
    return (
        <div className='table_container'>
            <CustomersTableFilter handleFilter={callback_filter} handleSort={callback_sort} handleSearch={callback_search} optionsList={optionsList}/>
            <div className='table_list'>
                {!customerState?.isTableLoading && customerState.tableLoaded ? tableComponent() : <Loader/>}
            </div>
        </div>
    )
}

