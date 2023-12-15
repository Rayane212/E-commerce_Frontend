import React, { FC } from 'react';
import './App.css';
import LeftBar from './views/leftBar/LeftBar';
import Orders from './pages/Orders';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Customers from './pages/Customers';
import Products from './pages/Products';
import Settings from './pages/Settings';
import AppRouter from './routers/AppRouter';
library.add(fas);

const App: FC = () => {
  return (
    <div className="App">
     <LeftBar/>
     <AppRouter/>
    </div>
  );
}

export default App;
