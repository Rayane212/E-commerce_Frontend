import React, {useState, useEffect, useCallback} from 'react'
import ProductsTable_Header from '../../../views/products/ProductsTable_Header';
import ProductsTable_List from '../../../views/products/ProductsTable_List';
import Products_NoResult from '../../../views/products/Products_NoResult';
import GetAllProducts from '../../../services/products/GetAllProducts';
import FilterProducts from '../../../services/products/FilterProducts';
import { Product } from '../../../models/Product';
import ProductsResearch from '../../../services/products/ProductsResearch';
import ProductSort from '../../../services/products/ProductSort';

export default function CustomersTable() {

    // State Declarations
    const [products, setProducts] = useState<Product[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');
    const [selectedOption, setSelectedOption] = useState<string>('id_asc');
    const [showList, setShowList] = useState<boolean>(false);

    // Others Declarations
    const all_products = GetAllProducts();
    const filtered_products = FilterProducts(all_products);
    const available_products = filtered_products.available_products;
    const unavailable_products = filtered_products.unavailable_products;
    const out_of_stock_products = filtered_products.out_of_stock_products;
    

    // Change view function
    const changeView = useCallback((list: Product[]) => {
        setProducts(list);
    }, []);

    // Change searchValue 
    const handleInputChange = (event: Event) => {
        const inputElement = event.target as HTMLInputElement;
        const inputValue = inputElement.value;
        if (inputElement.id === "sort_select") {
            setSelectedOption(inputValue);
        }
        else{
        setSearchValue(inputValue);
        }
    };

    // Tri des clients 
    useEffect(() => {
        if (selectedOption === '') {
            setSelectedOption('id_asc');
        }
        else{
            const index_for_slice = selectedOption.indexOf('_');
            const sort_type = selectedOption.slice(0, index_for_slice);
            const sort_order = selectedOption.slice(index_for_slice + 1);
            const response_sort = ProductSort(products, sort_type, sort_order); 
            changeView(response_sort);
        }
    }, [selectedOption]);

    // Event Listener Input Change
    useEffect(() => {
        const sort_select = document.getElementById("sort_select");
        const search_text_input = document.getElementById("products_research");
        
        const inputEventListener = (event: Event) => {
        handleInputChange(event);
        };

        search_text_input?.addEventListener('input', inputEventListener);
        sort_select?.addEventListener('change', inputEventListener);

        return () => {
        search_text_input?.removeEventListener('input', inputEventListener);
        sort_select?.removeEventListener('change', inputEventListener);
        };
    }, [searchValue]);

    // Recherche des produits
    useEffect(() => {
        if (searchValue === '') {
            changeView(all_products);
        }
        else{
            const response = ProductsResearch(all_products, searchValue);
            if (response !== undefined) {
                changeView(response);
            }
            else{
                changeView([]);
            }
    }
    }, [searchValue]);

    // Traitement des filtres (toutes, disponibles...)
    useEffect(() => {
        const all_customers__btn = document.getElementById("all_products__btn");
        const buy_customers__btn = document.getElementById("available_products__btn");
        const suscribers_customers__btn = document.getElementById("unavailable_products__btn");
        const unsuscribers_customers__btn = document.getElementById("out_of_stock_products__btn");
        
        function resetInput() {
            const search_text_input = document.getElementById("products_research") as HTMLInputElement;
            search_text_input.value = '';
        }

        function handleAllProductsClick() {
            if (!showList){
                setShowList(true);
            }
            changeView(all_products);
            resetInput();
        }

        function handleAvailableProductsClick() {
            changeView(available_products);
            setShowList(true);
            resetInput();
        }

        function handleUnvailableProductsClick() {
            changeView(unavailable_products);
            resetInput();
        }

        function handleOutOfStockProductsClick() {
            changeView(out_of_stock_products);
            resetInput();
        }

        all_customers__btn?.addEventListener('click', handleAllProductsClick);
        buy_customers__btn?.addEventListener('click', handleAvailableProductsClick);
        suscribers_customers__btn?.addEventListener('click', handleUnvailableProductsClick);
        unsuscribers_customers__btn?.addEventListener('click', handleOutOfStockProductsClick);

        return () => {
        all_customers__btn?.removeEventListener('click', handleAllProductsClick);
        buy_customers__btn?.removeEventListener('click', handleAvailableProductsClick);
        suscribers_customers__btn?.removeEventListener('click', handleUnvailableProductsClick);
        unsuscribers_customers__btn?.removeEventListener('click', handleOutOfStockProductsClick);
        
        };
    }, [all_products]);

    // Affichage de la liste des commandes ou non
    useEffect(() => {
        if (products.length === 0) {
        setShowList(false);
        } else {
        setShowList(true);
        }
    }, [products]);

    if (!showList) {
        return (
            <div className='table_list'>
                <div className='results'>
                    <Products_NoResult/>
                </div>
            </div>
        )
    }
    else{
        return (
            <div className='table_list'>
                <div className='results'>
                <table className='tg'>
                    <ProductsTable_Header/>
                    <ProductsTable_List data={products} />
                </table>
                </div>
            </div>
            
        )
    }
}
