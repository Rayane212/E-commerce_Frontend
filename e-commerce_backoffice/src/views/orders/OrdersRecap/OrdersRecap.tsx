import React, { FC, useEffect, useRef, useState } from 'react';
import OrderService from '../../../services/orders/OrderService';
import { Order } from '../../../models/orders/Order';
import useOrdersRecap from '../../../hooks/useOrdersRecap';



const OrdersRecap: FC = () => {
  const { states } = useOrdersRecap()

  return (
      <div className='recap_container'>
        <table className="tg recap_table">
          <thead>
            <tr>
              <td className="tg-ycr8"><span className='text_count'>{states?.order_count}</span> <br></br>Commandes </td>
              <td className="tg-ycr8"><span className='text_count'>{states?.total_order_count}{states?.currency[2]}</span> <br></br>Ventes Totales</td>
              <td className="tg-ycr8"><span className='text_count'>{states?.article_count}</span> <br></br>Articles Commandés</td>
              <td className="tg-ycr8"><span className='text_count'>{states?.order_process_count}</span> <br></br>Commandes Traités</td>
              <td className="tg-ycr8 no_right_border"><span className='text_count '>{states?.order_delivered_count}</span> <br></br>Commandes Livrés</td>
            </tr>
          </thead>
        </table>
    </div>
  )
}
export default OrdersRecap;
