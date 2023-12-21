import React from 'react'
import { Order } from '../../models/orders/Order';
import GetAllOrders from '../get_data/GetAllOrders';
import FormatDate from '../general/FormatDate';

class OrderService{

  async GetOrders(){
    const data = GetAllOrders();
    return data;
  }

  async asyncFilterOrders(){
    const data = await this.GetOrders();
    const filter_data = this.FilterOrders(data);
    return {data, filter_data};
  }
  async orderSearch(e: React.ChangeEvent<HTMLInputElement>){
    const searchValue = e.target.value;
    const allOrders = await this.GetOrders();
    if (searchValue !== '') {
      const result_list = this.OrdersResearch(allOrders, searchValue);
      return result_list;
    }
    else{
      return allOrders;
    }
  }

  async orderSort(e: React.ChangeEvent<HTMLSelectElement>, orders: Order[]){
    const selectedOption = e.target.value;
    if (selectedOption !== ''){
        const index_for_slice = selectedOption.indexOf('_');
        if (index_for_slice !== undefined) {
            const sort_type = selectedOption.slice(0, index_for_slice);
            const sort_order = selectedOption.slice(index_for_slice + 1);
            const response_sort = this.OrderSort(orders, sort_type, sort_order); 
            return response_sort;
        }
    }
  }

  async getOrderById(id: string){
    const orders = await this.GetOrders(); 
    const order_result = orders.find((order) => order?.id === id) as Order;
    return order_result;
  }


  FilterOrders(data: Order[]){
    const all_orders = data;
    const processed_orders = filterProcessedOrders(data);
    const unprocessed_orders = filterUnprocessedOrders(data);
    const closed_orders = filterClosedOrders(data); 

    function filterProcessedOrders(data: Order[]): Order[] {
      return data.filter(order => order.process);
    }

    function filterUnprocessedOrders(data: Order[]): Order[] {
      return data.filter(order => !order.process);
    }

    function filterClosedOrders(data: Order[]): Order[] {
      return data.filter(order => order.statut);
    }

    return {
      all_orders,
      processed_orders,
      unprocessed_orders,
      closed_orders,
    };
  } 

  OrdersResearch(list: Order[], search: string) {
    let orderSearch: Order[] = [];
    let isResult: boolean = false;
    try{
      if (search.includes('-')){ // Date ou Client
        const inputDate = new Date(search);
        inputDate.toString().includes('Invalid') ? clientResearch(search) : orderDateResearch(inputDate);
      }
      else{ // Id ou Client
        const value = parseInt(search);
        if (isNaN(value)){
          const result = clientResearch(search);
          !result ? setIsResult(false) : setIsResult(true);
        }
        else{
          const result = orderIdResearch(search);
          !result ? setIsResult(false): setIsResult(true);
        }
      
      }
    }
    catch(error){
      console.log(error);
    }
    
    function setIsResult(value: boolean) {
      isResult = value;
    }
    function setOrderSearch(value: Order[]) {
      orderSearch = value;
    }
    
    
    function clientResearch(value: string) {
      const ordersResearch: Order[] = list.filter(order =>
        console.log(order)
        // order.client.toLowerCase().includes(value.toLowerCase())
      );
      if (ordersResearch.length === 0) {
        setIsResult(false);
      }else{
        updateOrderSearch(ordersResearch);
        return ordersResearch
      }
    }
    
    
    function orderIdResearch(value: string) {
      const ordersResearch: Order[] = list.filter(order =>
        order.id.toString().includes(value)
      );
      if (ordersResearch.length === 0) {
        return false;
      }else{
      updateOrderSearch(ordersResearch);
      return ordersResearch;
      }
    }

    function orderDateResearch(value: Date) {
      const formatedDate = FormatDate(value.toDateString());
      const ordersResearch: Order[] = list.filter(order =>
        order.date.toString().includes(formatedDate.toString())
      );
      updateOrderSearch(ordersResearch);
    }


    function updateOrderSearch(ordersResearch: Order[]) {
      if (ordersResearch.length === 0) {
        setIsResult(false);
        return ordersResearch;
      } else {
        setIsResult(true);
        setOrderSearch(ordersResearch);
      }
    }
    
    if (isResult) {
      return orderSearch;
    }
    else{
      return false; 
    }
  }

  OrderSort(list: Order[], by:string, order:string) {
    const sortedOrders = list.slice().sort((a: Order, b: Order) => {
      if (by === 'id') {
          if (order === 'asc') {
              return parseInt(a.id) - parseInt(b.id)
          } else {
              return parseInt(b.id) - parseInt(a.id)
          }
      }
      // else if (by === 'name') {
      //     if (order === 'asc') {
      //         return a.client && b.client ? a.client.localeCompare(b.client) : 0
      //     } else {
      //         return b.client && a.client ? b.client.localeCompare(a.client) : 0
      //     }
      // }
      else if (by === 'price') {
          if (order === 'asc') {
              return a.total && b.total ? parseInt(a.total) - parseInt(b.total) : 0
          } else {
              return a.total && b.total ? parseInt(b.total) - parseInt(a.total) : 0
          }
      }
      else if (by === 'date') {
          if (order === 'asc') {
              return a.date && b.date ? b.date.localeCompare(a.date) : 0
          } else {
              return a.date && b.date ? a.date.localeCompare(b.date) : 0
          }
      }
      else {
          return 0
      }
  });
  return sortedOrders;
  }

  
}

export default new OrderService()
