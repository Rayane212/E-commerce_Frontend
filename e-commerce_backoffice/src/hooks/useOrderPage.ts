import React, {useState, useEffect, useRef} from 'react'
import { Order } from '../models/orders/Order'
import { ShippingMethod } from '../models/ShippingMethod';
import { Customer } from '../models/customers/Customer';
import { useNavigate } from 'react-router-dom';
import OrderService from '../services/orders/OrderService';
import CustomerService from '../services/customers/CustomerService';
import ShippingMethodService from '../services/shipping_method/ShippingMethodService';

interface OrderState {
  order: Order,
  shipping_method : ShippingMethod, 
  customer: Customer,
  isDataLoaded: boolean,
}


export default function useOrderPage() {
    const [state, setState] = useState<OrderState>();
    const order_id = window.location.pathname.split('/')[2];
    const isLoadding = useRef(false); 
    const navigate = useNavigate()
  
    function getOrderData(){
        return OrderService?.getOrderById(order_id);
        
    }

    function getShippingMethodData(order: Order){
        return ShippingMethodService?.getShippingMethodByHandle(order?.shipping_method as string);
    }

    function getCustomerData(order: Order){
        return CustomerService?.getCustomerById(order?.client_id as string);
    }


    useEffect(() => {
        if (isLoadding.current) return;
        isLoadding.current = true;
        const order = getOrderData();
        order.then(async (data) => {
            if (data){
                const shipping_method = (await getShippingMethodData(data as Order))[0];
                const customer = getCustomerData(data as Order);
                
                if (shipping_method !== undefined && customer !== undefined) {
                    setState({
                        order: data as Order,
                        shipping_method: shipping_method as ShippingMethod,
                        customer: customer as Customer,
                        isDataLoaded: true,
                    })
                }
                else navigate("/orders")
            }
        })
      
      
    }, [])


    return {
        state
    }
}
