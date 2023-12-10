import React from 'react'
import GetAllProducts from '../../services/products/GetAllProducts'
import FilterProducts from '../../services/products/FilterProducts';

export default function ProductsRecap() {
    const all_products = GetAllProducts();
    const filtered_products = FilterProducts(all_products)
    const availableProducts = filtered_products.available_products;
    const unavailableProducts = filtered_products.unavailable_products;
    const outOfStockProducts = filtered_products.out_of_stock_products;
  return (
    <div className='recap_container'>
        <table className="tg recap_table">
          <thead>
            <tr>
              <td className="tg-ycr8"><span className='text_count'>{all_products.length}</span> <br></br>Produit(s) </td>
              <td className="tg-ycr8"><span className='text_count'>{availableProducts.length}</span> <br></br> disponibles</td>
              <td className="tg-ycr8"><span className='text_count'>{unavailableProducts.length}</span> <br></br>indisponibles</td>
              <td className="tg-ycr8 no_right_border"><span className='text_count '>{outOfStockProducts.length}</span> <br></br>stocks épuisés</td>
            </tr>
          </thead>
        </table>
    </div>
  )
}
