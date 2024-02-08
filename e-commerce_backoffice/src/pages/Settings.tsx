import React from 'react';
import '../views/settings/settings.css'
import PageHeader from '../views/general/page_header/PageHeader';
import { SettingsOptions } from '../models/settings/SettingsOptions';
import SettingsRouter from '../routers/SettingsRouter';

function Settings() {
    const settingsOptionsList: SettingsOptions = {
        'general': {
            'title': 'Général',
            'link' : "/general",
            },
        'users': {
            'title': 'Utilisateurs',
            'link' : "/users",
        },
        'payments': {
            'title': 'Paiements',
            'link' : "/payments",
        },
        'shipping_method': {
            'title': 'Méthodes de livraison',
            'link' : "/shipping_method",
        }, 
        'politics': {
            'title': 'Politiques',
            'link' : "/politics",
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
            <SettingsRouter/>
        </div>
        
    )
}


export default Settings;
