import { Order } from '../../models/Order';
import FormatDate from '../FormatDate';

function OrdersResearch(list: Order[], search: string) {
  let orderSearch: Order[] = [];
  let isResult: boolean = false;
  try {
    if (search === '') {
      setOrderSearch(list);
    } else {
      if (search.includes('-')){ // Date ou Client
        const inputDate = new Date(search);
        inputDate.toString().includes('Invalid') ? clientResearch(search) : orderDateResearch(inputDate);
      } 
      else{ // ID ou Client
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
  } catch (error) {
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
          order.client.toLowerCase().includes(value.toLowerCase())
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
}


export default OrdersResearch;