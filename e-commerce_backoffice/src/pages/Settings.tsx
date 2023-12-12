import React from 'react';
import GeneralSettings from '../views/settings/GeneralSettings/GeneralSettings';
import '../views/settings/settings.css'
import PageHeader from '../views/general/PageHeader';

function Settings() {
    const settingsOptionsList = {
        'general': 'Général',
        'users': 'Utilisateurs et Autorisations',
        'payments': 'Paiements',
        'shipping_method': 'Méthodes de Livraison',
        'politics': 'Politiques',
      };
      
    return(
        <div className='main_container'>
            <PageHeader
                title='Paramètres'
                link=''
                isButton={false}
                buttonTitle=''
                isSelect={true}
                optionsList={settingsOptionsList}
            />
            <GeneralSettings/>
        </div>
        
    )
}


export default Settings;
