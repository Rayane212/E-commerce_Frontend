import React from 'react'
import ProductsHeader from '../views/products/ProductsHeader'
import ProductsRecap from '../views/products/ProductsRecap';
import ProductsFilter from '../views/products/ProductsFilter';
import ProductsTable from '../views/products/ProductsTable';
import PageHeader from '../views/general/PageHeader';

export default function Products() {
  return (
    <div className='main_container'>
        <PageHeader
        title='Produits'
        link='create_product'
        isButton={true}
        buttonTitle='Créer un produit'
      />
        <ProductsRecap/>
        <div className='products_container'>
          <ProductsTable/>
        </div>
    </div>
  )
}
