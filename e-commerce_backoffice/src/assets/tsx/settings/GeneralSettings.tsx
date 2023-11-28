import React from 'react'

export default function GeneralSettings() {
    let shop_name = '';
    let shop_email = '';
    let shop_phone = '';
    let shop_address = '';
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
  return (
    <div className='generalSettings_container'>

        <h2>Paramètres Généraux</h2>

        <div className='section_settings_container'>
            <div className='profilSettings_header'>
                <h3>Profil</h3>
                <button className='button btn modif_btn' data-show='profil_setting_container' onClick={showFields}>Modifier</button>
            </div>
            <p>Vous pouvez changer ici les paramètres du profil de la boutique. En effet, vous pouvez modifier le nom de la boutique, son fuseau horaire ainsi que son unité de poids.</p>
            <div className='settings_container pop_up' id='profil_setting_container'>
                <p>Nom de la boutique:</p>
                <input type="text" name="shop_name" id="shop_name" value={shop_name} placeholder={shop_name === '' ? 'Nom de la boutique' : shop_name}/>
                <p>Fuseau Horaire</p>
                <select id="shop_timezone" name="shop_timezone">
                    <option value="Europe/Paris">Europe/Paris</option>
                    <option value="America/New_York">America/New_York</option>
                    <option value="Asia/Tokyo">Asia/Tokyo</option>
                </select>
                <p>Unité de poids</p>
                <select id="shop_weight_unit" name="shop_weight_unit">
                    <option value="Kilogrammes">Kilogrammes</option>
                    <option value="Grammes">Grammes</option>   
                </select>
            </div>
        </div>

        <div className='section_settings_container '>
             <div className='profilSettings_header'>
                <h3>Contact</h3>
                <button className='button btn modif_btn' data-show='contact_setting_container' onClick={showFields}>Modifier</button>
            </div>
            <p>Vous pouvez changer ici les paramètres de contact de la boutique. Vous pouvez modifier l'adresse postale, l'adresse e-mail et le numéro de téléphone de la boutique.</p>
            <div className='settings_container pop_up' id='contact_setting_container'>
                <p>Adresse de la boutique</p>
                <input type="text" name="shop_address" id="shop_address"  value={shop_address} placeholder={shop_address === '' ? 'Adresse de la boutique' : shop_address}/>
                <p>Adresse email</p>
                <input type="text" name="shop_email" id="shop_email"  value={shop_email} placeholder={shop_email === '' ? 'E-mail de la boutique' : shop_email}/>
                <p>Numéro de téléphone</p>
                <input type="text" name="shop_phone" id="shop_phone"  value={shop_phone} placeholder={shop_phone === '' ? 'Numéro de la boutique' : shop_phone}/>
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
