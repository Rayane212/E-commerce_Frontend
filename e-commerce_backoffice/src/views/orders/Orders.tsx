import React from 'react'
import '../../assets/css/order.css';
import OrdersRecap from './OrdersRecap'
import OrdersTable from '../../assets/tsx/orders/OrdersTable'
import CreateOrderForm from './CreateOrderForm';
import PageHeader from '../general/PageHeader';

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
