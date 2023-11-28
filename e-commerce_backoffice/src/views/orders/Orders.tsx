import React from 'react'
import '../../assets/css/order.css';
import useOrders from '../../services/orders/FilterOrders'
import OrdersHeader from './OrdersHeader'
import OrdersRecap from '../../assets/tsx/orders/OrdersRecap'
import OrdersFilter from './OrdersFilter'
import OrdersTable from '../../assets/tsx/orders/OrdersTable'
import CreateOrderForm from './CreateOrderForm';

export default function Orders() {
  return (
    <div className='main_container'>
        <OrdersHeader/>
        <CreateOrderForm/>
        <OrdersRecap/>
        <div className='table_container'>
          <OrdersFilter/>
          <OrdersTable/>
        </div>
    </div>
  )
}
