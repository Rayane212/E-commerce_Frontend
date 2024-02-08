import React from 'react'
import general_infos from '../../data/json/general_infos.json'
import { GeneralInfos } from '../../models/settings/GeneralInfos'


let isRequest : boolean = false;

function GetGeneralInfos(){
    if(isRequest){return []}
    isRequest = true;
    const data : GeneralInfos = general_infos; 
    isRequest = false;
    return data
}
export default GetGeneralInfos;
