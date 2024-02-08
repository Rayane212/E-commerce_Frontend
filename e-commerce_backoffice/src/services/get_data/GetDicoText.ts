import React from 'react'
import dico_text from '../../data/json/dico_text.json'

let isRequest : boolean = false;


export default function GetDicoText() {
    if(isRequest){return []}
    isRequest = true;
    const data = dico_text; 
    isRequest = false;
    return data
}



