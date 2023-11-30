import React from 'react'
import customers from '../../assets/json/customers.json';
import { Customer } from '../../models/Customer';

let isRequest : boolean = false;

function GetAllCustomers(){
    if(isRequest){return []}
    isRequest = true;
    const data : Customer [] = customers; 
    isRequest = false;
    return data
}
export default GetAllCustomers;
