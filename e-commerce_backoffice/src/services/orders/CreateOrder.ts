import React, {useState, useEffect } from 'react'
import { Order} from '../../models/Order';
import GetAllOrders from './GetAllOrders';
import FormatDate from '../FormatDate';

export default function CreateOrder(formData: FormData) {
  const all_orders = GetAllOrders();
  let OrderTemplate : Order[];
  OrderTemplate = handleFormSubmit(formData);
  const newOrderList: Order[] = addOrder(all_orders, OrderTemplate);
  
  function getLastId(){
      let lastId = 0;
      all_orders.forEach(order => {
          if(parseInt(order.id) > lastId){
              lastId = parseInt(order.id);
          }
      });
      return lastId;
  }

  function handleFormSubmit(data: FormData){
      let newId = getLastId() + 1;
      const id = newId.toString();
      const client = formData.get('client') as string;
      const total = formData.get('total') as string;
      const article_count = formData.get('article_count') as string;
      const date = formData.get('date') as string;
      const shipping_method = formData.get('shipping_method') as string;
      const process = formData.get('process');
      const statut = formData.get('statut');
      
      const orderAdded = [{
        id: id,
        client: client,
        total: total,
        article_count: article_count,
        date: FormatDate(date),
        shipping_method: shipping_method,
        process: process === 'true' ? true : false,
        statut: statut === 'true' ? true : false,
      }];
      return orderAdded;

  }

  function addOrder(list: Order[], element: Order[]){
    let newList = list;
    newList.push(element[0]);
    return newList;
  }
    
  return {newOrderList, OrderTemplate};

}