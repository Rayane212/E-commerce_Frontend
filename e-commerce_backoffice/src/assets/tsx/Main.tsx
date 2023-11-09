import React, { FC, ReactNode } from 'react';
import Home from './Home';
import Orders from './Orders';
import Products from './Products';
import Customers from './Customers';
import Stats from './Stats';
import Settings from './Settings';

interface MainProps {
  component: {
    name: string;
    comm: string;
  };
}


const Main: FC<MainProps> = ({ component }) => {
  const { comm } = component;
  let content: ReactNode = null;

  switch (comm) {
    case 'home':
      content = <Home />;
      break;
    case 'orders':
      content = <Orders />;
      break;
    case 'products':
      content = <Products />;
      break;
    case 'customers':
      content = <Customers />;
      break;
    case 'stats':
      content = <Stats />;
      break;
    case 'settings':
      content = <Settings />;
      break;
    default:
      break;
  }

  return (
    <div className="main-page">
      {content}
    </div>
  );
};

export default Main;
