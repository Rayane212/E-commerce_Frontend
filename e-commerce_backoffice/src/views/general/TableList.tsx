import React from 'react';
import { TableListProps } from '../../models/TableListProps'
import { Customer } from '../../models/customers/Customer';
import { Order } from '../../models/orders/Order';
import { Product } from '../../models/products/Product';
import { NavLink, useNavigate } from 'react-router-dom';





const TableList: React.FC<TableListProps> = ({ customers, orders, products }) => {
  const currency: string[] = ["euro", "EUR", "€"];
  const navigate = useNavigate();
  if (customers.length !== 0 && products.length === 0 && orders.length === 0){
    return (
      <tbody>
        <>
          {customers.map((item: Customer) => (
            <tr className='result_row' key={item.id}>
              <td className="tg-ycr8">{item.id}</td>
              <td className="tg-ycr8">{item.name}</td> 
              <td className="tg-ycr8">{item.email}</td> 
              <td className="tg-ycr8">{item.marketing ? "Abonné" : "Pas Abonné"}</td>  
              <td className="tg-ycr8">{item.orders_count}</td> 
              <td className="tg-ycr8">{item.total_article_count}</td> 
              <td className="tg-ycr8">{item.total_order_amount}{currency[2]}</td> 
            </tr>
          ))}
        </>
      </tbody>
    )
  }
  else if (orders.length !==0 && products.length === 0 && customers.length === 0){
    return (
      <tbody>
        <>
        
          {orders.map((item: Order) => (
            <tr className='result_row' key={item.id} onClick={()=>{
              navigate('/orders/' + item.id)
            }}>
              <td className="tg-ycr8">{item.id}</td>
              <td className="tg-ycr8">{item.date}</td> 
              <td className="tg-ycr8">{item.client}</td> 
              <td className="tg-ycr8">{item.total}{currency[2]}</td>  
              <td className="tg-ycr8">{item.article_count}</td> 
              <td className="tg-ycr8">{item.shipping_method}</td> 
              <td className="tg-ycr8">
                {item.process ? "Traité" : "Non Traité"}
              </td> 
              <td className="tg-ycr8">
                {item.statut ? "Livré" : "Non Livré"}
              </td> 
          </tr>
          ))}
        </>
      </tbody>
    )
  }
  else if (products.length !==0 && orders.length === 0 && customers.length === 0){
    return (
      <tbody>
        <>
          {products.map((item: Product) => (
            <tr className='result_row' key={item.id}>
              <td className="tg-ycr8">{item.id}</td>
              <td className="tg-ycr8">{item.title}</td> 
              <td className="tg-ycr8">{item.stock}</td> 
              <td className="tg-ycr8">{item.available ? "Disponible" : "Indisponible"}</td>  
              <td className="tg-ycr8">{item.price_on_sale}{currency[2]}</td> 
              <td className="tg-ycr8">{item.price_regular}{currency[2]}</td> 
              <td className="tg-ycr8">{item.supplier}</td> 
            </tr>
          ))}
        </>
      </tbody>
    )
  }
  else{
    return (
      <></>
    )
  }
};

export default TableList;
