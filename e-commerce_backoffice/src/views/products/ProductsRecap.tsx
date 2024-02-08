import React from 'react'
import GetAllProducts from '../../services/get_data/GetAllProducts'
import FilterProducts from '../../services/products/FilterProducts';
import { ProductState } from '../../hooks/useProducts';

export default function ProductsRecap({values} : {values: ProductState}) {
    
  return (
    <div className='recap_container'>
      <div className='recap_table shadow'>
        <div className="recap_table_col"><span className='text_count'>{values?.products?.all_products.length}</span>Produit(s) </div>
        <div className="recap_table_col"><span className='text_count'>{values?.products?.filteredList?.available_products.length}</span>Disponibles</div>
        <div className="recap_table_col"><span className='text_count'>{values?.products?.filteredList?.unavailable_products.length}</span>Indisponibles</div>
        <div className="recap_table_col"><span className='text_count '>{values?.products?.filteredList?.out_of_stock_products.length}</span>Stocks Épuisés</div>
      </div>
    </div>
  )
}
