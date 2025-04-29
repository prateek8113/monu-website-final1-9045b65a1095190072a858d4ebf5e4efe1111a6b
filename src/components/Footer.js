import React from 'react'
import { Mail, Phone, MapPin,  } from "lucide-react";

const Footer = () => {
  return (
    <div>
      <section
        className="py-5 bg-dark d-flex flex-row
       align-items-center"
        
      >
        <div
          className="container d-flex justify-content-center align-items-center"
          style={{ minHeight: "150px" }}
        >
          <img
            src="/images/Monu-logo.svg"
            className=" d-block"
            style={{ height: "200px", width: "auto" }}
            alt="Monu Logo"
          />
        </div>
        <div className="container">
  {/* Centering the Contact Us Heading */}
  <h2 className="text-center text-white mb-4">Contact Us</h2>
  
  <div className="row justify-content-center">
    <div className="col-md-6 text-start"> {/* Left-aligning the contact details */}
      <div className="d-flex align-items-center mb-3 text-white">
        <Phone className="text-primary me-3" />
        <span>9810468106 , 9213684115</span>
      </div>
      <div className="d-flex align-items-center text-white mb-3">
        <Mail className="text-primary me-3" />
        <span>monuelectricals@gmail.com</span>
      </div>
      <div className="d-flex align-items-center text-white">
        <MapPin className="text-primary me-3" />
        <span>
          Head Office - Sec-10, Vasundhara, Ghaziabad <br /> <br/>
          Branch Office - Plot No-10, Govind Vihar II, Govindpura, Ghaziabad
        </span>
      </div>
    </div>
  </div>
</div>

      </section>
    </div>
  )
}

export default Footer
