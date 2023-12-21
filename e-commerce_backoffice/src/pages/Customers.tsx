import React from 'react';
import '../views/customers/customers.css';
import PageHeader from '../views/general/page_header/PageHeader';
import Customers_Recap from '../views/customers/recap/Customers_Recap';
import CustomersTable from '../views/customers/CustomersTable';

function Customers(){
  return (
    <div className="main_container">
      <PageHeader
        title='Clients'
        link='create_customer'
        isButton={true}
        buttonTitle='Créer un client'
        isSelect={false}
        isRecord={true}
        optionsList={{}}
      />
      <Customers_Recap/>
      <div className='table_container'>
        <CustomersTable/>
      </div>
    </div>
    
  );
}

export default Customers;