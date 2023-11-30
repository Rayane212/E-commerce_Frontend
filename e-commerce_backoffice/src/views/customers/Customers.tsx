import React, { FC } from 'react';
import '../../assets/css/customers.css';
import Customers_Header from './Customers_Header';
import Customers_Recap from './Customers_Recap';
import CustomersTable from '../../assets/tsx/customers/CustomersTable';
import CustomersFilter from '../../assets/tsx/customers/CustomersFilter';

function Customers(){
  return (
    <div className="container">
      <Customers_Header/>
      <Customers_Recap/>
      <div className='table_container'>
        <CustomersTable/>
      </div>
    </div>
    
  );
}

export default Customers;