import React, {useState, useEffect} from 'react'
import { PaymentLegalInfos } from '../../../models/settings/PaymentLegalInfos';
import { PaymentCheckoutForm } from '../../../models/settings/PaymentCheckoutForm';
import { PaymentProcessor } from '../../../models/settings/PaymentProcessor';
import useSettings from '../../../hooks/useSettings';
import { CheckoutAvailability } from '../../../models/settings/CheckoutAvailability';
import MapSettings from '../MapSettings';


type PaymentSettingsState = {
  payment_legal_infos: PaymentLegalInfos;
  checkout_availability: CheckoutAvailability;
  payments_checkout_form: PaymentCheckoutForm;
  payments_processor: PaymentProcessor;
}


export default function PaymentSettings() {
  const [state, setState] = React.useState<PaymentSettingsState>();
  const paymentLegalInfosArray = state ? Object.entries(state?.payment_legal_infos as PaymentLegalInfos) : [];
  const paymentCheckoutFormArray = state ? Object.entries(state?.payments_checkout_form as PaymentCheckoutForm) : [];
  const paymentProcessorArray = state ? Object.entries(state?.payments_processor as PaymentProcessor) : [];
  const dicoText: { [key: string]: string } = useSettings.getDicoText() as { [key: string]: string };
  const dicoIcon: { [key: string]: string } = useSettings.getDicoIcon() as { [key: string]: string };
  

  const sections = {
    'legal_infos' : {
        "title" : "Informations Légales", 
        "data-show-btn": "legal_infos_settings_container",
        "settings_container_id": "legal_infos_settings_container",
        "list_1": paymentLegalInfosArray?.slice(0, 2),
        "list_2": paymentLegalInfosArray?.slice(2, 4)
    }, 
    'checkout_availability' : {
        'title': "Passage à la caisse",
        "data-show-btn": "checkout_availability_setting_container",
        "settings_container_id": "payments_checkout_availability_settings_container",
        "list_1": Object.entries({"checkout_availability": state?.checkout_availability ? "Actif" : "Inactif"}),
        "list_2": []
    }, 
    'checkout_form' : {
        'title': "Formulaire client",
        "data-show-btn": "checkout_form_setting_container",
        "settings_container_id": "payments_checkout_form_settings_container",
        "list_1": paymentCheckoutFormArray?.slice(0, 7),
        "list_2": paymentCheckoutFormArray?.slice(7, 13)
    }, 
    'payment_processor' : {
        'title': "Processeur de paiement",
        "data-show-btn": "payment_processor_setting_container",
        "settings_container_id": "payments_payment_processor_settings_container",
        "list_1": paymentProcessorArray?.slice(0, 3),
        "list_2": paymentProcessorArray?.slice(3, 6)
    }
}

  useEffect(() => {
    const payments_data = useSettings.getPaymentSettings();
    payments_data.then((data) => {
      if (data !== undefined){
        setState({
          payment_legal_infos: data?.paymentsLegalInfos as PaymentLegalInfos,
          checkout_availability: data?.checkout_availability as CheckoutAvailability,
          payments_checkout_form: data?.paymentsCheckoutFormSettings as PaymentCheckoutForm,
          payments_processor: data?.paymentsProcessorSettings as PaymentProcessor
        })
      }
    })
  }, [])
  return (
    <>
     <div className='settings_container'>
     <h2>Paramètres de Paiements</h2>
     {Object.entries(sections).map((data: [string, any]) => {
         return (
             <div className='section_settings_container' key={data[0]}>
                 <div className='settings_container_header'>
                     <h3>{data[1].title}</h3>
                     <button className='button btn modif_btn' data-show={data[1]['data-show-btn']}>Modifier</button>
                 </div>
                 <div className='settings_container' id={data[1]['settings_container_id']}>
                    
                    <div className='infos_container'>
                        {data[1].list_1.length !== 0 ? 
                         <div className='infos_container_grid'>
                             <MapSettings list={data[1].list_1} dicoText={dicoText} dicoIcon={dicoIcon} />
                         </div>
                         : ''}
                         {data[1].list_2.length !== 0 ?
                         <div className='infos_container_grid'>
                             <MapSettings list={data[1].list_2} dicoText={dicoText} dicoIcon={dicoIcon} />
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
