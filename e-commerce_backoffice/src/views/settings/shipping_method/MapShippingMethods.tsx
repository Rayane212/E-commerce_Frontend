import React from 'react'
import { ShippingMethod } from '../../../models/ShippingMethod'
import { MapSettingsProps } from '../../../models/settings/MapSettingsProps'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './shipping_method.css'

type MapShippingMethodsProps = {
    list: any;
    dicoText: { [key: string]: string };
    dicoIcon: { [key: string]: string };
    isArray?: boolean;
    sectionType: string;
}
export default function MapShippingMethods({ list, dicoText, dicoIcon, isArray, sectionType }: MapShippingMethodsProps){
    const listArray = list[0][1] as ShippingMethod;
    const priceInt = parseInt(listArray.price);
    let priceText: string = '';
    if (priceInt === parseFloat(listArray.price)){
       priceText = priceInt + '.00';
    }
    else{
        priceText = listArray.price;
    }

  return (
    <div className='all_shipping_methods_container'>
        {sectionType === 'price' ? 
            <table className='shipping_methods_table'>
                <tbody>
                    <tr>
                        <td>
                            <div className='shipping_method_title'>
                                <p className='flex_row'>
                                    <FontAwesomeIcon icon={['fas', dicoIcon[listArray.type] as any]} />
                                    <p>{listArray.title}</p>
                                </p>
                                
                            </div>
                        </td>
                        <td>
                            <p className='price shipping_method_price'>
                                {priceText}
                                <input type='text' className='shipping_method_input text_input hide' value={priceText}/>
                                <span className='price_currency'>€</span>
                            </p>
                            
                        </td>
                    </tr>
                </tbody>
            </table>
            : <></>}
            {sectionType === 'delivery_time' ?
                <table className='shipping_methods_table'>
                    <tbody>
                        <tr>
                            <td>
                                <div className='shipping_method_title'>
                                    <p className='flex_row'>
                                        <FontAwesomeIcon icon={['fas', dicoIcon[listArray.type] as any]} />
                                        <p>{listArray.title}</p>
                                    </p>
                                </div>
                            </td>
                            <td>
                                <div className='shipping_method_delivery_time'>
                                    <p>
                                        <span className='delivery_time'>{listArray.delivery_time}</span>
                                        <span className='day'> jours</span>
                                    </p>
                                    <div className='shipping_method_delivery_time_input_container hide'>
                                        <input type='text' className='shipping_method_input text_input' value={listArray.delivery_time}/>
                                        <select className='shipping_method_select delivery_time_select'>
                                            <option value='hours'>Heures</option>
                                            <option value='days'>Jours</option>
                                            <option value='weeks'>Semaines</option>
                                        </select>
                                    </div>
                                    
                                </div>
                                
                            </td>
                            
                        </tr>
                    </tbody>
                </table>
            : <></>}
            {sectionType === 'title' ?
                <table className='shipping_methods_table'>
                    <tbody>
                        <tr>
                            <td>
                                <div className='shipping_method_title flex_row'>
                                <FontAwesomeIcon icon={['fas', dicoIcon[listArray.type] as any]} />
                                    <p>
                                        <span className='title'>{listArray.title}</span>
                                        <input type='text' className='shipping_method_input title_input hide' value={listArray.title}/>
                                    </p>
                                    
                                </div>
                            </td>
                            <td>
                            <div className='shipping_method_availability'>
                                <p>
                                    <span className='availability'>{listArray.available ? "Actif": "Inactif"}</span>
                                    <select className='shipping_method_select availability_select hide '>
                                        <option value='true'>Actif</option>
                                        <option value='false'>Inactif</option>
                                    </select>
                                </p>
                                    
                                </div>
                            </td>
                            
                            
                        </tr>
                    </tbody>
                </table>
            : <></>}
        {/* <p>{listArray.title}</p> */}
    </div>
  )
}
