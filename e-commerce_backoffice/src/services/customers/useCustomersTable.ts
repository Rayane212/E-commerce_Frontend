import React, {useState, useEffect, useCallback } from 'react'
import { Customer } from '../../models/Customer';
import GetAllCustomers from './GetAllCustomers';
import FilterCustomers from './FilterCustomers';
import CustomerSort from './CustomerSort';
import CustomersResearch from './CustomersResearch';


class useCustomersTable{
    async GetCustomers() {
        const data = GetAllCustomers();
        return data;
    }

    async asyncFilterCustomers(){
        const data = await this.GetCustomers();
        const filter_data = FilterCustomers(data);
        return {data, filter_data};
    }

    async customerSearch(e: React.ChangeEvent<HTMLInputElement>){
        const searchValue = e.target.value;
        const allCustomers = await this.GetCustomers();
        if (searchValue !== '') {
            const result_list = CustomersResearch(allCustomers, searchValue);
            return result_list;
        }
        else{
            return allCustomers;
        }
    }

    async customerSort(e: React.ChangeEvent<HTMLSelectElement>, customers: Customer[]){
        const selectedOption = e.target.value;
        if (selectedOption !== ''){
            const index_for_slice = selectedOption.indexOf('_');
            if (index_for_slice !== undefined) {
                const sort_type = selectedOption.slice(0, index_for_slice);
                const sort_order = selectedOption.slice(index_for_slice + 1);
                const response_sort = CustomerSort(customers, sort_type, sort_order); 
                return response_sort;
            }
        }
    }

    async addOrder(){
        
    }

}


export default new useCustomersTable();
