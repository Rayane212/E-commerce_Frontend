import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Orders from '../pages/Orders';
import Customers from '../pages/Customers';
import Products from '../pages/Products';
import Settings from '../pages/Settings';
import OrderPage from '../views/orders/OrderPage/OrderPage';

export default function AppRouter() {
  const windowLocation = window.location.pathname;
  const navigate = useNavigate();
  if (windowLocation === '/'){
    navigate('/orders');
  }
  return ( 
    <Routes>
      <Route path='/orders' Component={Orders}/>
      <Route path='/orders/:id' element={<OrderPage/>} />
      <Route path='/customers' Component={Customers}/>
      <Route path='/products' Component={Products}/>
      <Route path='/settings' Component={Settings}/>
      <Route path='/settings/general' Component={Settings}/>
      <Route path='/settings/users' Component={Settings}/>
      <Route path='/settings/payments' Component={Settings} />
      <Route path="/settings/shipping_method" Component={Settings}/>
      <Route path="/settings/politics" Component={Settings}/>
    </Routes>
  )
}
