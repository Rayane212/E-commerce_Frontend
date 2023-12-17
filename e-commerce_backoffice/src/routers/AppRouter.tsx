import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from '../pages/Home';
import Orders from '../pages/Orders';
import Customers from '../pages/Customers';
import Products from '../pages/Products';
import Settings from '../pages/Settings';
import Stats from '../pages/Stats';

export default function AppRouter() {
  return (
    <Router>
        <Routes>
            <Route path='/' Component={Home}/>
            <Route path='/home' Component={Home}/>
            <Route path='/orders' Component={Orders}/>
            <Route path='/customers' Component={Customers}/>
            <Route path='/products' Component={Products}/>
            <Route path='/settings' Component={Settings}/>
            <Route path='/settings/general' Component={Settings}/>
            <Route path='/settings/users' Component={Settings}/>
            <Route path='/settings/payments' Component={Settings} />
            <Route path="/settings/shipping_method" Component={Settings}/>
            <Route path="/settings/politics" Component={Settings}/>
            <Route path='/stats' Component={Stats}/>
        </Routes>
    </Router>
  )
}