import React from "react";
import { Link } from "react-router-dom";
import { services } from "./productCatlog";
const Services = () => {
 

  return (
    <div>
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Our Services</h2>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {services.map((service, index) => (
              <div key={index} className="col">
                <div className="card h-100" style={{ backgroundColor: "gray" }}>
                  <div className="card-body">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="mb-3"
                      style={{
                        maxWidth: "250px",
                        maxHeight: "150px",
                        objectFit: "contain",
                        display: "block",
                        margin: "0 auto",
                      }}
                    />
                    <h5 className="card-title">{service.title}</h5>
                    <p className="card-text">{service.description}</p>
                  
                    <Link to={`/services/${index}`} className="btn btn-primary">
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
