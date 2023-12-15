import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import GeneralSettings from '../views/settings/GeneralSettings/GeneralSettings';
import UsersSettings from '../views/settings/UsersSettings/UsersSettings';

interface SettingsRouterProps {
    test: string;
}

const SettingsRouter: React.FC<SettingsRouterProps> = ({test}) => {
    const windowLocation = window.location.pathname;
    if (windowLocation.includes('/settings')) {
        const slicedPath = windowLocation.slice(10);
        console.log(slicedPath);
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
        else{
          
          return(<></>)
        }
    }
    return(<><p>test</p></>)
  
}

export default SettingsRouter