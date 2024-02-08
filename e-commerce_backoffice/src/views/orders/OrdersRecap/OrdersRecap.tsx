import useOrdersRecap from '../../../hooks/useOrdersRecap';
import { OrderState } from '../../../hooks/useOrders';

export default function OrdersRecap({orders}: {orders: OrderState}) {
  const { recapValues } = useOrdersRecap(orders?.orders?.all_orders)

  return (
      <div className='recap_container'>
        <div className='recap_table shadow'>
          <div className="recap_table_col"><span className='text_count'>{recapValues?.order_count}</span>Commandes </div>
          <div className="recap_table_col"><span className='text_count'>{recapValues?.total_order_count}{recapValues?.currency[2]}</span>Ventes Totales</div>
          <div className="recap_table_col"><span className='text_count'>{recapValues?.article_count}</span>Articles Commandés</div>
        </div>
    </div>
  )
}



