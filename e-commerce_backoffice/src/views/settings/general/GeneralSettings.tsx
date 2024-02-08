import React, { useEffect } from 'react'
import './general_settings.css';
import useSettings from '../../../hooks/useSettings';
import { NotifsInfos } from '../../../models/settings/NotifsInfos';
import { GeneralInfos } from '../../../models/settings/GeneralInfos';
import { ContactInfos } from '../../../models/settings/ContactInfos';
import { ShopInfos } from '../../../models/settings/ShopInfos';
import MapSettings from '../MapSettings';

type GeneralSettingsState = {
    general_infos: GeneralInfos;
    contact_infos: ContactInfos;
    admin_notifs: NotifsInfos;
    shop_infos: ShopInfos;
}

export default function GeneralSettings() {
    const [state, setState] = React.useState<GeneralSettingsState>();
    
    const notifsInfosArray = state ? Object.entries(state?.admin_notifs as NotifsInfos) : [];
    const shopInfosArray = state ? Object.entries(state?.shop_infos as ShopInfos) : [];
    const dicoText: { [key: string]: string } = useSettings.getDicoText() as { [key: string]: string };
    const dicoIcon: { [key: string]: string } = useSettings.getDicoIcon() as { [key: string]: string };
    const shop_adress_text = state?.shop_infos ? state?.shop_infos?.shop_address_number + ' ' + state?.shop_infos?.shop_address_street + ', ' + state?.shop_infos?.shop_address_zipcode + ' ' + state?.shop_infos?.shop_address_city + ', ' + state?.shop_infos.shop_address_state + ' ' + state?.shop_infos.shop_address_country: '';
   
    const sections = {
        'profil': {
            "title": "Profil",
            "data-show-btn": "profil_setting_container",
            "settings_container_id": "profil_settings_container",
            "list_1": shopInfosArray?.slice(0, 2),
            "list_2": shopInfosArray?.slice(2, 4)
        }, 
        "contact": {
            "title": "Contact",
            "data-show-btn": "contact_setting_container",
            "settings_container_id": "contact_settings_container",
            "list_1": shopInfosArray?.slice(4, 6),
            "list_2": shopInfosArray?.slice(6, 7).concat(Object.entries({'shop_adress' :  shop_adress_text})),
        },
        "others": {
            "title": "Autres Paramètres",
            "data-show-btn": "others_setting_container",
            "settings_container_id": "others_settings_container",
            "list_1": shopInfosArray?.slice(13, 15),
            "list_2": shopInfosArray?.slice(15, 17),
        },
        'notifs': {
            "title": "Notifications",
            "data-show-btn": "notifs_setting_container",
            "settings_container_id": "notifs_settings_container",
            "list_1": notifsInfosArray?.slice(0, 3),
            "list_2": notifsInfosArray?.slice(3, 6),
        },
    }

    let shopInfosVar : ShopInfos = {
        shop_name: '',
        shop_description: '',
        shop_available: false,
        shop_language: '',
        shop_email: '',
        shop_opening_hours: '',
        shop_phone: '',
        shop_address_number: '',
        shop_address_street: '',
        shop_address_zipcode: '',
        shop_address_city: '',
        shop_address_country: '',
        shop_address_state: '',
        shop_currency: '',
        shop_timezone: '',
        shop_weight_unit: '',
        shop_metric_unit: '',
    };
    
    function changeShopInfos(general : GeneralInfos, contact : ContactInfos){
        shopInfosVar.shop_name = general.shop_name;
        shopInfosVar.shop_description = general.shop_description;
        shopInfosVar.shop_available = general.shop_available;
        shopInfosVar.shop_email = contact.shop_email;
        shopInfosVar.shop_phone = contact.shop_phone;
        shopInfosVar.shop_opening_hours = contact.shop_opening_hours;
        shopInfosVar.shop_address_number = contact.shop_address_number;
        shopInfosVar.shop_address_street = contact.shop_address_street;
        shopInfosVar.shop_address_zipcode = contact.shop_address_zipcode;
        shopInfosVar.shop_address_city = contact.shop_address_city;
        shopInfosVar.shop_address_country = contact.shop_address_country;
        shopInfosVar.shop_address_state = contact.shop_address_state;
        shopInfosVar.shop_language = general.shop_language;
        shopInfosVar.shop_currency = general.shop_currency;
        shopInfosVar.shop_timezone = general.shop_timezone;
        shopInfosVar.shop_weight_unit = general.shop_weight_unit == 'kg' ? 'Kilogrammes' : 'Grammes';
        shopInfosVar.shop_metric_unit = general.shop_metric_unit;
    }

    function showFields(e: any){
        const dataToShow = e.target.getAttribute('data-show') as HTMLElement;
        const textBtn = e.target.innerHTML;
        if (textBtn === 'Modifier'){
            e.target.innerHTML = 'Fermer';
        }
        else{
            e.target.innerHTML = 'Modifier';
        }
        const toShow = document.getElementById(dataToShow.toString());
        toShow?.classList.toggle('pop_up');
    }

    useEffect(() => {
        const shopInfosData = useSettings.getShopInfos();
        shopInfosData.then((data) => {
            if (data !== undefined){
                changeShopInfos(data?.generalInfos as GeneralInfos, data?.contactInfos as ContactInfos);
                setState({
                    general_infos: data.generalInfos as GeneralInfos,
                    contact_infos: data.contactInfos as ContactInfos,
                    admin_notifs: data.notificationsInfos as NotifsInfos, 
                    shop_infos: shopInfosVar
                })
            }
        })
    }, [])

    

  return (
    <div className='generalSettings_container'>
        <h2>Paramètres Généraux</h2>
        {Object.entries(sections).map((data: [string, any]) => {
            return (
                <div className='section_settings_container' key={data[0]}>
                    <div className='settings_container_header'>
                        <h3>{data[1].title}</h3>
                        <button className='button btn modif_btn' data-show={data[1]['data-show-btn']} onClick={showFields}>Modifier</button>
                    </div>
                    <div className='settings_container' id={data[1]['settings_container_id']}>
                        <div className='infos_container'>
                            <div className='infos_container_grid'>
                                <MapSettings list={data[1].list_1} dicoText={dicoText} dicoIcon={dicoIcon} />
                            </div>
                            <div className='infos_container_grid'>
                                <MapSettings list={data[1].list_2} dicoText={dicoText} dicoIcon={dicoIcon} />
                            </div>
                        </div>
                    </div>
                </div>
            )
        })}
    </div>
  )
}
