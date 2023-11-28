import React from 'react'
import customers from '../../assets/json/customers.json';
import { Customer } from '../../models/Customer';


function GetAllCustomers(){
    const data : Customer [] = customers; 
    return data
}
export default GetAllCustomers;
