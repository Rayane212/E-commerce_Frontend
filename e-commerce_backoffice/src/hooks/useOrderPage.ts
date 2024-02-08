import React, {useState, useEffect, useCallback} from 'react'
import { Order } from '../models/orders/Order'
import { ShippingMethod } from '../models/ShippingMethod';
import { Customer } from '../models/customers/Customer';
import useOrders from './useOrders';
import useShippingMethods from './useShippingMethods';
import useCustomers from './useCustomers';

interface OrderState {
  order: Order,
  shipping_method : ShippingMethod, 
  customer: Customer,
  isLoading: boolean,
  isDataLoaded: boolean
}





export default function useOrderPage() {
    const {orderState, getOrderById} = useOrders();
    const {shippingMethods, getShippingMethodsById} = useShippingMethods()
    const {customerState, getCustomerById} = useCustomers()
    const order_id = window.location.pathname.split("/")[2]
    const [orders, setOrders] = useState<OrderState>({
        order: {} as Order,
        shipping_method: {} as ShippingMethod,
        customer: {} as Customer,
        isLoading: false,
        isDataLoaded: false
    });


    function getOrder(id: string) {
        const order = getOrderById(id)
        return order
    }

    function getShippingMethod(id: string) {
        const shippingMethod =  getShippingMethodsById(id)
        return shippingMethod
    }
    
    function getCustomer(id: string){
        const customer =  getCustomerById(id)
        return customer
    }

   const setLoading = useCallback((value: boolean) => {
        setOrders((prevState: any) =>({
            ...prevState,
            isLoading: value
        }))
   }, [])
    
    const setDatas = useCallback(() => {
        const order = getOrder(order_id)
        const customer = getCustomer(order?.client_id as string)
        const shipping_method = getShippingMethod(order?.shipping_method_id as string)
        if (shipping_method !== undefined && customer !== undefined && order !== undefined){
            setOrders({
                order: order,
                shipping_method: shipping_method,
                customer: customer, 
                isLoading: false,
                isDataLoaded: true
            })
        }
    }, [orderState?.showList, customerState?.showList, shippingMethods?.showList])


    

    useEffect(() => {
       if (!orderState?.showList || !customerState?.showList || !shippingMethods?.showList) return
       else{
        setLoading(true)
       }
    }, [orderState?.showList, customerState?.showList, shippingMethods?.showList])
    
    useEffect(() => {
        if (orders?.isLoading === false) return
        else{
            setDatas()
        }
    }, [orders?.isLoading])

    return {
        orders
    }
}
