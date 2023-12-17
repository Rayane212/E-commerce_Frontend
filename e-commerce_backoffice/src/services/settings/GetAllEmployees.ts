import React from 'react'
import employees from '../../data/json/employees.json'
import { Employe } from '../../models/settings/Employe';


let isRequest : boolean = false;


export default function GetAllEmployees() {
    if(isRequest){return []}
    isRequest = true;
    const data : Employe[] = employees; 
    isRequest = false;
    return data
}
