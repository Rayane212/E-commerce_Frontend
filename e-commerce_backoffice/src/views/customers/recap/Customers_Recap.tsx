import React from 'react'
import CustomerService from '../../../services/customers/CustomerService';
import useCustomersRecap from './useCustomersRecap';

export default function Customer_Recap() {
    const {state} = useCustomersRecap()

  return (
    <div className='recap_container'>
        <table className="tg recap_table">
          <thead>
            <tr>
              <td className="tg-ycr8"><span className='text_count'>{state?.customers_count}</span> <br></br>Client(s) </td>
              <td className="tg-ycr8"><span className='text_count'>{state?.percentageMarketing}</span> <br></br>sont abonnés</td>
              <td className="tg-ycr8 no_right_border"><span className='text_count '>{state?.percentageOrders}</span> <br></br>ont déjà commandé</td>
            </tr>
          </thead>
        </table>
    </div>
  )
}
