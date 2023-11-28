import React, { useEffect, useState, useCallback } from 'react';
import { Order } from '../../../models/Order';
import OrdersTable_Header from '../../../views/orders/OrdersTable_Header';
import OrdersTable_List from '../../../views/orders/OrdersTable_List';
import OrdersResearch from '../../../services/orders/OrdersResearch';
import Orders_NoResult from '../../../views/orders/Orders_NoResult';
import OrderSort from '../../../services/orders/OrderSort';
import FilterOrders from '../../../services/orders/FilterOrders';
import GetAllOrders from '../../../services/orders/GetAllOrders';
import CreateOrder from '../../../services/orders/CreateOrder';



function OrdersTable() {

  // State Declarations
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [showList, setShowList] = useState<boolean>(true);
  const [selectedOption, setSelectedOption] = useState<string>('id_asc');
  const [createdOrder, setCreatedOrder] = useState<Order[]>([]);
  const [showCreate, setShowCreate] = useState<boolean>(false);

  // Orders Declarations
  const orders_list = GetAllOrders();
  const filtered_orders = FilterOrders(orders_list);
  const all_orders = filtered_orders.all_orders;
  const processed_orders = filtered_orders.processed_orders;
  const unprocessed_orders = filtered_orders.unprocessed_orders;
  const closed_orders = filtered_orders.closed_orders;
  const create_order_container = document.getElementById("create_order_container");
  const create_order_form = document.getElementById("create_order_form") as HTMLFormElement;



  // Change view function
  const changeView = useCallback((list: Order[]) => {
    setOrders(list);
  }, []);

  // Toggle PopUp Affichage
  const togglePopUp = (value: boolean) => {
      setShowCreate(value);
  }


  // Change searchValue 
  const handleInputChange = (event: Event) => {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    if (inputElement.id === "sort_select") {
      setSelectedOption(inputValue);
    }
    else{
      setSearchValue(inputValue);
    }
  };

  // Change createdOrder
  const orderSubmit = (event: Event) => {
    event.preventDefault();
    if (event.currentTarget instanceof HTMLFormElement) {
      const formData = new FormData(event.currentTarget);
      const result = CreateOrder(formData);
      setCreatedOrder([result.OrderTemplate[0]]);
    }
  }

  // Tri des commandes 
  useEffect(() => {
    if (selectedOption === '') {
      setSelectedOption('id_asc');
    }
    else{
      const index_for_slice = selectedOption.indexOf('_');
      const sort_type = selectedOption.slice(0, index_for_slice);
      const sort_order = selectedOption.slice(index_for_slice + 1);
      const response_sort = OrderSort(orders, sort_type, sort_order); 
      changeView(response_sort);
    }
  }, [selectedOption]);


  // Recherche des commandes
  useEffect(() => {
    if (searchValue === '') {
      changeView(all_orders);
    }
    else{
    const response = OrdersResearch(orders_list, searchValue);
    if (response !== undefined) {
      changeView(response);
    }
    else{
      changeView([]);
    }
  }
  }, [searchValue]);

  
  // Event Listener Input Change
  useEffect(() => {
    const sort_select = document.getElementById("sort_select");
    const search_text_input = document.getElementById("order_research");
    const search_date_input = document.getElementById("dateInput");

    const inputEventListener = (event: Event) => {
      handleInputChange(event);
    };

    search_text_input?.addEventListener('input', inputEventListener);
    search_date_input?.addEventListener('input', inputEventListener);
    sort_select?.addEventListener('change', inputEventListener);

    return () => {
      search_text_input?.removeEventListener('input', inputEventListener);
      search_date_input?.removeEventListener('input', inputEventListener);
      sort_select?.removeEventListener('change', inputEventListener);
    };
  }, [searchValue]);


  // Traitement des filtres (toutes, traitées...)
  useEffect(() => {
    const all_order__btn = document.getElementById("all_order__btn");
    const processed_order__btn = document.getElementById("processed_order__btn");
    const unprocced_order__btn = document.getElementById("unprocessed_order__btn");
    const closed_order__btn = document.getElementById("closed_order__btn");
    
    function resetInput() {
      const search_text_input = document.getElementById("order_research") as HTMLInputElement;
      const search_date_input = document.getElementById("dateInput") as HTMLInputElement;
      search_text_input.value = '';
      search_date_input.value = '';
    }

    function handleAllOrderClick() {
      console.log('all')
      if (!showList){
        setShowList(true);
      }
      changeView(all_orders);
      resetInput();
    }

    function handleProcessedOrderClick() {
      console.log('processed')
      changeView(processed_orders);
      setShowList(true);
      resetInput();
    }

    function handleUnprocessedOrderClick() {
      changeView(unprocessed_orders);
      resetInput();
    }

    function handleClosedOrderClick() {
      changeView(closed_orders);
      resetInput();
    }

    all_order__btn?.addEventListener('click', handleAllOrderClick);
    processed_order__btn?.addEventListener('click', handleProcessedOrderClick);
    unprocced_order__btn?.addEventListener('click', handleUnprocessedOrderClick);
    closed_order__btn?.addEventListener('click', handleClosedOrderClick);

    return () => {
      all_order__btn?.removeEventListener('click', handleAllOrderClick);
      processed_order__btn?.removeEventListener('click', handleProcessedOrderClick);
      unprocced_order__btn?.removeEventListener('click', handleUnprocessedOrderClick);
      closed_order__btn?.removeEventListener('click', handleClosedOrderClick);
      
    };
  }, [orders_list]);

  // Affichage de la liste des commandes ou non
  useEffect(() => {
    if (orders.length === 0) {
      setShowList(false);
    } else {
      setShowList(true);
    }
  }, [orders]);

  
  // Submit Event Listener
  useEffect(() => {
    

    const formSubmitListener = (event: Event) => {
      orderSubmit(event);
    };
    
    create_order_form?.addEventListener('submit', formSubmitListener);

    return () => {
      create_order_form?.removeEventListener('submit', formSubmitListener)
    }
  },[])

  // Récupérer données formulaire create order
  useEffect(() => {
    if (createdOrder.length > 0){
      const formData = new FormData(create_order_form);
      const result = CreateOrder(formData);
      changeView(result.newOrderList);
    }
  }, [createdOrder]);

  // Event Click sur les boutons d'affichage
  useEffect(() => {
    const create_order_btn = document.getElementById("create_order_btn");
    const close_popUp_btn = document.getElementById("create_order_close");
    
    function onClickPopUpShow(e: Event){
      console.log('show')
      e.preventDefault();
      togglePopUp(true);
    }
    function onClickPopUpHide(e: Event){
      console.log('hide')
      e.preventDefault();
      togglePopUp(false);
    }
    
    create_order_btn?.addEventListener('click', onClickPopUpShow);
    close_popUp_btn?.addEventListener('click', onClickPopUpHide);
    
    return () => {
        create_order_btn?.removeEventListener('click', onClickPopUpShow);
        close_popUp_btn?.removeEventListener('click', onClickPopUpHide);
        
    }
  }, []);

  // Affichage du popUp de création de commande
  useEffect(() => {

      if (showCreate){
        create_order_container?.classList.remove("pop_up");
      }
      else{
        create_order_container?.classList.add("pop_up");
      }
  }, [showCreate]);


  if (!showList) {
    return (
      <div className='table_list'>
        <div className='results'>
            <Orders_NoResult />
        </div>
      </div>
    );
  } else {
    return (
      <div className='table_list'>
        <div className='results'>
          <table className='tg'>
            <OrdersTable_Header />
            <OrdersTable_List data={orders} />
          </table>
        </div>
      </div>
    );
  }
}

export default OrdersTable;