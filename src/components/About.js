import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const About = () => {
  const about = [
    { name: "image1", image: "/images/shop1.svg" },
    { name: "image2", image: "/images/shop2.svg" },
  ];
  
  const sliderSettings2 = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: false,
    arrows: false,
  };

  return (
    <div style={{ overflowX: 'hidden', width: '100%' }}>
      <section className="py-3 bg-light">
        <h1 className="mb-4 text-center">About Us</h1>
        <div className="container px-0">
          <Slider
            {...sliderSettings2}
            className="mx-auto"
            style={{ maxWidth: "100%" }}
          >
            {about.map((item, index) => (
              <div key={index} className="d-flex justify-content-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="img-fluid"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "600px",
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="container">
          <div className="row py-3 justify-content-center">
            <div className="col-lg-8 px-3">
              <p className="lead mb-1" style={{ fontSize: "28px" }}>
                Welcome to Monu Electricals, your one-stop destination for all
                your electrical needs. We are a family-owned business with over 20
                years of experience in providing quality products and services to
                our customers. Whether you need wiring, lighting, appliances, or
                accessories, we have it all at affordable prices. Our friendly and
                knowledgeable staff are always ready to assist you with any
                queries or requests. At Monu Electricals, we value your
                satisfaction and trust above everything else. That's why we only
                work with reputable brands and suppliers, and follow the highest
                standards of safety and professionalism. We invite you to browse
                our website and discover our wide range of products and services.
                You can also visit our store or contact us online to place an
                order or request a quote. We look forward to serving you soon!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;