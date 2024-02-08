import React, { useEffect, useState } from 'react'
import ProductsRecap from '../views/products/ProductsRecap';
import ProductsTable from '../views/products/ProductsTable';
import PageHeader from '../views/general/page_header/PageHeader';
import { Product } from '../models/products/Product';
import useProducts, { ProductState } from '../hooks/useProducts';
import Loader from '../views/general/Loader';
import usePagination from '../hooks/usePagination';
import Pagination from '../views/general/pagination/Pagination';


export default function Products() {
  const {productState, filter_view, sort_view, search_view, tableLoader, handlePagination} = useProducts()
  const {paginationState, changePage, changePageCount} = usePagination();
  const tableHeaders = ['ID', 'Produit', 'Stock', 'Disponibilité', 'Prix', 'Marque/Fournisseur']
  const optionList = {
    'id_asc': 'Par ID Croissant',
    'id_desc': 'Par ID Décroissant',
    'name_asc': 'Par Produit (A-Z)',
    'name_desc': 'Par Produit (Z-A)',
    'price_asc': 'Par Prix Croissant',
    'price_desc': 'Par Prix Décroissant',
    'stock_asc': 'Par Stock Croissant',
    'stock_desc': 'Par Stock Décroissant',
  };


  const getLength = (products: Product[]) => {
    return products.length;
  }


  const callback_pagination = () => {
    tableLoader(true);
    setTimeout(() => {
      handlePagination(paginationState);
      tableLoader(false);
    }, 150);
  }

  const handleFilter = (filterValue : string) => {
    filter_view(filterValue);
    reinitInputs();
    changePage(1);
  }
  
  const handleSearch = (searchValue : string) => {
    if (searchValue !== '') {
      tableLoader(true);
      setTimeout(() => {
        search_view(searchValue);
        changePage(1);
        tableLoader(false);
      }, 100);
    }
    else{
      search_view(searchValue);
      changePage(1);
    }
  }
  
  const handleSort = (sortValue : string) => {
    sort_view(sortValue);
    changePage(1);
  }



  const reinitInputs = () => {
      const searchInput = document.getElementById('products_research') as HTMLInputElement;
      const sortSelect = document.getElementById('sort_select') as HTMLSelectElement;
      searchInput.value = '';
      sortSelect.value = 'id_asc';
  }
 

  useEffect(() => {
    if (productState?.isDataLoaded && !productState?.isLoading && !productState?.isTableLoading){
      const pageCount = getLength(productState?.products?.activeList?.allList)
      changePageCount(pageCount)
    }
  }, [productState?.isDataLoaded, productState?.isLoading, productState?.isTableLoading])




  useEffect(() => {
    if (productState?.isDataLoaded && !productState?.isLoading && !productState?.isTableLoading){
      callback_pagination()
    }
  }, [paginationState.currentPage, productState?.products?.activeList?.allList])
  

  const component = () => {
    return (
      <>
        <ProductsRecap values={productState as ProductState}/>
        <div className='products_container'>
          <ProductsTable productState={productState} callback_filter={handleFilter} callback_sort={handleSort} callback_search={handleSearch} optionsList={optionList} tableHeaders={tableHeaders} />
        </div>
        {paginationState?.pageCount > 0 && <Pagination paginationState={paginationState} callback_pagination={changePage}/>}
      </>
    )
  }


  return (
    <div className='main_container'>
        <PageHeader
        title='Produits'
        link='create_product'
        isButton={true}
        buttonTitle='Créer un produit'
        isSelect={false}
        isRecord={true}
        optionsList={{}}
        />
        {!productState.isLoading ?
          component()
        : <Loader/>}
    </div>
  )
}
