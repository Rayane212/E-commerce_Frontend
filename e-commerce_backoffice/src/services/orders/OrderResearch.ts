import React from 'react'
import { Order } from '../../models/orders/Order';
import FormatDate from '../general/FormatDate';
import useCustomers from '../../hooks/useCustomers';

export interface OrderSearch {
    orders: Order[];
    isResult: boolean;
}
export default async function OrderResearch(search: string, list: Order[], getCustomerById: any) {
    let orderSearch: OrderSearch = {
        orders: [],
        isResult: false
    }
    const setOrderSearch = (value: OrderSearch) => {
        orderSearch = value;
    }
    if (search.includes('-')){ // Date ou Client
        try{
            const inputDate = new Date(search);
            const result = inputDate.toString().includes('Invalid') ? searchByClient(search) : searchByDate(inputDate) as Order[];
            if (result.length > 0){
                setOrderSearch({
                    orders: result,
                    isResult: true
                });
            }
            else{
                setOrderSearch({
                    orders: [],
                    isResult: false
                });
            }
        }
        catch(error){
            console.log(error);
        }
    }
    else{ // Id ou Client
        const value = parseInt(search);
        if (isNaN(value)){ // Client
            try{
                const result = searchByClient(search);
                if (result.length > 0){
                    setOrderSearch({
                        orders: result,
                        isResult: true
                    });
                }
                else{
                    setOrderSearch({
                        orders: [],
                        isResult: false
                    });
                }

            }
            catch(error){
                console.log(error);
            }
                
        }
        else{ // Id
            try{
                const result = searchById(search);
                if (!result) {
                    setOrderSearch({
                        orders: [],
                        isResult: false
                    });
                }
                else{
                    setOrderSearch({
                        orders: result,
                        isResult: true
                    });
                }
            }
            catch(error){
                console.log(error);
            }

        }
    }
    function searchById (search: string) {
        const ordersResearch: Order[] = list.filter(order =>
            order.id.toString().includes(search)
        );
        if (ordersResearch.length === 0) {
            return false;
        }
        else{
            return ordersResearch;
        }
    }
    function searchByClient(search: string){
        const ordersResearch: Order[] = list.filter(order =>
            {
                const customer = getCustomerById(order?.client_id);
                const customerFullName = customer?.firstname + ' ' + customer?.lastname;
                return customerFullName.toLowerCase().includes(search.toLowerCase())

            }
          );
        return ordersResearch
          
    }   
    function searchByDate(search: Date){
        const formatedDate = FormatDate(search.toDateString());
        const ordersResearch: Order[] = list.filter(order =>
            order?.created_at.toString().includes(formatedDate.toString())
        );
        return ordersResearch;
    }


    return orderSearch
    
    
}