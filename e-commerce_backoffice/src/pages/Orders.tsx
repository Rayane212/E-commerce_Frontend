import React, {useEffect} from 'react'
import '../views/orders/orders.css';
import OrdersRecap from '../views/orders/OrdersRecap/OrdersRecap'
import OrdersTable from '../views/orders/OrdersTable'
import CreateOrderForm from '../views/orders/CreateOrderForm';
import PageHeader from '../views/general/page_header/PageHeader';
import useOrders from '../hooks/useOrders';
import Loader from '../views/general/Loader';
import Pagination from '../views/general/pagination/Pagination';
import usePagination from '../hooks/usePagination';
import { Order } from '../models/orders/Order';

export default function Orders() {
  const {orderState, filter_view, sort_view, search_view, tableLoader, handlePagination} = useOrders()
  const {paginationState, changePage, changePageCount} = usePagination();
  const tableHeaders = ['ID', 'Client', 'Total', 'Méthode de Livraison', 'Traité ?', 'Date'];
  


  const reinitInputs = () => {
      const searchInput = document.getElementById('orders_research') as HTMLInputElement;
      const sortSelect = document.getElementById('sort_select') as HTMLSelectElement;
      searchInput.value = '';
      sortSelect.value = 'id_asc';
  }

  const callback_pagination = () => {
    tableLoader(true);
    setTimeout(() => {
      handlePagination(paginationState);
      tableLoader(false);
    }, 150);
  }

  const handleFilter = (filterValue : string) => {
    tableLoader(true);
    setTimeout(() => {
        filter_view(filterValue);
        tableLoader(false);
    }, 100);
    reinitInputs();
    changePage(1);
  }

  const handleSort = (sortValue : string) => {
    tableLoader(true);
      setTimeout(() => {
          sort_view(sortValue);
          tableLoader(false);
      }, 100);
    changePage(1);
  }

  const handleSearch = (searchValue : string) => {
    tableLoader(true);
    setTimeout(() => {
      search_view(searchValue);
      tableLoader(false);
    }, 100);
    changePage(1);
  }

  const getLength = (orders: Order[]) => {
    return orders.length;
  }


  useEffect(() => {
    if (orderState?.isDataLoaded && !orderState?.isLoading && !orderState?.isTableLoading){
      const pageCount = getLength(orderState?.orders?.activeList?.allList)
      changePageCount(pageCount)
    }
  }, [orderState?.isDataLoaded, orderState?.isLoading, orderState?.isTableLoading])




  useEffect(() => {
    if (orderState?.isDataLoaded && !orderState?.isLoading && !orderState?.isTableLoading){
      callback_pagination()
    }
  }, [paginationState.currentPage, orderState?.orders?.activeList?.allList])


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
        {orderState.isLoading ? <Loader/> : 
          <>
            <OrdersRecap orders={orderState}/>
            <div className='table_container'>
              <OrdersTable orders={orderState} callback_filter={handleFilter} callback_sort={handleSort} callback_search={handleSearch} tableHeaders={tableHeaders}/>
            </div>
            {paginationState?.pageCount > 0 && <Pagination paginationState={paginationState} callback_pagination={changePage}/>}
          </>
        }
    </div>
  )
}
