import React, { FC, useEffect, useState } from 'react';
import GetAllOrders from '../../../services/orders/GetAllOrders';
import { Order } from '../../../models/Order';



const OrdersRecap: FC = () => {
  const [orders, setOrders] = useState<Order[]>();
  const currency: string[] = ["euro", "EUR", "€"];
  async function getOrders() {
    const data =  GetAllOrders() as Order[];
    setOrders(data);
  }
  useEffect (() => {
    getOrders()
    }, [])
  let order_count = orders?.length;
  const total_article_count = orders?.reduce((total, item) => total + parseInt(item.article_count), 0);
  const total_order_count = orders?.reduce((total, item) => total + parseFloat(item.total), 0);
  const order_process_count = orders?.reduce((total, item) => total + (item.process ? 1 : 0), 0);
  const order_delivered_count = orders?.reduce((total, item) => total + (item.statut ? 1 : 0), 0);
  return (
      <div className='recap_container'>
        <table className="tg recap_table">
          <thead>
            <tr>
              <td className="tg-ycr8"><span className='text_count'>{order_count}</span> <br></br>Commandes </td>
              <td className="tg-ycr8"><span className='text_count'>{total_order_count}{currency[2]}</span> <br></br>Ventes Totales</td>
              <td className="tg-ycr8"><span className='text_count'>{total_article_count}</span> <br></br>Articles Commandés</td>
              <td className="tg-ycr8"><span className='text_count'>{order_process_count}</span> <br></br>Commandes Traités</td>
              <td className="tg-ycr8 no_right_border"><span className='text_count '>{order_delivered_count}</span> <br></br>Commandes Livrés</td>
            </tr>
          </thead>
        </table>
    </div>
  )
}
export default OrdersRecap;
