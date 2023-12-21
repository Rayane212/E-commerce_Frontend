import React, { useState, useEffect, useRef } from 'react'
import { Customer } from '../../../models/customers/Customer';
import CustomerService from '../../../services/customers/CustomerService';


type State = {
    customers_count: number
    percentageMarketing: string
    percentageOrders: string
}



export default function useCustomersRecap() {
    const [state, setState] = useState<State>()
    const isLoadding = useRef(false);



    function filterCustomers(customers: Customer[]){
        const suscribed_customers = CustomerService.FilterCustomers(customers).suscribedCustomers;
        const buy_customers = CustomerService.FilterCustomers(customers).buyCustomers;
        return {suscribed_customers, buy_customers};
    }

    function getCount(customers: Customer[]){
        const suscribed_customers_count = filterCustomers(customers).suscribed_customers.length;
        const buy_customers_count = filterCustomers(customers).buy_customers.length;
        const customers_count = customers.length as number;
        return {suscribed_customers_count, buy_customers_count, customers_count};
    }

    function getPercentages(customers: Customer[]){
        const counts = getCount(customers);
        const percentageMarketing = percentage(counts?.customers_count, counts?.suscribed_customers_count);
        const percentageOrders = percentage(counts?.customers_count, counts?.buy_customers_count)
        return {percentageMarketing, percentageOrders};
    }

    function percentage(total: number, count: number){
        let percentage = Math.round((count / total) * 100);
        return percentage + '%';
    }
    

    useEffect(() => {
        if(isLoadding.current) return;
        isLoadding.current = true;
        const customers = CustomerService?.GetCustomers().then((result) => {
            if (result !== undefined) {
                const counts = getCount(result);
                const percentages = getPercentages(result);
                setState({
                    customers_count: counts.customers_count as number,
                    percentageMarketing: percentages.percentageMarketing as string,
                    percentageOrders:  percentages.percentageOrders as string,
                })
            }
        })
    }, [])
    
    
    return {state}
}
