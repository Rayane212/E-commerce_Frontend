import React, { FC, useEffect, useState } from 'react';
import orderService from '../../../services/orderService';
import { Order } from '../../../models/Order';



const OrdersRecap: FC = () => {
  const [orders, setOrders] = useState<Order[]>();
  async function getOrders() {
    const data =  (await orderService.getOrders()) as Order[];
    setOrders(data);
  }
  useEffect (() => {
    getOrders()
    }, [])
  const currency: string[] = ["euro", "EUR", "€"];
  // const order_count: number = orders.length;
  // const total_article_count: number = orders.reduce((total, item) => total + parseInt(item.article_count), 0);
  // const total_order_count: number = orders.reduce((total, item) => total + parseFloat(item.total), 0);
  // const order_process_count: number = orders.reduce((total, item) => total + (item.process ? 1 : 0), 0);
  // const order_delivered_count: number = orders.reduce((total, item) => total + (item.statut ? 1 : 0), 0);
  return (
      <div className='orders_recap'>
        <p>slt</p>
      {/* <table className="tg">
        <thead>
          <tr>
            <td className="tg-ycr8"><span className='text_count'>{order_count}</span> <br></br>Commandes</td>
            <td className="tg-ycr8"><span className='text_count'>{total_order_count} {currency[2]}</span> <br></br>Ventes Totales</td>
            <td className="tg-ycr8"><span className='text_count'>{total_article_count}</span> <br></br>Articles Commandés</td>
            <td className="tg-ycr8"><span className='text_count'>{order_process_count}</span> <br></br>Commandes Traités</td>
            <td className="tg-ycr8"><span className='text_count'>{order_delivered_count}</span> <br></br>Commandes Livrés</td>
          </tr>
        </thead>
      </table> */}
    </div>
  )
}
export default OrdersRecap;
