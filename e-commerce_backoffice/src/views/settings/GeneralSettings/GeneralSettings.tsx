import React, { useEffect } from 'react'
import useSettings from '../../../hooks/useSettings';
import { NotifsInfos } from '../../../models/settings/NotifsInfos';
import { GeneralInfos } from '../../../models/settings/GeneralInfos';
import { ContactInfos } from '../../../models/settings/ContactInfos';
import { ShopInfos } from '../../../models/settings/ShopInfos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './general_settings.css';



export default function GeneralSettings() {
    const [shopInfos, setShopInfos] = React.useState<ShopInfos>();
    const [adminNotifs, setAdminNotifs] = React.useState<NotifsInfos>();
    const shopInfosData = useSettings.getShopInfos();
    let shopInfosVar : ShopInfos = {
        shop_name: '',
        shop_description: '',
        shop_logo_url: '',
        shop_email: '',
        shop_phone: '',
        shop_address_number: '',
        shop_address_street: '',
        shop_address_zipcode: '',
        shop_address_city: '',
        shop_address_country: '',
        shop_address_state: '',
        shop_language: '',
        shop_currency: '',
        shop_timezone: '',
        shop_weight_unit: '',
    };
    let adminNotifsVar : NotifsInfos = {
        new_sales: false,
        refunds: false,
        delivered_orders: false,
        order_issues: false,
        settings_changes: false,
        new_employees: false,
    }

    shopInfosData.then((data) => {
        const general_infos = data.generalInfos as GeneralInfos; 
        const notifications_infos = data.notificationsInfos as NotifsInfos;
        const contact_infos = data.contactInfos as ContactInfos;
        changeShopInfos(general_infos, contact_infos);
        changeNotifsInfos(notifications_infos);
    })
    
    function changeShopInfos(general : GeneralInfos, contact : ContactInfos){
        shopInfosVar.shop_name = general.shop_name;
        shopInfosVar.shop_description = general.shop_description;
        shopInfosVar.shop_logo_url = general.shop_logo_url;
        shopInfosVar.shop_email = contact.shop_email;
        shopInfosVar.shop_phone = contact.shop_phone;
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
    }
    function changeNotifsInfos(notifs : NotifsInfos){
        adminNotifsVar.new_sales = notifs.new_sales;
        adminNotifsVar.refunds = notifs.refunds;
        adminNotifsVar.delivered_orders = notifs.delivered_orders;
        adminNotifsVar.order_issues = notifs.order_issues;
        adminNotifsVar.settings_changes = notifs.settings_changes;
        adminNotifsVar.new_employees = notifs.new_employees;
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
        setShopInfos(shopInfosVar);
        setAdminNotifs(adminNotifsVar);
    }, [])

  return (
    <div className='generalSettings_container'>
        <h2>Paramètres Généraux</h2>
        <div className='section_settings_container'>
            <div className='profilSettings_header'>
                <h3>Profil</h3>
                <button className='button btn modif_btn' data-show='profil_setting_container'>Modifier</button>
            </div>
            <div className='settings_container' id='profil_setting_container'>
                <div className='infos_container'>
                    <div className='profil_infos_name'>
                        <div>
                            <FontAwesomeIcon icon={['fas', 'store']} />
                        </div>
                        <div>
                            <p>Nom de la boutique</p>
                            <p className='shop_name shop_infos_read'>{shopInfos?.shop_name}</p>
                        </div>
                    </div>
                    <div className='profil_infos_timezone'>
                        <div>
                            <FontAwesomeIcon icon={['fas', 'clock']} />
                        </div>
                        <div>
                            <p>Fuseau Horaire</p>
                            <p className='shop_timezone shop_infos_read'>{shopInfos?.shop_timezone}</p>
                        </div>
                    </div>
                    <div className='profil_infos_weight_unit'>
                        <div>
                            <FontAwesomeIcon icon={['fas', 'weight-hanging']} />
                        </div>
                        <div>
                            <p>Unité de poids</p>
                            <p className='shop_weight_unit shop_infos_read'>{shopInfos?.shop_weight_unit}</p>
                        </div>
                    </div>
                    
                </div>
                
                {/* <label form='shop_name'>Nom de la boutique:</label>
                <input type="text" name="shop_name" id="shop_name" value={shopInfos?.shop_name} placeholder={shopInfos?.shop_name === '' ? 'Nom de la boutique' : shopInfos?.shop_name}/> */}
                {/* <p>Fuseau Horaire</p>
                <select id="shop_timezone" name="shop_timezone">
                    <option value="Europe/Paris">Europe/Paris</option>
                    <option value="America/New_York">America/New_York</option>
                    <option value="Asia/Tokyo">Asia/Tokyo</option>
                </select>
                <p>Unité de poids</p>
                <select id="shop_weight_unit" name="shop_weight_unit">
                    <option value="Kilogrammes">Kilogrammes</option>
                    <option value="Grammes">Grammes</option>   
                </select> */}
            </div>
        </div>

        <div className='section_settings_container '>
             <div className='profilSettings_header'>
                <h3>Contact</h3>
                <button className='button btn modif_btn' data-show='contact_setting_container' onClick={showFields}>Modifier</button>
            </div>
            <div className='infos_container'>
                    <div className='profil_infos_name'>
                        <div>
                            <FontAwesomeIcon icon={['fas', 'store']} />
                        </div>
                        <div>
                            <p>Adresse de la boutique</p>
                            <p className='shop_name shop_infos_read'>{shopInfos?.shop_name}</p>
                        </div>
                    </div>
                    <div className='profil_infos_timezone'>
                        <div>
                            <FontAwesomeIcon icon={['fas', 'clock']} />
                        </div>
                        <div>
                            <p>Fuseau Horaire</p>
                            <p className='shop_timezone shop_infos_read'>{shopInfos?.shop_timezone}</p>
                        </div>
                    </div>
                    <div className='profil_infos_weight_unit'>
                        <div>
                            <FontAwesomeIcon icon={['fas', 'weight-hanging']} />
                        </div>
                        <div>
                            <p>Unité de poids</p>
                            <p className='shop_weight_unit shop_infos_read'>{shopInfos?.shop_weight_unit}</p>
                        </div>
                    </div>
                    
                </div>
            <div className='settings_container pop_up' id='contact_setting_container'>
                <p>Adresse de la boutique</p>
                <label form='shop_adress_number'>N°</label>
                <input type="text" name="shop_address_number" id="shop_address_number"  value={shopInfos?.shop_address_number} placeholder={shopInfos?.shop_address_number === '' ? 'Numéro de Rue' : shopInfos?.shop_address_number}/>
                <label form='shop_adress_street'>Rue</label>
                <input type="text" name="shop_address_street" id="shop_address_street"  value={shopInfos?.shop_address_number} placeholder={shopInfos?.shop_address_number === '' ? 'Nom de Rue' : shopInfos?.shop_address_number}/>
                <label form='shop_email'>Adresse email</label>
                <input type="text" name="shop_email" id="shop_email"  value={shopInfos?.shop_email} placeholder={shopInfos?.shop_email === '' ? 'E-mail de la boutique' : shopInfos?.shop_email}/>
                <label form='shop_phone'>Numéro de téléphone</label>
                <input type="text" name="shop_phone" id="shop_phone"  value={shopInfos?.shop_phone} placeholder={shopInfos?.shop_phone === '' ? 'Numéro de la boutique' : shopInfos?.shop_phone}/>
            </div>
        </div>

        <div className='section_settings_container '>
            <div className='profilSettings_header'>
                <h3>Notifications</h3>
                <button className='button btn modif_btn' data-show='notifications_setting_container' onClick={showFields}>Modifier</button>
            </div>
            <p>Vous pouvez changer ici les paramètres liés aux notifications que vous recevez. Décidez quels messages vous souhaitez recevoir.</p>
            <div className='settings_container pop_up' id='notifications_setting_container'>
                <p>Nouvelles Ventes</p>
                <select>
                    <option value="true">Oui</option>
                    <option value="false">Non</option>
                </select>
                <p>Remboursements/Retours</p>
                <select>
                    <option value="true">Oui</option>
                    <option value="false">Non</option>
                </select>
                <p>Commandes Livrées</p>
                <select>
                    <option value="true">Oui</option>
                    <option value="false">Non</option>
                </select>
                <p>Problèmes sur les Commandes</p>
                <select>
                    <option value="true">Oui</option>
                    <option value="false">Non</option>
                </select>
                <p>Changements de paramètres</p>
                <select>
                    <option value="true">Oui</option>
                    <option value="false">Non</option>
                </select>
                <p>Nouveaux Employés</p>
                <select>
                    <option value="true">Oui</option>
                    <option value="false">Non</option>
                </select>
            </div>
        </div>

        <div className='btn_container'>
            <button className='button btn'>Enregistrer</button>
        </div>

    </div>
  )
}
