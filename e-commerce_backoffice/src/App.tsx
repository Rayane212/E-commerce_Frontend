import React, { FC } from 'react';
import './App.css';
import LeftBar from './assets/tsx/LeftBar';
import Main from './assets/tsx/Main';

const App: FC = () => {
  return (
    <div className="App">
     <LeftBar/>
     <Main component={{ name: "Commande", comm: "orders" }} />
    </div>
  );
}

export default App;
