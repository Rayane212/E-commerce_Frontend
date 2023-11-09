import React, { FC } from 'react';
import './App.css';
import LeftBar from './assets/tsx/LeftBar';
import Orders_2 from './assets/tsx/orders/Orders_2';

const App: FC = () => {
  return (
    <div className="App">
     <LeftBar/>
     <Orders_2 />
    </div>
  );
}

export default App;
