import React from 'react'
import admins from '../../data/json/admins.json'
import { Admin } from '../../models/settings/Admin';

let isRequest : boolean = false;


export default function GetAllAdmins() {
    if(isRequest){return []}
    isRequest = true;
    const data : Admin[] = admins; 
    isRequest = false;
    return data
}
