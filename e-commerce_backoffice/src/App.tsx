import React, { FC } from 'react';
import './App.css';
import LeftBar from './assets/tsx/LeftBar';
import Orders from './views/orders/Orders';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Customers from './views/customers/Customers';
import Products from './assets/tsx/Products';
import Settings from './assets/tsx/Settings';
library.add(fas);

const App: FC = () => {
  return (
    <div className="App">
     <LeftBar/>
     <Orders />
    </div>
  );
}

export default App;
