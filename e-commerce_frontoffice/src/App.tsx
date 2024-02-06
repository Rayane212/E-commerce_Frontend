import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import News from "./pages/News/News";
import Men from "./pages/Men/Men";
import Women from "./pages/Women/Women";
import Cart from "./pages/Cart/Cart";
import Article from "./pages/Article/Article";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";

function App() {
  return (
    <ShoppingCartProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/Men" element={<Men />} />
        <Route path="/Women" element={<Women />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Article/:id" element={<Article />} />
      </Routes>
    </ShoppingCartProvider>
  );
}

export default App;
