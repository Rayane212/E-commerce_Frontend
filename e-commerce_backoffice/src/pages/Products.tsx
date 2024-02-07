import React, { useEffect, useState } from 'react'
import ProductsRecap from '../views/products/ProductsRecap';
import ProductsTable from '../views/products/ProductsTable';
import PageHeader from '../views/general/page_header/PageHeader';
import { Product } from '../models/products/Product';
import useProducts, { ProductState } from '../hooks/useProducts';
import Loader from '../views/general/Loader';


export default function Products() {
  const {productState, filter_view, sort_view, search_view, tableLoader, handlePagination} = useProducts()
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

  const recapValues = [{}]

  const component = () => {
    return (
      <>
        <ProductsRecap values={productState as ProductState}/>
        <div className='products_container'>
          <ProductsTable productState={productState} filter__view={filter_view} sort_view={sort_view} search_view={search_view} optionsList={optionList} tableHeaders={tableHeaders} tableLoading={tableLoader} handlePagination={handlePagination}/>
        </div>
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
