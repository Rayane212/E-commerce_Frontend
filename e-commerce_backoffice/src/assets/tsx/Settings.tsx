import React from 'react';
import SettingsHeader from '../../views/settings/SettingsHeader';
import GeneralSettings from './settings/GeneralSettings';
import '../css/settings.css'

function Settings() {
    return(
        <div className='main_container'>
            <SettingsHeader/>
            <GeneralSettings/>
            {/* <div className='products_container'>
                <ProductsFilter/>
                <ProductsTable/>
            </div> */}
        </div>
        
    )
}


export default Settings;
