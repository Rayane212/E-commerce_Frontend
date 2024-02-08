import React, {useState, useEffect, useCallback} from 'react'
import { Customer } from '../models/customers/Customer';
import { apiFetch } from '../services/apiFetch';
import FilterCustomers from '../services/customers/FilterCustomers';
import SortList from '../services/general/SortList';
import { PaginationState } from './usePagination';


export interface CustomerState {
    customers: {
        activeList: {
            slicedList: Customer[];
            allList: Customer[];
        };
        all_customers: Customer[];
        filteredList: FilteredOrders; 
    };
    isLoading: boolean;
    isDataLoaded: boolean;
    isTableLoading: boolean | undefined;
    tableLoaded: boolean | undefined;
    showList: boolean;
}
type FilteredOrders = {
    buy_customers: Customer[];
    suscribed_customers: Customer[];
    unsuscribed_customers: Customer[];
}

export default function useCustomers() {
    const [customerState, setCustomerState] = useState<CustomerState>({
        customers: {
            activeList: {
                slicedList: [],
                allList: []
            },
            all_customers: [],
            filteredList: {
                buy_customers: [],
                suscribed_customers: [],
                unsuscribed_customers: []
            }
        },
        isLoading: false,
        isDataLoaded: false,
        showList: false,
        isTableLoading: false,
        tableLoaded: true
    });

    const dicoKeys = {
        'id': 'id',
        'name': 'firstname',
        'total': 'total_order_amount',
        'orders': 'orders_count',
        'stock': 'stock'
    }

    
    const getCustomers = useCallback(async () => {
        setCustomerState((prevState: any) => ({
            ...prevState,
            isLoading: true,
            isDataLoaded: false,
            isTableLoading: true
        }));
        apiFetch('customers/get', {method: 'GET'})
        .then((result:any) => {
            if (result !== undefined) {
                const filteredOrders = filterOrders(result) as FilteredOrders;
                setTimeout(() => setCustomerState((prevState: any) =>({
                    ...prevState,
                    customers: {
                        activeList: {
                            slicedList: result.slice(0, 10),
                            allList: result
                        },
                        all_customers: result,
                        filteredList: filteredOrders
                    },
                    isLoading: false,
                    showList: true,
                    isDataLoaded: true,
                    isTableLoading: false,
                })), 100)
            }
        })
    }, [])

    const filterOrders = (orders: Customer[]) => {
        return FilterCustomers(orders);
    }


    const filter_view = (filter_type: string)  => {
        if (filter_type === 'all_customers'){
            setCustomerState((prevState: any) => ({
                ...prevState,
                customers: {
                    ...prevState.customers,
                    activeList: {
                        ...prevState.customers.activeList,
                        allList: prevState.customers?.all_customers
                    }
                }
            }))
        }
        else{
            setCustomerState((prevState: any) => ({
                ...prevState,
                customers: {
                    ...prevState.customers,
                    activeList: {
                        ...prevState.customers.activeList,
                        allList: prevState.customers.filteredList[filter_type]
                    }
                }
            }))
        }
    }

    const handlePagination = (state: PaginationState) => {
        const start = (state.currentPage - 1) * state.itemsPerPage;
        const end = start + state.itemsPerPage;
        const paginatedList = customerState.customers.activeList.allList.slice(start, end);
        setCustomerState((prevState: CustomerState) => ({
            ...prevState,
            customers: {
                ...prevState.customers,
                activeList: {
                    ...prevState.customers.activeList,
                    slicedList: paginatedList
                }
            }
        }))
    }

    const paginateList = (list: any) => {
        return list.slice(0, 10);
    }


    const tableLoader = (value:boolean) => {
        setCustomerState((prevState: any) => ({
            ...prevState,
            isTableLoading: value,
            tableLoaded: !value
        }))
    }

    const sort_view = (selectedOption: string) => {
        
        const index_for_slice = selectedOption.indexOf('_');
        console.log(selectedOption.slice(0, index_for_slice), dicoKeys[selectedOption.slice(0, index_for_slice) as keyof typeof dicoKeys])
        const sortOptions = {
            sort_by: selectedOption.slice(0, index_for_slice),
            sort_order: selectedOption.slice(index_for_slice + 1),
            sort_key: dicoKeys[selectedOption.slice(0, index_for_slice) as keyof typeof dicoKeys]
        }
        const sortedList = SortList(customerState?.customers?.activeList?.allList, sortOptions.sort_by, sortOptions.sort_order, sortOptions.sort_key);
        if (sortedList !== undefined){
            setCustomerState((prevState: any) => ({
                ...prevState,
                customers: {
                    ...prevState.customers,
                    activeList: {
                        slicedList: paginateList(sortedList),
                        allList: sortedList
                    }
                }
            }))
        }
    }

    const getFullName = (customer: Customer) => {
        return customer?.firstname + ' ' + customer?.lastname;
    }

    const search_view = (searchValue: string) => {
        const new_search_value = searchValue.trim();
        if (new_search_value !== '') {
            const result_list = customerState?.customers?.all_customers.filter((customer: Customer) => {
                return (getFullName(customer) as string).toLowerCase().includes(searchValue.toLowerCase());
            })
            if (result_list.length === 0) {
                setCustomerState((prevState: any) => ({
                    ...prevState,
                    showList: false
                }))
            }
            else{
                setCustomerState((prevState: any) => ({
                    ...prevState,
                    customers: {
                        ...prevState.customers,
                        activeList: {
                            slicedList: paginateList(result_list),
                            allList: result_list
                        }
                    },
                    showList: true
                }))
            }
            
        }
        else{
            setCustomerState((prevState: any) => ({
                ...prevState,
                customers: {
                    ...prevState.customers,
                    activeList: {
                        slicedList: paginateList(prevState.customers?.all_customers),
                        allList: prevState.customers.all_customers
                    }
                }
            }))
        }
    }

    const getCustomerById = (id: string) => {
        if (customerState?.customers?.all_customers === undefined || customerState?.customers?.all_customers.length === 0) return
        const customer =  customerState?.customers?.all_customers.find((customer) => customer.id === id)
        return customer
    }

    useEffect(() => {  
        getCustomers();
    }, [])

    return {
        customerState,
        filter_view,
        sort_view,
        search_view,
        tableLoader,
        handlePagination,
        getCustomerById
    }
}
