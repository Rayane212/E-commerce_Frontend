import React from 'react';
import { Order } from '../models/Order';

class OrderService{
  
  async getOrders() {
    const response = await fetch('../assets/json/orders.json');
    
    // const data = await response.json();
    const data: Order[] = [
      { id: "1", date:'12/12/2018', client:'Hamza Sabil', total:"34.98", article_count:"1", shipping_method:"Livraison Express en 3 jours", process:true, statut:true},
      { id: "2", date:'20/02/2020', client:'Romain Lienhart', total:"89.97", article_count:"3", shipping_method:"Livraison Standard en 7 jours",process:true, statut:true},
      { id: "3", date:'03/11/2023', client:'Rayan Hadi', total:"59.98", article_count:"2", shipping_method:"Livraison Standard en 7 jours",process:true, statut:false},
      { id: "4", date:'07/11/2023', client:'Mohamed Lamine', total:"29.99", article_count:"1", shipping_method:"Livraison Standard en 7 jours",process:false, statut:false},
    ];
    return data;
 }
}

export default new OrderService();