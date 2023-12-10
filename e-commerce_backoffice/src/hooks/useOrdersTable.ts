import React from 'react'
import { Order } from '../models/orders/Order';
import GetAllOrders from '../services/orders/GetAllOrders';
import FilterOrders from '../services/orders/FilterOrders';
import OrdersResearch from '../services/orders/OrdersResearch';
import OrderSort from '../services/orders/OrderSort';

class useOrdersTable{
  async GetOrders(){
    const data = GetAllOrders();
    return data;
  }
  async asyncFilterOrders(){
    const data = await this.GetOrders();
    const filter_data = FilterOrders(data);
    return {data, filter_data};
  }
  async orderSearch(e: React.ChangeEvent<HTMLInputElement>){
    const searchValue = e.target.value;
    const allOrders = await this.GetOrders();
    if (searchValue !== '') {
      const result_list = OrdersResearch(allOrders, searchValue);
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
            const response_sort = OrderSort(orders, sort_type, sort_order); 
            return response_sort;
        }
    }
  }
}

export default new useOrdersTable()
