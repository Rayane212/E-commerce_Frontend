import React, { FC, useEffect, useState } from 'react';
import { Order } from '../../models/Order';
import { OrdersTableProps } from '../../models/OrdersTableProps';

const OrdersTable_List: FC<OrdersTableProps> = ({ data }) => {
  const currency: string[] = ["euro", "EUR", "€"];
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    setOrders(data);
  }, [data]);
  return (
    <tbody>
      <>
        {orders.map((item: Order) => (
          <tr className='result_row' key={item.id}>
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
  );
};

export default OrdersTable_List;
