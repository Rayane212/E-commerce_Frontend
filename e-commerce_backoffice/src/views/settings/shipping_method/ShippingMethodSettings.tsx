import React, {useState, useEffect} from 'react'
import { ShippingMethod } from '../../../models/ShippingMethod'
import useSettings from '../../../hooks/useSettings'
import MapSettings from '../MapSettings'
import MapShippingMethods from './MapShippingMethods'

type ShippingMethodState = {
  shipping_methods: ShippingMethod[];
}

export default function ShippingMethodSettings() {
  const [state, setState] = useState<ShippingMethodState>()
  const shippingMethodsArray = state ? Object.entries(state?.shipping_methods as ShippingMethod[]) : [];
  const dicoText: { [key: string]: string } = useSettings.getDicoText() as { [key: string]: string };
  const dicoIcon: { [key: string]: string } = useSettings.getDicoIcon() as { [key: string]: string };


  
  const sections = {
    'title' : {
        'title': "Nom et Disponibilité",
        "data-show-btn": "shipping_methods_settings_container",
        "isButton": true,
        "section_type": "title",
        "list_1": shippingMethodsArray?.slice(0, 1),
        "list_2": shippingMethodsArray?.slice(1, 2)
    }, 
    'price' : {
        "title" : "Prix", 
        "data-show-btn": "shipping_methods_settings_container",
        "isButton": true,
        "section_type": "price",
        "list_1": shippingMethodsArray?.slice(0, 1),
        "list_2": shippingMethodsArray?.slice(1, 2)
    }, 
    'delivery_time' : {
        'title': "Délais de livraison",
        "data-show-btn": "delivery_time_setting_container",
        "isButton": true,
        "section_type": "delivery_time",
        "list_1": shippingMethodsArray?.slice(0, 1),
        "list_2": shippingMethodsArray?.slice(1, 2)
    }, 
    
   
  }

  useEffect(() => {
    const shipping_methods_data = useSettings.getShippingMethodsInfos();
    shipping_methods_data.then((data) => {
      setState({
          shipping_methods: data as ShippingMethod[]
      });
      console.log(data as ShippingMethod[])
    })
  }, [])
  return (
    <>
     <div className='payments_settings_container'>
     <h2>Méthodes de livraison</h2>
     {Object.entries(sections).map((data: [string, any]) => {
         return (
             <div className='section_settings_container' key={data[0]}>
                 <div className='settings_container_header'>
                     <h3>{data[1].title}</h3>
                     {data[1].isButton ? <button className='button btn modif_btn' data-show={data[1]['data-show-btn']}>Modifier</button> : <></>}
                 </div>
                 <div className='settings_container' id={data[1]['settings_container_id']}>
                    
                    <div className=''>
                        {data[1].list_1.length !== 0 ? 
                         <div className='infos_container_grid'>
                            <MapShippingMethods list={data[1].list_1} dicoText={dicoText} dicoIcon={dicoIcon} sectionType={data[1].section_type}/>
                             {/* <MapSettings list={data[1].list_1} dicoText={dicoText} dicoIcon={dicoIcon} isArray={true}/> */}
                         </div>
                         : ''}
                         {data[1].list_2.length !== 0 ?
                         <div className='infos_container_grid'>
                            <MapShippingMethods list={data[1].list_2} dicoText={dicoText} dicoIcon={dicoIcon} sectionType={data[1].section_type}/>
                             {/* <MapSettings list={data[1].list_2} dicoText={dicoText} dicoIcon={dicoIcon} isArray={true}/> */}
                         </div>
                          : ''}
                    </div>
                 </div>
             </div>
         )
     })}
    </div>
    </>
  )
}
