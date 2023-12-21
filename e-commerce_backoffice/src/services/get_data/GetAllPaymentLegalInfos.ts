import React from 'react'
import payment_legal_infos from '../../data/json/payments_legal_infos.json'
import { PaymentLegalInfos } from '../../models/settings/PaymentLegalInfos';


let isRequest : boolean = false;

export default function GetAllPaymentLegalInfos() {
    if (isRequest) { return [] }
    isRequest = true;
    const data: PaymentLegalInfos = payment_legal_infos;
    isRequest = false;
    return data
}
