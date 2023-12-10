import React, {useState, useEffect, useCallback } from 'react'
import { Product } from '../models/products/Product';
import GetAllProducts from '../services/products/GetAllProducts';
import FilterProducts from '../services/products/FilterProducts';
import ProductsResearch from '../services/products/ProductsResearch';
import ProductSort from '../services/products/ProductSort';

class useProductsTable{
    async GetProducts() {
        const data = GetAllProducts();
        return data;
    }

    async asyncFilterProducts(){
        const data = await this.GetProducts();
        const filter_data = FilterProducts(data);
        return {data, filter_data};
    }

    async productSearch(e: React.ChangeEvent<HTMLInputElement>){
        const searchValue = e.target.value;
        const allProducts = await this.GetProducts();
        if (searchValue !== '') {
            const result_list = ProductsResearch(allProducts, searchValue);
            return result_list;
        }
        else{
            return allProducts;
        }
    }

    async productSort(e: React.ChangeEvent<HTMLSelectElement>, products: Product[]){
        const selectedOption = e.target.value;
        if (selectedOption !== ''){
            const index_for_slice = selectedOption.indexOf('_');
            if (index_for_slice !== undefined) {
                const sort_type = selectedOption.slice(0, index_for_slice);
                const sort_order = selectedOption.slice(index_for_slice + 1);
                const response_sort = ProductSort(products, sort_type, sort_order); 
                return response_sort;
            }
        }
    }

}


export default new useProductsTable();
