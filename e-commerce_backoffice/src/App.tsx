import React, { FC, Suspense } from 'react';
import './App.css';
import LeftBar from './views/leftBar/LeftBar';
import Orders from './pages/Orders';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Customers from './pages/Customers';
import Products from './pages/Products';
import Settings from './pages/Settings';
import AppRouter from './routers/AppRouter';
import { BrowserRouter } from 'react-router-dom';
library.add(fas);

const App: FC = () => {
  return (
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
    
    <div className="App">
     <LeftBar/>
     <AppRouter/>
    </div>
    </Suspense>
  </BrowserRouter>
  );
}

export default App;
