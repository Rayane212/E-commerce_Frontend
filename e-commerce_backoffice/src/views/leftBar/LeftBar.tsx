import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import './leftBar.css';

interface MenuItem {
  text: string;
  link: string;
}

const Menu_LeftBar: FC = () => {
  let menuItems: MenuItem[] = [
    { text: 'Commandes', link: '/orders' },
    { text: 'Produits', link: '/products' },
    { text: 'Clients', link: '/customers' },
    { text: 'Paramètres', link: '/settings'},
  ];
  return (
    <ul>
      {menuItems.map((item, index) => (
        <NavLink 
        className={({ isActive }) => (isActive ? 'activeLink' : '')}
        to={item.link as string} key={index}>
          <li key={index}>{item.text}</li>
        </NavLink>
      ))}
    </ul>
  );
}

const Menu_LogOut: FC = () => {
  let test: string = "Hamza Sabil";
  return (
    <ul>
      <li className='admin-name'>
        {test}
      </li>
      <li className='admin-logout'>
        <a href='/admin/logout'>Déconnexion</a>
      </li>
    </ul>
  );
}

const LeftBar: FC = () => {
  return (
    <div className="left-bar">
      <div className="nav-menu">
        <Menu_LeftBar />
        
      </div>
      <div className='nav-logout'>
        <Menu_LogOut />
      </div>
    </div>
  );
}

export default LeftBar;