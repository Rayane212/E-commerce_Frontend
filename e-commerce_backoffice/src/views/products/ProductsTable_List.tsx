import React, { FC, useEffect, useState } from 'react';
import { ProductsTableProps } from '../../models/ProductsTableProps';
import { Product } from '../../models/Product';


const ProductsTable_List: FC<ProductsTableProps> = ({ data }) => {
  const currency: string[] = ["euro", "EUR", "€"];
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    setProducts(data);
  }, [data]);
  return (
    <tbody>
      <>
        {products.map((item: Product) => (
          <tr className='result_row' key={item.id}>
            <td className="tg-ycr8">{item.id}</td>
            <td className="tg-ycr8">{item.title}</td> 
            <td className="tg-ycr8">{item.stock}</td> 
            <td className="tg-ycr8">{item.available ? "Disponible" : "Pas Disponible"}</td>  
            <td className="tg-ycr8">{item.price_on_sale}{currency[2]}</td> 
            <td className="tg-ycr8">{item.price_regular}{currency[2]}</td> 
            <td className="tg-ycr8">{item.supplier}</td> 
          </tr>
        ))}
      </>
    </tbody>
  );
};

export default ProductsTable_List