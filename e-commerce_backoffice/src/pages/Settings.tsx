import React from 'react';
import GeneralSettings from '../views/settings/general/GeneralSettings';
import '../views/settings/settings.css'
import PageHeader from '../views/general/PageHeader';
import { SettingsOptions } from '../models/settings/SettingsOptions';
import SettingsRouter from '../routers/SettingsRouter';

function Settings() {
    const settingsOptionsList: SettingsOptions = {
        'general': {
            'title': 'Général',
            'link' : "/general",
            'component': <GeneralSettings/>
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
                optionsList={settingsOptionsList}
            />
            <SettingsRouter test="test"/>
        </div>
        
    )
}


export default Settings;
