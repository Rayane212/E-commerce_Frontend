import React from 'react'
import contact_infos from '../../data/json/contact_infos.json'
import { ContactInfos } from '../../models/settings/ContactInfos'

let isRequest : boolean = false;

export default function GetContactInfos() {
    if(isRequest){return []}
    isRequest = true;
    const data : ContactInfos = contact_infos; 
    isRequest = false;
    return data 
}
