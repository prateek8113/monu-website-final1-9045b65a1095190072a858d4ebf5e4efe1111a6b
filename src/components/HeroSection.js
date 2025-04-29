import React from "react";
import Navbar from "./Navbar";
const HeroSection = ({ contactRef, servicesRef }) => {
  
  return (
    <div>
      <Navbar  />
      <div
        className="position-relative py-5 text-white"
        style={{ minHeight: "500px" }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: "url('/images/hero2.svg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            filter: "brightness(0.5)",
            zIndex: "-1",
          }}
        ></div>

        <div
          className="container d-flex flex-column justify-content-center align-items-center text-center position-relative py-5"
          style={{ minHeight: "500px" }}
        >
          <h1 className="display-4 fw-bold mb-4">Monu Electricals</h1>
          <p className="lead mb-4">
            Your trusted partner in premium electrical retail and services.
            Bringing you the world's leading brands with expert guidance and
            support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
