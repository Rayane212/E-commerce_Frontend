import React from 'react';
import GeneralSettings from '../views/settings/GeneralSettings/GeneralSettings';
import '../views/settings/settings.css'
import PageHeader from '../views/general/PageHeader';
import { SettingsOptions } from '../models/settings/SettingsOptions';


function Settings() {
    const settingsOptionsList = {
        'general': 'Général',
        'users': 'Utilisateurs et Autorisations',
        'payments': 'Paiements',
        'shipping_method': 'Méthodes de Livraison',
        'politics': 'Politiques',
    };
    const testOptionsList: SettingsOptions = {
        'general': {
            'title': 'Général',
            'link' : "/general",
            // 'component': <GeneralSettings/>
            },
        'users': {
            'title': 'Utilisateurs',
            'link' : "/users",
            // 'component': <GeneralSettings/>
        },
        'payments': {
            'title': 'Paiements',
            'link' : "/payments",
            // 'component': <GeneralSettings/>
        },
        'shipping_method': {
            'title': 'Méthodes de livraison',
            'link' : "/shipping_method",
            // 'component': <GeneralSettings/>
        }, 
        'politics': {
            'title': 'Politiques',
            'link' : "/politics",
            // 'component': <GeneralSettings/>
        },
    };
      
    return(
        <div className='main_container'>
            <PageHeader
                title='Paramètres'
                link=''
                isButton={false}
                buttonTitle=''
                isSelect={true}
                isRecord={false}
                optionsList={testOptionsList}
            />
            <GeneralSettings/>
        </div>
        
    )
}


export default Settings;
