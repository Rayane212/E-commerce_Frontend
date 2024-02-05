import { useCallback, useEffect, useState } from 'react';
import { Order } from '../models/orders/Order';
import { apiFetch } from '../services/apiFetch';
import SortList from '../services/general/SortList';
import OrderResearch, { OrderSearch } from '../services/orders/OrderResearch';

type OrderState = {
    list: Order[];
    isLoading: boolean;
    showList: boolean;
}
type FilteredOrders = {
    all_orders: Order[];
    processed_orders: Order[];
    unprocessed_orders: Order[];
    closed_orders: Order[];
}


export default function useOrders() {
    const [orders, setOrders] = useState<OrderState>({
        list: [],
        isLoading: false,
        showList: false,
    })
    const [filteredOrders, setFilteredOrders] = useState<FilteredOrders>()

    const getOrders = useCallback(async () => {
        setOrders((prevState: any) =>({
            ...prevState,
            isLoading: true
        }))
        apiFetch('/orders/get', {method: 'GET'})
        .then((result:any) => {
            if (result !== undefined) {
                setOrders((prevState: any) =>({
                    ...prevState,
                    isLoading: false,
                    showList: true,
                    list: result
                }))
                setFilteredOrders((prevState: any) =>({
                    ...prevState,
                    all_orders: result
                }))
            }
        })
       
    }, [])

    const filterOrders = useCallback(async () => {
        if (orders.list.length === 0) return 
        const data = filteredOrders?.all_orders as Order[];
        const processed_orders = filterProcessedOrders(data);
        const unprocessed_orders = filterUnprocessedOrders(data);
        const closed_orders = filterClosedOrders(data); 

        function filterProcessedOrders(data: Order[]): Order[] {
            return data.filter(order => order.process);
        }
        function filterUnprocessedOrders(data: Order[]): Order[] {
            return data.filter(order => !order.process);
        }
    
        function filterClosedOrders(data: Order[]): Order[] {
            return data.filter(order => order.statut);
        }

        setFilteredOrders((prevState: any) =>({
            ...prevState,
            processed_orders: processed_orders,
            unprocessed_orders: unprocessed_orders,
            closed_orders: closed_orders
        }))
    }, [orders.list])


    const orderSearch = async (searchValue: string) => {
        if (searchValue !== '') {
            const result_list = await OrderResearch(searchValue, filteredOrders?.all_orders as Order[]);
            return result_list;
        }
        else{
            return {isResult: true, orders: filteredOrders?.all_orders};
        }
    }

    
    
    const filter_view = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const element = e.target as HTMLButtonElement;
        const data_list_element = element.dataset.list;
        if (filteredOrders !== undefined) {
            setOrders((prevState: any) =>({
                ...prevState,
                showList: true,
                list: filteredOrders[data_list_element as keyof typeof filteredOrders]
            }))
        }
    }

    

    const sort_view = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const sort_list =  () => {
            const selectedOption = e.target.value;
            if (selectedOption !== ''){
                const index_for_slice = selectedOption.indexOf('_');
                if (index_for_slice !== undefined) {
                    const sort_type = selectedOption.slice(0, index_for_slice);
                    const sort_order = selectedOption.slice(index_for_slice + 1);
                    const response_sort = SortList(orders.list, sort_type, sort_order); 
                    return response_sort;
                }
            }
        }
        const sorted_list = sort_list();
        setOrders((prevState: any) =>({
            ...prevState,
            showList: true,
            list: sorted_list
        }))
    }

    const search_view = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        const result = await orderSearch(searchValue) as OrderSearch;
        if (result !== undefined){
            setOrders((prevState: any) =>({
                ...prevState,
                showList: result.isResult ? true : false,
                list: result.orders ? result.orders : []
            }))
        }
        // setOrders((prevState: any) =>({
        //     ...prevState,
        //     showList: true,
        //     list: result_list as Order[]
        // }))
    }
    
    
    useEffect(() => {  
        getOrders();
    }, [])

    useEffect(() => {
        filterOrders();
    }, [orders.list])
    
    return { orders, filter_view, sort_view, search_view }
}
