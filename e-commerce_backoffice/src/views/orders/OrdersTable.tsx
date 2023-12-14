import React, { useEffect, useState, useCallback } from 'react';
import { Order } from '../../models/orders/Order';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MapOptions from '../general/MapOptionsRecord';
import NoResult from '../general/NoResult';
import TableTitle from '../general/TableTitle';
import TableList from '../general/TableList';
import useOrdersTable from '../../hooks/useOrdersTable';

type OrderState = {
  orders: Order[];
  searchValue: string;
  selectedOption: string;
  showList: boolean;
}

function OrdersTable() {
  const [state, setState] = useState<OrderState>();
  const filtered_orders = useOrdersTable.asyncFilterOrders();
  const tableHeaders = ['ID', 'Date', 'Client', 'Total', 'Nombre d\'articles', 'Méthode de Livraison', 'Statut', 'Process'];
  const optionList = {
    'id_asc': 'Par ID Croissant',
    'id_desc': 'Par ID Décroissant',
    'name_asc': 'Par Nom (A-Z)',
    'name_desc': 'Par Nom (Z-A)',
    'price_asc': 'Par Prix Croissant',
    'price_desc': 'Par Prix Décroissant',
    'date_asc': 'Par Date Chronologique',
    'date_desc': 'Par Date Antéchronologique',
  };

  let filtered_data: {
    all_orders: Order[];
    processed_orders: Order[];
    unprocessed_orders: Order[];
    closed_orders: Order[];
} = {
    all_orders: [],
    processed_orders: [],
    unprocessed_orders: [],
    closed_orders: []
};
  
filtered_orders.then((result) => {
  if (result !== undefined) {
       filtered_data.all_orders = result.data;
       filtered_data.processed_orders = result.filter_data.processed_orders;
       filtered_data.unprocessed_orders = result.filter_data.unprocessed_orders;
       filtered_data.closed_orders = result.filter_data.closed_orders;
   }

});



  const dontRedirect = (e: any) => {
    e.preventDefault();
  }


  useEffect(() => {
    const allCustomers = useOrdersTable.GetOrders();
    allCustomers.then((result) => {
        if (result !== undefined) {
            setState({
                orders: result,
                searchValue: '',
                selectedOption: 'id_asc',
                showList: true
            })
        }
    })
}, []);


  const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const result_list = useOrdersTable.orderSearch(event);
    result_list.then((result) => {
      if (result !== undefined && result !== false) {
          setState({
              orders: result,
              searchValue: event.target.value,
              selectedOption: state?.selectedOption as string,
              showList: true
          })
        reinit_sort()
      }
      if (result === false){
          setState({
              orders: [],
              searchValue: event.target.value,
              selectedOption: state?.selectedOption as string,
              showList: false
          })
        reinit_sort()
      }
    })
    
  }

  const reinit_input = () => {
      const input = document.getElementById('customer_research') as HTMLInputElement;
      input.value = '';
  }

  const reinit_sort = () => {
    const select = document.getElementById('sort_select') as HTMLSelectElement;
    select.value = 'id_asc';
  }

  const filter__view = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const element = e.target as HTMLButtonElement;
    const data_list_element = element.dataset.list;
    const data_list = filtered_data[data_list_element as keyof typeof filtered_data];
    if (data_list !== undefined) {
        setState({
            orders: data_list as Order[],
            searchValue: state?.searchValue as string,
            selectedOption: state?.selectedOption as string,
            showList: true
        })
        reinit_input()
        reinit_sort()
    }
    else{
        setState({
            orders: [],
            searchValue: state?.searchValue as string,
            selectedOption: state?.selectedOption as string,
            showList: false
        })
        reinit_input()
        reinit_sort()
    }
    
  }

  const sort_view = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const sorted_list = useOrdersTable.orderSort(e, state?.orders as Order[]);
    sorted_list.then((result) => {
        if (result !== undefined) {
            setState({
                orders: result,
                searchValue: state?.searchValue as string,
                selectedOption: e.target.value,
                showList: true
            })
        }
        else{
            setState({
                orders: [],
                searchValue: state?.searchValue as string,
                selectedOption: e.target.value,
                showList: false
            })
        }
    })
    
  }


  return (
    <div className='table_container'>
        <div className='filters_container'>
            <table className="tg">
                <thead>
                    <tr>
                    <td className="tg-ycr8">
                        <button className='filter__btn btn' id="all_order__btn" data-list="all_orders" onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => filter__view(e)}>
                        Toutes les commandes
                        </button>
                    </td>
                    <td className="tg-ycr8">
                        <button className='filter__btn btn' id="processed_order__btn" data-list="processed_orders" onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => filter__view(e)}>
                        Traitées
                        </button>
                    </td>
                    <td className="tg-ycr8">
                        <button className='filter__btn btn' id="unprocessed_order__btn" data-list="unprocessed_orders" onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => filter__view(e)}>
                        Non Traitées
                        </button>
                    </td>
                    <td className="tg-0lax">
                        <button className='filter__btn btn' id="closed_order__btn" data-list="closed_orders" onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => filter__view(e)}>
                        Fermées
                        </button>
                    </td>
                    </tr>
                </thead>
            </table>
            <table className='tg'>
              <thead>
                <tr>
                    <td className="tg-ycr8 research_container">
                      <input type="text" id="customer_research" placeholder="Rechercher..." onChange={(e:React.ChangeEvent<HTMLInputElement>)=> handleInputChange(e)}/>
                        <div className="date-input-container">
                            <input type="date" id="dateInput" name="dateInput" onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}/>
                            <FontAwesomeIcon className="i icon" icon={["fas", "calendar"]} />
                        </div>
                    </td>
                    <td className="tg-ycr8 sort_main_container">
                        <a href='#' onClick={dontRedirect} className='btn'>
                            <button className='filter__btn no_background' id="sort__btn" >
                                <FontAwesomeIcon className="i icon" icon={["fas", "sort"]} />
                            </button>
                        </a>
                        <div className='pop_up_sort sort_fields_container'>
                            <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => sort_view(e)} id='sort_select'>
                                <MapOptions list={optionList}/>
                            </select>
                        </div>
                    </td>
                </tr>
              </thead>
            </table>
        </div>
        <div className='table_list'>
            <div className='results'>
                <table className='tg'>
                    <TableTitle list={tableHeaders}/>
                    {state?.showList ? <TableList customers={[]} orders={state?.orders} products={[]}/>: null}
                </table>
                {!state?.showList ? <NoResult/> : null}
            </div>
        </div>
    </div>
)

}

export default OrdersTable;