import React from 'react'
import payment_process_settings from '../../data/json/payments_processor_settings.json'
import { PaymentProcessor } from '../../models/settings/PaymentProcessor';


let isRequest : boolean = false;

export default function GetAllPaymentsProcessorSettings() {
    if (isRequest) { return [] }
    isRequest = true;
    const data: PaymentProcessor = payment_process_settings;
    isRequest = false;
    return data
}
