import React from 'react';
import { Order } from '../../models/Order';
import orders from '../../data/json/orders.json';


function GetAllOrders(){
      const data : Order [] = orders; 
      return data
 }
export default GetAllOrders;