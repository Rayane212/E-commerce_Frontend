import React, {useState, useEffect} from 'react'
import { ShippingMethod } from '../../../models/ShippingMethod'
import useSettings from '../../../hooks/useSettings'
import MapShippingMethods from './MapShippingMethods'

type ShippingMethodState = {
  shipping_methods: ShippingMethod[];
  toSave: [string, string][];
}

export default function ShippingMethodSettings() {
  const [state, setState] = useState<ShippingMethodState>()
  const shippingMethodsArray = state ? Object.entries(state?.shipping_methods as ShippingMethod[]) : [];
  const dicoText: { [key: string]: string } = useSettings.getDicoText() as { [key: string]: string };
  const dicoIcon: { [key: string]: string } = useSettings.getDicoIcon() as { [key: string]: string };

  
  const sections = {
    'title' : {
        'title': "Nom et Disponibilité",
        "data-show_input": "shipping_method_title_input_container",
        "data-show-input_2": "shipping_method_availability_input_container",
        "data-hide-text": "title_label",
        "data-hide-text_2": "availability_label",
        "isButton": true,
        "section_type": "title",
        "list_1": shippingMethodsArray?.slice(0, 1),
        "list_2": shippingMethodsArray?.slice(1, 2)
    }, 
    'price' : {
        "title" : "Prix", 
        "data-show_input": "shipping_method_price_input_container",
        "data-hide-text": "price_label",
        "isButton": true,
        "section_type": "price",
        "list_1": shippingMethodsArray?.slice(0, 1),
        "list_2": shippingMethodsArray?.slice(1, 2)
    }, 
    'delivery_time' : {
        'title': "Délais de livraison",
        "data-show_input": "shipping_method_delivery_time_input_container",
        "data-hide-text": "delivery_time_label",
        "isButton": true,
        "section_type": "delivery_time",
        "list_1": shippingMethodsArray?.slice(0, 1),
        "list_2": shippingMethodsArray?.slice(1, 2)
    }, 
    
   
  }
  const modifBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const isSaving = state?.toSave;
    const target = e.target as HTMLButtonElement;
    const input = document.querySelector('.' + target.dataset.showinput + ' > .shipping_method_input') as HTMLInputElement;
    input.addEventListener('change', (event) => inputChange(event));
    modifBtnText(e);
    showInputs(e);

  }

  const inputChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    console.log(input);
  }

  const modifBtnText = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.target as HTMLButtonElement;
    if (btn.innerText === 'Modifier') {
      btn.innerText = 'Enregistrer';
    }
    else {
      btn.innerText = 'Modifier';
    }
  }
  const showInputs = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const dataShow = target.dataset.showinput_2 ? [ target.dataset.showinput as string, target.dataset.showinput_2 as string] : [ target.dataset.showinput as string]
    const dataHide = target.dataset.hidetext_2 ? [ target.dataset.hidetext as string, target.dataset.hidetext_2 as string] : [ target.dataset.hidetext as string]
    dataShow.forEach((data: string) => {
      const inputs = document.getElementsByClassName(data as string);
      if (inputs) {
        const inputsArray = Array.from(inputs);
        inputsArray.forEach((input: any) => {
          input.classList.toggle('hide');
        })
      }
    })
    dataHide.forEach((data: string) => {
      const texts = document.getElementsByClassName(data as string);
      if (texts) {
        const textsArray = Array.from(texts);
        textsArray.forEach((text: any) => {
          text.classList.toggle('hide');
        })
      }
    })
  }
  useEffect(() => {
    const shipping_methods_data = useSettings.getShippingsMethod();
    shipping_methods_data.then((data: any) => {
      setState({
          shipping_methods: data as ShippingMethod[],
          toSave: []
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
                     {data[1].isButton ? 
                     <button className='button btn modif_btn' 
                        data-showInput={data[1]['data-show_input']} 
                        data-showInput_2={data[1]['data-show-input_2'] ? data[1]['data-show-input_2'] : ''} 
                        data-hideText={data[1]['data-hide-text']}
                        data-hideText_2={data[1]['data-hide-text_2'] ? data[1]['data-hide-text_2'] : ''}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => modifBtnClick(e)}>
                          Modifier
                      </button> : <></>}
                 </div>
                 <div className='settings_container' id={data[1]['settings_container_id']}>
                    
                    <div className=''>
                        {data[1].list_1.length !== 0 ? 
                         <div className='infos_container_grid'>
                            <MapShippingMethods list={data[1].list_1} dicoText={dicoText} dicoIcon={dicoIcon} sectionType={data[1].section_type}/>
                         </div>
                         : ''}
                         {data[1].list_2.length !== 0 ?
                         <div className='infos_container_grid'>
                            <MapShippingMethods list={data[1].list_2} dicoText={dicoText} dicoIcon={dicoIcon} sectionType={data[1].section_type}/>
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
