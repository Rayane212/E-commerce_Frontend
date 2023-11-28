import React from 'react'
import GetAllCustomers from '../../services/customers/GetAllCustomers';
import FilterCustomers from '../../services/customers/FilterCustomers';
import OrdersResearch from '../../services/orders/OrdersResearch';

export default function Customer_Recap() {
    const allCustomers = GetAllCustomers();
    const customers_count: number = allCustomers.length;
    const suscribed_customers_count: number = FilterCustomers(allCustomers).suscribedCustomers.length;
    const buy_customers_count: number =  FilterCustomers(allCustomers).buyCustomers.length;
    const percentageMarketing = percentage(customers_count, suscribed_customers_count)
    const percentageOrders = percentage(customers_count, buy_customers_count)
    
    function percentage(total: number, count: number){
        let percentage = Math.round((count / total) * 100);
        return percentage + '%';
    }

  return (
    <div className='recap_container'>
        <table className="tg recap_table">
          <thead>
            <tr>
              <td className="tg-ycr8"><span className='text_count'>{customers_count}</span> <br></br>Client(s) </td>
              <td className="tg-ycr8"><span className='text_count'>{percentageMarketing}</span> <br></br>sont abonnés</td>
              <td className="tg-ycr8 no_right_border"><span className='text_count '>{percentageOrders}</span> <br></br>ont déjà commandé</td>
            </tr>
          </thead>
        </table>
    </div>
  )
}
