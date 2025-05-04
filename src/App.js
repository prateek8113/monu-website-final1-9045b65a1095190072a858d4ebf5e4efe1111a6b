import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import ServiceDetail from "./components/ServiceDetail";
import { CartProvider } from './components/Addtocart';
import Cart from './components/Cart';
import BrandsCategory from './components/BrandsCategory';
 // Updated path to match your folder structure

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Special route for the 4th service (index 3) to show brands */}
          <Route path="/services/3/brands" element={<BrandsCategory />} />
          {/* Route for brand-specific products */}
          <Route path="/services/:serviceId/brands/:brandId" element={<ServiceDetail />} />
          {/* Keep the original route for other services */}
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;