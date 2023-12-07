import React, { FC, useEffect, useState } from 'react';
import GetAllOrders from '../../services/orders/GetAllOrders';


const OrdersRecap: FC = () => {
  const allOrders = GetAllOrders(); 
  const currency: string[] = ["euro", "EUR", "€"];
  const order_count = allOrders.length;
  const total_order_count = allOrders.reduce((total, item) => total + parseFloat(item.total), 0);
  const article_count = allOrders.reduce((total, item) => total + parseInt(item.article_count), 0);
  const order_process_count = allOrders.reduce((total, item) => total + (item.process ? 1 : 0), 0);
  const order_delivered_count = allOrders.reduce((total, item) => total + (item.statut ? 1 : 0), 0);
  return (
      <div className='recap_container'>
        <table className="tg recap_table">
          <thead>
            <tr>
              <td className="tg-ycr8"><span className='text_count'>{order_count}</span> <br></br>Commandes </td>
              <td className="tg-ycr8"><span className='text_count'>{total_order_count}{currency[2]}</span> <br></br>Ventes Totales</td>
              <td className="tg-ycr8"><span className='text_count'>{article_count}</span> <br></br>Articles Commandés</td>
              <td className="tg-ycr8"><span className='text_count'>{order_process_count}</span> <br></br>Commandes Traités</td>
              <td className="tg-ycr8 no_right_border"><span className='text_count '>{order_delivered_count}</span> <br></br>Commandes Livrés</td>
            </tr>
          </thead>
        </table>
    </div>
  )
}
export default OrdersRecap;
