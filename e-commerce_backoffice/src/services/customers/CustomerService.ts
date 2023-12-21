import React, {useState, useEffect, useCallback } from 'react'
import { Customer } from '../../models/customers/Customer';
import GetAllCustomers from '../get_data/GetAllCustomers';


class CustomerService{
  async GetCustomers() {
      const data = GetAllCustomers();
      return data
  }

  async asyncFilterCustomers(){
      const data = await this.GetCustomers();
      const filter_data = this.FilterCustomers(data);
      return {data, filter_data};
  }

  async customerSearch(e: React.ChangeEvent<HTMLInputElement>){
      const searchValue = e.target.value;
      const allCustomers = await this.GetCustomers();
      if (searchValue !== '') {
          const result_list = this.CustomersResearch(allCustomers, searchValue);
          return result_list;
      }
      else{
          return allCustomers;
      }
  }

  async customerSort(e: React.ChangeEvent<HTMLSelectElement>, customers: Customer[]){
      const selectedOption = e.target.value;
      if (selectedOption !== ''){
          const index_for_slice = selectedOption.indexOf('_');
          if (index_for_slice !== undefined) {
              const sort_type = selectedOption.slice(0, index_for_slice);
              const sort_order = selectedOption.slice(index_for_slice + 1);
              const response_sort = this.CustomerSort(customers, sort_type, sort_order); 
              return response_sort;
          }
      }
  }


  CustomerSort(list: Customer[], by:string, order:string) {
      const sortedCustomers = list.slice().sort((a: Customer, b: Customer) => {
          if (by === 'id') {
              if (order === 'asc') {
                  return parseInt(a.id) - parseInt(b.id)
              } else {
                  return parseInt(b.id) - parseInt(a.id)
              }
          }
          else if (by === 'name') {
              if (order === 'asc') {
                  return a.name && b.name ? a.name.localeCompare(b.name) : 0
              } else {
                  return b.name && a.name ? b.name.localeCompare(a.name) : 0
              }
          }
          else if (by === 'total') {
              if (order === 'asc') {
                  return a.total_order_amount && b.total_order_amount ? parseInt(a.total_order_amount) - parseInt(b.total_order_amount) : 0
              } else {
                  return a.total_order_amount && b.total_order_amount ? parseInt(b.total_order_amount) - parseInt(a.total_order_amount) : 0
              }
          }
          else if (by === 'articles') {
              if (order === 'asc') {
                  return a.total_article_count && b.total_article_count ? parseInt(a.total_article_count) - parseInt(b.total_article_count) : 0
              } else {
                  return a.total_article_count && b.total_article_count ? parseInt(b.total_article_count) - parseInt(a.total_article_count) : 0
              }
              
          }
          else if (by === 'orders'){
              if (order === 'asc') {
                  return a.orders_count && b.orders_count ? parseInt(a.orders_count) - parseInt(b.orders_count) : 0
              } else {
                  return a.orders_count && b.orders_count ? parseInt(b.orders_count) - parseInt(a.orders_count) : 0
              }
          }
          else {
              return 0
          }
      });
      return sortedCustomers;
  }

  CustomersResearch(list: Customer[], search: string) {
      let customerSearch: Customer[] = [];
      let isResult: boolean = false;
      try {
          const value = parseInt(search);
          if (isNaN(value)){ // Client
            const result = this.getCustomerByName(search);
            if (result !== undefined) {
              updateOrderSearch(result);
            }
            !result ? setIsResult(false) : setIsResult(true);
          }
          else{ // Id
              const result = this.getCustomerById(search);
              // !result ? setIsResult(false): setIsResult(true);
          }
      } 
      catch (error) {
        console.error(error);
      }
        
        function setIsResult(value: boolean) {
          isResult = value;
        }
        function setOrderSearch(value: Customer[]) {
          customerSearch = value;
        }
    
        // function customerNameResearch(value: string) {
        //   const customersResearch: Customer[] = list.filter(customer =>
        //     customer.name.toLowerCase().includes(value.toLowerCase())
        //   );
        //   if (customersResearch.length === 0) {
        //     setIsResult(false);
        //   }else{
        //     updateOrderSearch(customersResearch);
        //     return customersResearch
        //   }
        //   }
        // function customerIdResearch(value: string) {
        //   const customersResearch: Customer[] = list.filter(customer =>
        //     customer.id.toString().includes(value)
        //   );
        //   if (customersResearch.length === 0) {
        //     return false;
        //   }else{
        //   updateOrderSearch(customersResearch);
        //   return customersResearch;
        //   }
        // }
        
        function updateOrderSearch(customersResearch: Customer[] | boolean) {
          if ((customersResearch as Customer[]).length === 0) {
            setIsResult(false);
            return customersResearch;
          } else {
            setIsResult(true);
            setOrderSearch(customersResearch as Customer[]);
          }
        }
        
        if (isResult) {
          return customerSearch;
        }
        else{
          return false;
        }
  }

  FilterCustomers(data: Customer[]) {
      const allCustomers = data;
      const buyCustomers = filterRecurringCustomers(allCustomers);
      const suscribedCustomers = filterSuscribedCustomers(allCustomers);
      const unsuscribedCustomers = filterUnsuscribedCustomers(allCustomers); 
    
      function filterRecurringCustomers(data: Customer[]): Customer[] {
        return data.filter(customer => customer.order_before);
      }
    
      function filterSuscribedCustomers(data: Customer[]): Customer[] {
        return data.filter(customer => customer.marketing);
      }
    
      function filterUnsuscribedCustomers(data: Customer[]): Customer[] {
        return data.filter(customer => !customer.marketing);
      }
    
      return {
        buyCustomers,
        suscribedCustomers,
        unsuscribedCustomers,
      };
  }

  getCustomerById(id: string) {
    const data = GetAllCustomers();
    const customersResearch: Customer[] = data.filter(customer =>
      customer.id.toString().includes(id)
    );
    if (customersResearch.length === 0) {
      return false;
    }
    else{
      return customersResearch[0] as Customer;
    }
  }

  getCustomerByName(name: string) {
    const data = GetAllCustomers();
    const customersResearch: Customer[] = data.filter(customer =>
      customer.name.toString().includes(name)
    );
    if (customersResearch.length === 0) {
      return false;
    }
    else{
      return customersResearch;
    }
  }


}


export default new CustomerService();
