import React from 'react'
import { NotifsInfos } from '../../models/settings/NotifsInfos';
import notifs_infos from '../../data/json/notifs_infos.json'


let isRequest : boolean = false;

export default function GetNotificationsInfos() {
    if(isRequest){return []}
    isRequest = true;
    const data : NotifsInfos = notifs_infos; 
    isRequest = false;
    return data 
}
