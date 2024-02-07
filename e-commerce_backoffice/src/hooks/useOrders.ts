import { useCallback, useEffect, useState } from 'react';
import { Order } from '../models/orders/Order';
import { apiFetch } from '../services/apiFetch';
import SortList from '../services/general/SortList';
import OrderResearch, { OrderSearch } from '../services/orders/OrderResearch';
import useCustomers from './useCustomers';

export type OrderState = {
    orders: {
        activeList: {
            slicedList: Order[];
            allList: Order[];
        }
        all_orders: Order[];
        filteredList: FilteredOrders;
    },
    pagination:{
        currentPage: number;
        itemsPerPage: number;
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
    const [orders, setOrders] = useState<OrderState>({
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
        pagination:{
            currentPage: 1,
            itemsPerPage: 10
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


    const handlePagination = (newPage: string, pagineBy: string) => {
        const page = parseInt(newPage);
        const itemsPerPage = parseInt(pagineBy);
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedList = orders?.orders?.activeList?.allList.slice(start, end);
        setOrders((prevState: any) => ({
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
    const tableLoader = (value: boolean) => {
        setOrders((prevState: any) => ({
            ...prevState,
            isTableLoading: value,
            tableLoaded: !value
        }))
    }

    const getOrders = useCallback(async () => {
        setOrders((prevState: any) =>({
            ...prevState,
            isLoading: true
        }))
        apiFetch('orders/get', {method: 'GET'})
        .then((result:any) => {
            if (result !== undefined) {
                setOrders((prevState: any) =>({
                    ...prevState,
                    isLoading: false,
                    isDataLoaded: true,
                    showList: true,
                    orders: {
                        activeList: {
                            slicedList: result.slice(0, 10),
                            allList: result
                        },
                        all_orders: result,
                        filteredList: {
                            processed_orders: [],
                            unprocessed_orders: [],
                            closed_orders: []
                        }
                    }
                }))
                
            }
        })
       
    }, [])

    const filterOrders = useCallback(async () => {
        if (orders?.orders?.all_orders.length === 0) return 
        const data = orders?.orders?.all_orders as Order[];
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

        setOrders((prevState: any) =>({
            ...prevState,
            orders: {
                ...prevState.orders,
                filteredList: {
                    processed_orders: processed_orders,
                    unprocessed_orders: unprocessed_orders,
                    closed_orders: closed_orders
                }
            }
        }))
    }, [orders?.orders.all_orders])


    const orderSearch = async (searchValue: string) => {
        if (searchValue !== '') {
            const result_list = await OrderResearch(searchValue, orders?.orders?.all_orders as Order[], getCustomerById);
            return result_list;
        }
        else{
            return {isResult: true, orders: orders?.orders?.all_orders};
        }
    }

    const paginateList = (list: any) => {
        return list.slice(0, 10);
    }

    const filter_view = (filter_type: string) => {
        if (filter_type === 'all_orders'){
            setOrders((prevState: any) => ({
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
            setOrders((prevState: any) => ({
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
        reinitPagination();
        // handlePagination(orders?.pagination?.currentPage.toString(), orders.pagination.itemsPerPage.toString());
        
    }


    const reinitPagination = () => {
        setOrders((prevState: any) => ({
            ...prevState,
            pagination: {
                currentPage: 1,
                itemsPerPage: 10
            }
        }))
    }
    

    const getOrderById = (id: string) => {
        const order = orders?.orders?.all_orders.find((order) => order?.id === id) as Order;
        return order
    }

    const sort_view = (selectedOption : string) => {
        const index_for_slice = selectedOption.indexOf('_');
        const sortOptions = {
            sort_by: selectedOption.slice(0, index_for_slice),
            sort_order: selectedOption.slice(index_for_slice + 1),
            sort_key: dicoKeys[selectedOption.slice(0, index_for_slice) as keyof typeof dicoKeys]
        }
        const sortedList = SortList(orders?.orders?.activeList?.allList, sortOptions.sort_by, sortOptions.sort_order, sortOptions.sort_key);
        if (sortedList !== undefined){
            setOrders((prevState: any) => ({
                ...prevState,
                orders: {
                    ...prevState.orders,
                    activeList: {
                        slicedList: paginateList(sortedList),
                        allList: sortedList
                    }
                },
                showList: true
            }))
        }
        reinitPagination();
        handlePagination(orders?.pagination?.currentPage.toString(), orders.pagination.itemsPerPage.toString());
    }

    const search_view = async (searchValue:string) => {
        const result = await orderSearch(searchValue) as OrderSearch;
        if (result !== undefined){
            setOrders((prevState: any) =>({
                ...prevState,
                showList: result.isResult ? true : false,
                orders: {
                    ...prevState.orders,
                    activeList: result.orders
                }
            }))
        }
        handlePagination('1', '10');
    }
    
    
    useEffect(() => {  
        getOrders();
    }, [])

    useEffect(() => {
        filterOrders();
    }, [orders?.orders.all_orders])
    
    return { orders, filter_view, sort_view, search_view, getOrderById, tableLoader, handlePagination }
}
