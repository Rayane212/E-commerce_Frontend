import React from 'react'
import customers from '../../data/json/customers.json';
import { Customer } from '../../models/customers/Customer';

let isRequest : boolean = false;

function GetAllCustomers(){
    if(isRequest){return []}
    isRequest = true;
    const data : Customer [] = []; 
    isRequest = false;
    return data
}
export default GetAllCustomers;
