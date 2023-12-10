import FormatDate from '../general/FormatDate';
import { Customer } from '../../models/customers/Customer';

function CustomersResearch(list: Customer[], search: string) {
  let customerSearch: Customer[] = [];
  let isResult: boolean = false;
  try {
      const value = parseInt(search);
      if (isNaN(value)){ // Client
        const result = customerNameResearch(search);
        !result ? setIsResult(false) : setIsResult(true);
      }
      else{ // Id
          const result = customerIdResearch(search);
          !result ? setIsResult(false): setIsResult(true);
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

    function customerNameResearch(value: string) {
      const customersResearch: Customer[] = list.filter(customer =>
        customer.name.toLowerCase().includes(value.toLowerCase())
      );
      if (customersResearch.length === 0) {
        setIsResult(false);
      }else{
        updateOrderSearch(customersResearch);
        return customersResearch
      }
      }
    function customerIdResearch(value: string) {
      const customersResearch: Customer[] = list.filter(customer =>
        customer.id.toString().includes(value)
      );
      if (customersResearch.length === 0) {
        return false;
      }else{
      updateOrderSearch(customersResearch);
      return customersResearch;
      }
    }
    
    function updateOrderSearch(customersResearch: Customer[]) {
      if (customersResearch.length === 0) {
        setIsResult(false);
        return customersResearch;
      } else {
        setIsResult(true);
        setOrderSearch(customersResearch);
      }
    }
    
    if (isResult) {
      return customerSearch;
    }
    else{
      return false;
    }
}


export default CustomersResearch;