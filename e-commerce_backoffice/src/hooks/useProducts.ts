import React, {useState, useEffect, useCallback} from 'react'
import { Product } from '../models/products/Product';
import FilterProducts from '../services/products/FilterProducts';
import { apiFetch } from '../services/apiFetch';
import SortList from '../services/general/SortList';


export type ProductState = {
    products: {
        activeList: {
            slicedList: Product[];
            allList: Product[];
        };
        all_products: Product[];
        filteredList: FilteredProducts; 
    };
    pagination: {
        currentPage: number;
        itemsPerPage: number;
    }
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

    const dicoKeys = {
        'id': 'id',
        'name': 'name',
        'price': 'sell_price',
        'date': 'created_at',
        'stock': 'stock'
    }


    const handlePagination = (newPage: string, pagineBy: string) => {
        const start = (productState?.pagination?.currentPage - 1) * productState?.pagination?.itemsPerPage;
        const end = start + productState?.pagination?.itemsPerPage;
        const paginatedList = productState.products.activeList?.allList.slice(start, end);
        setProductState((prevState: any) => ({
            ...prevState,
            products: {
                ...prevState.products,
                activeList: {
                    ...prevState.products.activeList,
                    slicedList: paginatedList
                }
            },
            pagination: {
                ...prevState.pagination,
                currentPage: parseInt(newPage),
                itemsPerPage: parseInt(pagineBy)
            }
        }))
    }

    const paginateList = (list: any) => {
        return list.slice(0, 10);
    }
    
    function filterProducts(data:Product[]){
        const filter_data = FilterProducts(data);
        return filter_data;
    }

    function GetProducts() {
        setProductState((prevState: any) => ({
            ...prevState,
            isLoading: true,
        }));
        apiFetch('products/get', {method: 'GET'})
        .then((result:any) => {
            if (result !== undefined) {
                const filteredProducts = filterProducts(result) as FilteredProducts;
                setProductState((prevState: any) => ({
                    ...prevState,
                    isLoading: false,
                    isDataLoaded: true,
                    showList: true,
                    products: {
                        activeList: {
                            slicedList: result.slice(0, 10),
                            allList: result
                        },
                        all_products: result,
                        filteredList: filteredProducts
                    }
                }))
            }
        })
    }

    const filter_view = (filter_type: string) => {
        if (filter_type === 'all_products'){
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
        else{
            setProductState((prevState: any) => ({
                ...prevState,
                products: {
                    ...prevState.products,
                    activeList: {
                        slicedList: paginateList(prevState.products.filteredList[filter_type as keyof typeof prevState.products.filteredList]),
                        allList: prevState.products.filteredList[filter_type as keyof typeof prevState.products.filteredList]
                    }
                }
            }))
        }
        handlePagination('1', '10');
    }

    const tableLoader = (value: boolean) => {
        setProductState((prevState: any) => ({
            ...prevState,
            isTableLoading: value,
            tableLoaded: !value
        }))
    }

    const sort_view = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = e.target.value;
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
        handlePagination('1', '10');
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
