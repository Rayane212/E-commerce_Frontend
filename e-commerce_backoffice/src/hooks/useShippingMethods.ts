import React, {useState, useEffect, useCallback} from 'react'
import { ShippingMethod } from '../models/ShippingMethod';
import { apiFetch } from '../services/apiFetch';


interface ShippingMethodState {
    list : ShippingMethod[];
    isLoading: boolean;
    showList: boolean;
}


export default function useShippingMethods() {
  const [shippingMethods, setShippingMethods] = useState<ShippingMethodState>();




  const getShippingsMethod = useCallback(async () => {
    setShippingMethods((prevState: any) =>({
        ...prevState,
        isLoading: true
    }))
    apiFetch('shipping_methods/get', {method: 'GET'})
    .then((result:any) => {
        if (result !== undefined) {
            setShippingMethods((prevState: any) =>({
                ...prevState,
                isLoading: false,
                showList: true,
                list: result
            }))
        }
    })
  }, [])


  const getShippingMethodsById = (id: string) => {
    if (shippingMethods?.list === undefined || shippingMethods?.list.length === 0) return
    const shippingMethod = shippingMethods?.list.find((shippingMethod) => shippingMethod.id === id)
    return shippingMethod
  }

  




  useEffect(() => {  
    getShippingsMethod();
}, [])

    return {
        shippingMethods,
        getShippingMethodsById
    }

}
