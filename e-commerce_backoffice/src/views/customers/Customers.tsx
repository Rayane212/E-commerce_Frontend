import React from 'react';
import '../../assets/css/customers.css';
import PageHeader from '../general/PageHeader';
import Customers_Recap from './Customers_Recap';
import CustomersTable from '../../assets/tsx/customers/CustomersTable';

function Customers(){
  return (
    <div className="container">
      <PageHeader
        title='Clients'
        link='create_customer'
        isButton={true}
        buttonTitle='Créer un client'
      />
      <Customers_Recap/>
      <div className='table_container'>
        <CustomersTable/>
      </div>
    </div>
    
  );
}

export default Customers;