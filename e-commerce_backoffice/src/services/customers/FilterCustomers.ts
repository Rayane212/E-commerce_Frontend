import { Customer } from '../../models/customers/Customer';

export default function FilterCustomers(data: Customer[]) {
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
