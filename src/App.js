import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import ServiceDetail from "./components/ServiceDetail";
import { CartProvider } from './components/Addtocart';
import Cart from './components/Cart';


const App = () => {
  return (
    <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/cart" element={<Cart />} />
        
      </Routes>
    </Router>
    </CartProvider>
  );
};

export default App;