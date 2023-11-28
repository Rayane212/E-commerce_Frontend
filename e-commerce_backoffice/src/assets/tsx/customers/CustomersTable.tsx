import React, {useState, useEffect, useCallback} from 'react'
import { Customer } from '../../../models/Customer';
import CustomersTable_Header from '../../../views/customers/CustomersTable_Header';
import CustomersTable_List from '../../../views/customers/CustomersTable_List';
import GetAllCustomers from '../../../services/customers/GetAllCustomers';
import CustomersResearch from '../../../services/customers/CustomersResearch';
import FilterCustomers from '../../../services/customers/FilterCustomers';
import CustomerSort from '../../../services/customers/CustomerSort';
import Customers_NoResult from '../../../views/customers/Customers_NoResult';
import useCustomersTable from './useCustomersTable';

export default function CustomersTable() {

    const {state} = useCustomersTable();
    const showList = true; 
    if (!showList) {
        return (
            <div className='table_list'>
                <div className='results'>
                    <Customers_NoResult/>
                </div>
            </div>
        )
    }
    else{
        return (
            <div className='table_list'>
                <div className='results'>
                <table className='tg'>
                    <CustomersTable_Header/>
                    <CustomersTable_List data={state?.customers ?? []} />
                </table>
                </div>
            </div>
            
        )
    }
}
