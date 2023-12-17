import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import GeneralSettings from '../views/settings/general/GeneralSettings';
import UsersSettings from '../views/settings/users/UsersSettings';
import PaymentSettings from '../views/settings/payments/PaymentSettings';
import ShippingMethodSettings from '../views/settings/shipping_method/ShippingMethodSettings';
import PoliticSettings from '../views/settings/politics/PoliticSettings';

interface SettingsRouterProps {
    test: string;
}

const SettingsRouter: React.FC<SettingsRouterProps> = ({test}) => {
    const windowLocation = window.location.pathname;
    if (windowLocation.includes('/settings')) {
        const slicedPath = windowLocation.slice(10);
        if(slicedPath === '') {
            window.location.href = '/settings/general';
        }
        else if(slicedPath === 'general') {
            return (
                <GeneralSettings/>
            )
        }
        else if(slicedPath === 'users') {
            return (
                <UsersSettings/>
            )
        }
        else if (slicedPath === "payments"){
          return (
            <PaymentSettings/>
          )
        }
        else if (slicedPath === "shipping_method"){
          return (
            <ShippingMethodSettings/>
          )
        }
        else if (slicedPath === "politics"){
          return (
            <PoliticSettings/>
          )
        }
        else{
          return(<></>)
        }
    }
    return(<></>)
  
}

export default SettingsRouter