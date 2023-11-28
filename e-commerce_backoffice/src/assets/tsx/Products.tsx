import React from 'react'
import ProductsHeader from '../../views/products/ProductsHeader'
import ProductsRecap from './products/ProductsRecap';
import ProductsFilter from '../../views/products/ProductsFilter';
import ProductsTable from './products/ProductsTable';

export default function Products() {
  return (
    <div className='main_container'>
        <ProductsHeader/>
        <ProductsRecap/>
        <div className='products_container'>
          <ProductsFilter/>
          <ProductsTable/>
        </div>
    </div>
  )
}
