import React  from "react";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import Brands from "./Brands";
import Services from "./Services";
import About from "./About";


const HomePage = () => {
  
  
  
    return (
    <div>
   
      {/* Hero Section */}
      <HeroSection /> 
      {/* Brands Section */}
      <Brands/>
      {/* Services Section */}
      <Services />
      {/* about us */}
      <About />
      {/* FOOTER */}
      <Footer />
      
    </div>
  );
};
export default HomePage;