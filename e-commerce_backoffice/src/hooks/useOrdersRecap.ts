import React, {useState, useEffect, useRef} from 'react'
import { Order } from '../models/orders/Order';
import OrderService from '../services/orders/OrderService';


type OrderState = {
    order_count: number,
    total_order_count: number,
    article_count: number,
    order_process_count: number,
    order_delivered_count: number,
    currency: string[],
  }


export default function useOrdersRecap() {
    const [states, setStates] = useState<OrderState>();
    const isLoadding = useRef(false);
  
 

  function getOrderCount(order: Order[]){
    return order.length;
  }
  
  function getTotalOrderCount(order: Order[]){
    return order.reduce((total, item) => total + parseFloat(item.total), 0);
  }

  function getArticleCount(order: Order[]){
    return order.reduce((total, item) => total + parseInt(item.article_count), 0);
  }

  function getOrderProcessCount(order: Order[]){
    return order.reduce((total, item) => total + (item.process ? 1 : 0), 0);
  }

  function getOrderDeliveredCount(order: Order[]){
    return order.reduce((total, item) => total + (item.statut ? 1 : 0), 0);
  }

  useEffect(() => {
    if(isLoadding.current) return;
    isLoadding.current = true;
    const allOrders =  OrderService?.GetOrders().then((result) => {
      if (result !== undefined) {
        setStates({
          order_count: getOrderCount(result),
          total_order_count: getTotalOrderCount(result),
          article_count: getArticleCount(result),
          order_process_count: getOrderProcessCount(result),
          order_delivered_count: getOrderDeliveredCount(result),
          currency: ["euro", "EUR", "€"],
        })
      }
    }); 
  }, [])



  return {states}
}
