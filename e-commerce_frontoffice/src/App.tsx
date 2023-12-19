import React from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import News from "./pages/News/News";
import Men from "./pages/Men/Men";
import Women from "./pages/Women/Women";
import Cart from "./pages/Cart/Cart";
import Article from "./pages/Article/Article";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<News />} />
          <Route path="/Men" element={<Men />} />
          <Route path="/Women" element={<Women />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Article/:id" element={<Article />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
