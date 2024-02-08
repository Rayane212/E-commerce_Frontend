import React, {useState, useEffect, useCallback} from 'react'
import { Product } from '../models/products/Product';
import FilterProducts from '../services/products/FilterProducts';
import { apiFetch } from '../services/apiFetch';
import SortList from '../services/general/SortList';
import { PaginationState } from './usePagination';


export type ProductState = {
    products: {
        activeList: {
            slicedList: Product[];
            allList: Product[];
        };
        all_products: Product[];
        filteredList: FilteredProducts; 
    };
    isLoading: boolean;
    isDataLoaded: boolean;
    isTableLoading: boolean | undefined;
    tableLoaded: boolean | undefined;
    showList: boolean;
}

type FilteredProducts = {
    available_products: Product[];
    unavailable_products: Product[];
    out_of_stock_products: Product[];
}

export default function useProducts() {
    const [productState, setProductState] = useState<ProductState>({
        products: {
            activeList: {
                slicedList: [],
                allList: []
            },
            all_products: [],
            filteredList: {
                available_products: [],
                unavailable_products: [],
                out_of_stock_products: []
            }
        },
        isLoading: false,
        isDataLoaded: false,
        showList: false,
        isTableLoading: false,
        tableLoaded: true
    })

    const dicoKeys = {
        'id': 'id',
        'name': 'name',
        'price': 'sell_price',
        'date': 'created_at',
        'stock': 'stock'
    }

    function GetProducts() {
        setProductState((prevState: any) => ({
            ...prevState,
            isLoading: true,
            isDataLoaded: false,
            isTableLoading: true
        }));
        apiFetch('products/get', {method: 'GET'})
        .then((result:any) => {
            if (result !== undefined) {
                const filteredProducts = filterProducts(result) as FilteredProducts;
                setTimeout(() => setProductState((prevState: any) => ({
                    ...prevState,
                    isLoading: false,
                    isDataLoaded: true,
                    isTableLoading: false,
                    showList: true,
                    products: {
                        activeList: {
                            slicedList: result.slice(0, 10),
                            allList: result
                        },
                        all_products: result,
                        filteredList: filteredProducts
                    },

                })), 100)
            }
        })
    }


    function filterProducts(data:Product[]){
        const filter_data = FilterProducts(data);
        return filter_data;
    }

    const handlePagination = (state: PaginationState) => {
        const start = (state.currentPage - 1) * state.itemsPerPage;
        const end = start + state.itemsPerPage;
        const paginatedList = productState.products.activeList.allList.slice(start, end);
        setProductState((prevState: ProductState) => ({
            ...prevState,
            products: {
                ...prevState.products,
                activeList: {
                    ...prevState.products.activeList,
                    slicedList: paginatedList
                }
            }
        }))
    }
    const paginateList = (list: any) => {
        return list.slice(0, 10);
    }
    

    
    const filter_view = (filter_type: string) => {
        if (filter_type === 'all_products'){
            setProductState((prevState: any) => ({
                ...prevState,
                products: {
                    ...prevState.products,
                    activeList: {
                        ...prevState.products.activeList,
                        allList: prevState.products.all_products
                    }
                }
            }))
        }
        else{
            setProductState((prevState: any) => ({
                ...prevState,
                products: {
                    ...prevState.products,
                    activeList: {
                        ...prevState.products.activeList,
                        allList: prevState.products.filteredList[filter_type as keyof typeof prevState.products.filteredList]
                    }
                }
            }))
        }
    } 

    const tableLoader = (value: boolean) => {
        setProductState((prevState: ProductState) => ({
            ...prevState,
            isTableLoading: value,
            tableLoaded: !value
        }))
    }

    const sort_view = (selectedOption: string) => {
        const index_for_slice = selectedOption.indexOf('_');
        const sortOptions = {
            sort_by: selectedOption.slice(0, index_for_slice),
            sort_order: selectedOption.slice(index_for_slice + 1),
            sort_key: dicoKeys[selectedOption.slice(0, index_for_slice) as keyof typeof dicoKeys]
        }
        const sortedList = SortList(productState.products.activeList?.allList, sortOptions.sort_by, sortOptions.sort_order, sortOptions.sort_key);
        if (sortedList !== undefined){
            setProductState((prevState: any) => ({
                ...prevState,
                products: {
                    ...prevState.products,
                    activeList: {
                        slicedList: paginateList(sortedList),
                        allList: sortedList
                    }
                }
            }))
        }
    }

    const search_view = (searchValue: string) => {
        const new_search_value = searchValue.trim();
        if (new_search_value !== '') {
            const result_list = productState.products.all_products.filter((product: Product) => {
                return (product?.name as string).toLowerCase().includes(searchValue.toLowerCase());
            })
            if (result_list.length === 0) {
                setProductState((prevState: any) => ({
                    ...prevState,
                    showList: false
                }))
            }
            else{
                setProductState((prevState: any) => ({
                    ...prevState,
                    products: {
                        ...prevState.products,
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
            setProductState((prevState: any) => ({
                ...prevState,
                products: {
                    ...prevState.products,
                    activeList: {
                        slicedList: paginateList(prevState.products.all_products),
                        allList: prevState.products.all_products
                    }
                }
            }))
        }
    }

    useEffect(() => {
        GetProducts();
    }, [])

    
    return {
        productState,
        filter_view,
        sort_view,
        search_view, 
        tableLoader, 
        handlePagination
    }
}
