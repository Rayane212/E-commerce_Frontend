import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import GeneralSettings from '../views/settings/general/GeneralSettings';
import UsersSettings from '../views/settings/users/UsersSettings';
import PaymentSettings from '../views/settings/payments/PaymentSettings';
import ShippingMethodSettings from '../views/settings/shipping_method/ShippingMethodSettings';
import PoliticSettings from '../views/settings/politics/PoliticSettings';

const SettingsRouter: React.FC = () => {
    const windowLocation = window.location.pathname;
    const navigate = useNavigate();
    if (windowLocation.includes('/settings')) {
        const slicedPath = windowLocation.slice(10);
        if(slicedPath === '') {
            navigate('/settings/general');
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