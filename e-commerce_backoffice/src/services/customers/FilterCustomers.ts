import { Customer } from '../../models/customers/Customer';

export default function FilterCustomers(data:Customer[]) {
    const allCustomers = data;
    const buy_customers = filterRecurringCustomers(allCustomers);
    const suscribed_customers = filterSuscribedCustomers(allCustomers);
    const unsuscribed_customers = filterUnsuscribedCustomers(allCustomers); 
    
    function filterRecurringCustomers(data: Customer[]): Customer[] {
        return data.filter(customer => customer.order_before);
    }
    
    function filterSuscribedCustomers(data: Customer[]): Customer[] {
        return data.filter(customer => customer.marketing);
    }
    
    function filterUnsuscribedCustomers(data: Customer[]): Customer[] {
        return data.filter(customer => !customer.marketing);
    }

    const result = {
        buy_customers,
        suscribed_customers,
        unsuscribed_customers,
    }
    
    return result
}
