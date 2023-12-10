import { Order } from '../../models/orders/Order';

export default function FilterOrders(data: Order[]) {
  const all_orders = data;
  const processed_orders = filterProcessedOrders(data);
  const unprocessed_orders = filterUnprocessedOrders(data);
  const closed_orders = filterClosedOrders(data); 

  function filterProcessedOrders(data: Order[]): Order[] {
    return data.filter(order => order.process);
  }

  function filterUnprocessedOrders(data: Order[]): Order[] {
    return data.filter(order => !order.process);
  }

  function filterClosedOrders(data: Order[]): Order[] {
    return data.filter(order => order.statut);
  }

  return {
    all_orders,
    processed_orders,
    unprocessed_orders,
    closed_orders,
  };
}
