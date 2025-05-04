import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import ServiceDetail from "./components/ServiceDetail";
import { CartProvider } from "./components/Addtocart";
import Cart from "./components/Cart";
import BrandsCategory from "./components/BrandsCategory";
import LightCategory from "./components/LightCategory";
import LedProduct from "./components/LedProduct";


const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services/3/brands" element={<BrandsCategory />} />
          <Route path="/services/1" element={<LightCategory />} />
          <Route path="/services/1/ledbulbs" element={<LedProduct />} />
          <Route path="/services/1/ledbatten" element={<LedProduct />} />
          <Route path="/services/1/ledpanel" element={<LedProduct/>} />
          <Route path="/services/1/spotlight" element={<LedProduct/>} />
        
          <Route
            path="/services/:serviceId/brands/:brandId"
            element={<ServiceDetail />}
          />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
