import React from 'react'
import shippings_method from '../../data/json/shipping_methods.json';

class ShippingMethodService{
    async getShippingMethods() {
        try {
            const data = shippings_method;
            return data;
        } catch (error) {
            console.log('error', error)
        }
    }
    
}

export default new ShippingMethodService();