import React from 'react'
import { CustomerState } from '../../../hooks/useCustomers';

export default function Customer_Recap({values} : {values: CustomerState}) {

  return (
    <div className='recap_container'>
      <div className='recap_table shadow'>
        <div className="recap_table_col"><span className='text_count'>{values?.customers?.all_customers.length}</span>Client(s) </div>
        <div className="recap_table_col"><span className='text_count'>{values?.customers?.filteredList.buy_customers.length}</span>Client(s) Ont Acheté</div>
        <div className="recap_table_col"><span className='text_count'>{values?.customers?.filteredList?.suscribed_customers.length}</span>Client(s) Abonné(s)</div>
        <div className="recap_table_col"><span className='text_count '>{values?.customers?.filteredList?.unsuscribed_customers.length}</span>Client(s) Non-Abonné(s)</div>
      </div>
    </div>
  )
}
