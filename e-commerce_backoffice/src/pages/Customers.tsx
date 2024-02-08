import React, { useEffect } from 'react';
import '../views/customers/customers.css';
import PageHeader from '../views/general/page_header/PageHeader';
import Customers_Recap from '../views/customers/recap/Customers_Recap';
import CustomersTable from '../views/customers/CustomersTable';
import useCustomers, { CustomerState } from '../hooks/useCustomers';
import usePagination from '../hooks/usePagination';
import { Customer } from '../models/customers/Customer';
import Pagination from '../views/general/pagination/Pagination';
import Loader from '../views/general/Loader';

function Customers(){
  const {customerState, filter_view, sort_view, search_view, tableLoader, handlePagination} = useCustomers()
  const {paginationState, changePage, changePageCount} = usePagination();
  const tableHeaders = ['ID', 'Nom', 'Mail', 'Nombre de Commande', 'Montant Dépensé']
  const optionList = {'id_asc': 'Par ID Croissant', 'id_desc': 'Par ID Décroissant', 'name_asc': 'Par Nom (A-Z)', 'name_desc': 'Par Nom (Z-A)', 'total_asc': 'Par Total Croissant', 'total_desc': 'Par Total Décroissant', 'orders_asc': 'Par Nombre de Commande Croissant', 'orders_desc': 'Par Nombre de Commande Décroissant'}


  const getLength = (customers: Customer[]) => {
    return customers.length;
  }

  const callback_pagination = () => {
    tableLoader(true);
    setTimeout(() => {
      handlePagination(paginationState);
      tableLoader(false);
    }, 150);
  }

  const handleFilter = (filterValue : string) => {
    filter_view(filterValue);
    reinitInputs();
    changePage(1);
  }

  const handleSearch = (searchValue : string) => {
    if (searchValue !== '') {
      tableLoader(true);
      setTimeout(() => {
        search_view(searchValue);
        changePage(1);
        tableLoader(false);
      }, 100);
    }
    else{
      search_view(searchValue);
      changePage(1);
    }
  }

  const handleSort = (sortValue : string) => {
    sort_view(sortValue);
    changePage(1);
  }

  const reinitInputs = () => {
    const searchInput = document.getElementById('customers_research') as HTMLInputElement;
    const sortSelect = document.getElementById('sort_select') as HTMLSelectElement;
    searchInput.value = '';
    sortSelect.value = 'id_asc';
  }


  useEffect(() => {
    if (customerState?.isDataLoaded && !customerState?.isLoading && !customerState?.isTableLoading){
      const pageCount = getLength(customerState?.customers?.activeList?.allList)
      changePageCount(pageCount)
    }
  }, [customerState?.isDataLoaded, customerState?.isLoading, customerState?.isTableLoading])




  useEffect(() => {
    if (customerState?.isDataLoaded && !customerState?.isLoading && !customerState?.isTableLoading){
      callback_pagination()
    }
  }, [paginationState.currentPage, customerState?.customers?.activeList?.allList])



  const component = () => {
    return (
      <>
        <Customers_Recap values={customerState as CustomerState}/>
        <div className='products_container'>
          <CustomersTable customerState={customerState} callback_filter={handleFilter} callback_sort={handleSort} callback_search={handleSearch} optionsList={optionList} tableHeaders={tableHeaders} />
        </div>
        {paginationState?.pageCount > 0 && <Pagination paginationState={paginationState} callback_pagination={changePage}/>}
      </>
    )
  }
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
      {!customerState.isLoading ?
          component()
        : <Loader/>}
    </div>
    
  );
}

export default Customers;