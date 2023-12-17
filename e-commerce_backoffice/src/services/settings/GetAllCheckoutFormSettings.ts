import React from 'react'
import checkout_form_settings from '../../data/json/checkout_form_settings.json'
import { PaymentCheckoutForm } from '../../models/settings/PaymentCheckoutForm';



let isRequest : boolean = false;


export default function GetAllCheckoutFormSettings() {
    if(isRequest){return []}
    isRequest = true;
    const data : PaymentCheckoutForm = checkout_form_settings; 
    isRequest = false;
    return data
}
