import React from 'react'
import dico_icon from '../../data/json/dico_icon.json'


let isRequest : boolean = false;


export default function GetDicoIcon() {
    if(isRequest){return []}
    isRequest = true;
    const data : { [key: string]: string } = dico_icon; 
    isRequest = false;
    return data
}


