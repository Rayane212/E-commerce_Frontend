import { useCallback, useEffect, useState } from 'react';
import { Order } from '../models/orders/Order';
import { apiFetch } from '../services/apiFetch';
import SortList from '../services/general/SortList';
import OrderResearch, { OrderSearch } from '../services/orders/OrderResearch';
import useCustomers from './useCustomers';
import { PaginationState } from './usePagination';

export type OrderState = {
    orders: {
        activeList: {
            slicedList: Order[];
            allList: Order[];
        }
        all_orders: Order[];
        filteredList: FilteredOrders;
    },
    isLoading: boolean;
    isDataLoaded: boolean;
    isTableLoading: boolean | undefined;
    tableLoaded: boolean | undefined;
    showList: boolean;
}
type FilteredOrders = {
    processed_orders: Order[];
    unprocessed_orders: Order[];
    closed_orders: Order[];
}


export default function useOrders() {
    const [orderState, setOrderState] = useState<OrderState>({
        orders: {
            activeList: {
                slicedList: [],
                allList: []
            },
            all_orders: [],
            filteredList: {
                processed_orders: [],
                unprocessed_orders: [],
                closed_orders: []
            }
        },
        isLoading: false,
        isDataLoaded: false,
        showList: false,
        isTableLoading: false,
        tableLoaded: true
    })
    const {getCustomerById} = useCustomers()
    const dicoKeys = {
        'id': 'id',
        'price': 'total_price',
        'date': 'created_at',
        'stock': 'stock'
    }

    const getOrders = useCallback(async () => {
        setOrderState((prevState: any) =>({
            ...prevState,
            isLoading: true,
            isDataLoaded: false,
            isTableLoading: true
        }))
        apiFetch('orders/get', {method: 'GET'})
        .then((result:Order[]) => {
            if (result !== undefined) {
                const filteredOrders = filterOrders(result) as FilteredOrders;
                setOrderState((prevState: any) =>({
                    ...prevState,
                    isLoading: false,
                    isDataLoaded: true,
                    isTableLoading: false,
                    showList: true,
                    orders: {
                        activeList: {
                            slicedList: result.slice(0, 10),
                            allList: result
                        },
                        all_orders: result,
                        filteredList: filteredOrders
                    }
                }))
                
            }
        })
       
    }, [])

    const filterOrders = (data: Order[]) => {
        if (data.length === 0) return 
        const processed_orders = filterProcessedOrders(data);
        const unprocessed_orders = filterUnprocessedOrders(data);
        const closed_orders = filterClosedOrders(data); 

        function filterProcessedOrders(data: Order[]): Order[] {
            return data.filter(order => order?.process_status);
        }
        function filterUnprocessedOrders(data: Order[]): Order[] {
            return data.filter(order => !order?.process_status);
        }
    
        function filterClosedOrders(data: Order[]): Order[] {
            return data.filter(order => order.shipping_status);
        }
        return {
            processed_orders,
            unprocessed_orders,
            closed_orders
        }

    }

    const filter_view = (filter_type: string) => {
        if (filter_type === 'all_orders'){
            setOrderState((prevState: any) => ({
                ...prevState,
                orders: {
                    ...prevState.orders,
                    activeList: {
                        slicedList: paginateList(prevState.orders.all_orders),
                        allList: prevState.orders.all_orders
                    }
                }
            }))
        }
        else{
            setOrderState((prevState: any) => ({
                ...prevState,
                orders: {
                    ...prevState.orders,
                    activeList: {
                        slicedList: paginateList(prevState.orders.filteredList[filter_type]),
                        allList: prevState.orders.filteredList[filter_type]
                    }
                }
            }))
        }
        
    }

    const sort_view = (selectedOption : string) => {
        const index_for_slice = selectedOption.indexOf('_');
        const sortOptions = {
            sort_by: selectedOption.slice(0, index_for_slice),
            sort_order: selectedOption.slice(index_for_slice + 1),
            sort_key: dicoKeys[selectedOption.slice(0, index_for_slice) as keyof typeof dicoKeys]
        }
        const sortedList = SortList(orderState?.orders?.activeList?.allList, sortOptions.sort_by, sortOptions.sort_order, sortOptions.sort_key);
        if (sortedList !== undefined){
            setOrderState((prevState: any) => ({
                ...prevState,
                orders: {
                    ...prevState.orders,
                    activeList: {
                        slicedList: paginateList(sortedList),
                        allList: sortedList
                    }
                }
            }))
        }
    }

    const search_view =  (searchValue:string) => {
        const newSearchValue = searchValue.trim();
        if (newSearchValue !== '') {
            const result = OrderResearch(newSearchValue, orderState.orders.all_orders, getCustomerById) as OrderSearch;
            if (result !== undefined){
                setOrderState((prevState: any) =>({
                    ...prevState,
                    showList: result.isResult ? true : false,
                    orders: {
                        ...prevState.orders,
                        activeList: {
                            slicedList: paginateList(result.orders as Order[]),
                            allList: result.orders as Order[]
                        }
                    }
                }))
            }
        }
    }

    const getOrderById = (id: string) => {
        const order = orderState?.orders?.all_orders.find((order) => order?.id === id) as Order;
        return order
    }

    const handlePagination = (state: PaginationState) => {
        const start = (state.currentPage - 1) * state.itemsPerPage;
        const end = start + state.itemsPerPage;
        const paginatedList = orderState.orders.activeList.allList.slice(start, end);
        setOrderState((prevState: OrderState) => ({
            ...prevState,
            orders: {
                ...prevState.orders,
                activeList: {
                    ...prevState.orders.activeList,
                    slicedList: paginatedList
                }
            }
        }))
    }

    const paginateList = (list: any) => {
        return list.slice(0, 10);
    }


    const tableLoader = (value: boolean) => {
        setOrderState((prevState: any) => ({
            ...prevState,
            isTableLoading: value,
            tableLoaded: !value
        }))
    }


    
    
    
    
    useEffect(() => {  
        getOrders();
    }, [])

    useEffect(() => {
        filterOrders(orderState?.orders.all_orders as Order[]);
    }, [orderState?.orders.all_orders])
    
    return { orderState, filter_view, sort_view, search_view, getOrderById, tableLoader, handlePagination }
}
