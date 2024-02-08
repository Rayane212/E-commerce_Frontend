import React, {useState, useEffect} from 'react'
import { Order } from '../models/orders/Order';
import useOrders, { OrderState } from './useOrders';


type OrderRecap = {
    order_count: number,
    total_order_count: number,
    article_count: number,
    currency: string[]
  }


export default function useOrdersRecap(orders: Order[]) {
    const [recapValues, setRecapValues] = useState<OrderRecap>();

  function getOrderCount(order: Order[]){
    return order.length;
  }
  
  function getTotalOrderCount(order: Order[]){
    const total_order_count = order.reduce((total, item) => total + parseFloat(item.total_price), 0);
    const round = Math.round(total_order_count * 100) / 100;
    const numberString = round.toFixed(2);
    const number_final = parseFloat(numberString);
    return number_final;
  }

  function getArticleCount(order: Order[]){
    return order.reduce((total, item) => total + parseInt(item.article_count), 0);
  }

  useEffect(() => {
    if (orders.length === 0) return
    setRecapValues({
      order_count: getOrderCount(orders),
      total_order_count: getTotalOrderCount(orders),
      article_count: getArticleCount(orders),
      currency: ["euro", "EUR", "€"],
    })
  }, [orders])


  return {recapValues}
}
