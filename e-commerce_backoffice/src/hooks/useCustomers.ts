import React, {useState, useEffect, useCallback} from 'react'
import { Customer } from '../models/customers/Customer';
import { apiFetch } from '../services/apiFetch';


interface CustomerState {
    list : Customer[];
    isLoading: boolean;
    showList: boolean;
}

export default function useCustomers() {
    const [customerState, setCustomerState] = useState<CustomerState>();
    
    const getCustomers = useCallback(async () => {
        setCustomerState((prevState: any) =>({
            ...prevState,
            isLoading: true
        }))
        apiFetch('customers/get', {method: 'GET'})
        .then((result:any) => {
            if (result !== undefined) {
                setCustomerState((prevState: any) =>({
                    ...prevState,
                    isLoading: false,
                    showList: true,
                    list: result
                }))
            }
        })
    }, [])

    const getCustomerById = (id: string) => {
        if (customerState?.list === undefined || customerState?.list.length === 0) return
        const customer =  customerState?.list.find((customer) => customer.id === id)
        return customer
    }

    useEffect(() => {  
        getCustomers();
    }, [])

    return {
        customerState,
        getCustomerById
    }
}
