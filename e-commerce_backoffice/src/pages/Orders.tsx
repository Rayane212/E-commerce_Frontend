import React from 'react'
import '../views/orders/orders.css';
import OrdersRecap from '../views/orders/OrdersRecap/OrdersRecap'
import OrdersTable from '../views/orders/OrdersTable'
import CreateOrderForm from '../views/orders/CreateOrderForm';
import PageHeader from '../views/general/page_header/PageHeader';
import useOrders from '../hooks/useOrders';
import Loader from '../views/general/Loader';

export default function Orders() {
  const {orders, filter_view, sort_view, search_view, tableLoader, handlePagination} = useOrders()
  const tableHeaders = ['ID', 'Client', 'Total', 'Méthode de Livraison', 'Traité ?', 'Date'];

  return (
    <div className='main_container'>
        <PageHeader
        title='Commandes'
        link='create_order'
        isButton={true}
        buttonTitle='Créer une commande'
        isSelect={false}
        isRecord={true}
        optionsList={{}}
      />
        <CreateOrderForm/>
        {orders.isLoading ? <Loader/> : 
          <>
            <OrdersRecap orders={orders}/>
            <div className='table_container'>
              <OrdersTable orders={orders} filter_view={filter_view} sort_view={sort_view} search_view={search_view} tableHeaders={tableHeaders} tableLoading={tableLoader} handlePagination={handlePagination}/>
            </div>
          </>
        }
    </div>
  )
}
