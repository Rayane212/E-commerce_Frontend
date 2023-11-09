import React, { useState, useEffect } from 'react';
import orderService from '../../../services/orderService';
import { Order } from '../../../models/Order';

export default function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    orderService.getOrders();
  }, [])
  function getAllOrders() {
    return orders;
  }

  return {
    orders,
    getAllOrders,
  };
}
