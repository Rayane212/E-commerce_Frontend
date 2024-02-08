import React from 'react'
import checkout_availability from '../../data/json/checkout_availability.json'
import { CheckoutAvailability } from '../../models/settings/CheckoutAvailability'

let isRequest : boolean = false;



export default function GetCheckoutAvailability() {
    if(isRequest){return []}
    isRequest = true;
    const data : CheckoutAvailability = checkout_availability;
    isRequest = false;
    return data
}
