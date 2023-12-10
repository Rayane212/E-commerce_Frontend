import React from 'react'
import '../../assets/css/order.css';
import OrdersRecap from '../views/orders/OrdersRecap'
import OrdersTable from '../views/orders/OrdersTable'
import CreateOrderForm from '../views/orders/CreateOrderForm';
import PageHeader from '../views/general/PageHeader';

export default function Orders() {
  return (
    <div className='main_container'>
        <PageHeader
        title='Commandes'
        link='create_order'
        isButton={true}
        buttonTitle='Créer une commande'
      />
        <CreateOrderForm/>
        <OrdersRecap/>
        <div className='table_container'>
          <OrdersTable/>
        </div>
    </div>
  )
}
