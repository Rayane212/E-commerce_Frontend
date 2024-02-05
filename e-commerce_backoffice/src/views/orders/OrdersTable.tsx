import React, { useEffect, useState, useCallback } from 'react';
import { Order } from '../../models/orders/Order';
import NoResult from '../general/NoResult';
import TableTitle from '../general/TableTitle';
import TableList from '../general/TableList';
import useOrdersTable from '../../services/orders/OrderService';
import useOrders from '../../hooks/useOrders';
import Loader from '../general/Loader';
import OrdersListFilter from './OrdersList/OrdersListFilter';

function OrdersTable() {
    const {orders, filter_view, sort_view, search_view} = useOrders()
    const tableHeaders = ['ID', 'Date', 'Total', 'Nombre d\'articles', 'Méthode de Livraison', 'Statut', 'Process'];


  return (
    <div className='table_container'>
        <OrdersListFilter callback_filter={filter_view} callback_sort={sort_view} callback_search={search_view}/>
        <div className='table_list'>
            <div className='results'>
                {orders?.isLoading && <Loader/>}
                {!orders?.isLoading && !orders?.showList ? <NoResult/> : null}
                {orders?.showList &&
                    <table className='tg'>
                        <TableTitle list={tableHeaders}/>
                        {orders?.showList && <TableList customers={[]} orders={orders?.list !== undefined ? orders.list : []} products={[]}/>}
                    </table>
                }
            </div>
        </div>
    </div>
)

}

export default OrdersTable;