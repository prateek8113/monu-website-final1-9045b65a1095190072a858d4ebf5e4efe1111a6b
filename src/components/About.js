import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const About = () => {
    const about = [
        { name: "image1", image: "/images/shop1.svg" }, // ✅ Correct: name is a string
        { name: "image2", image: "/images/shop2.svg" }, // ✅ Correct: name is a string
      ];
    
      
      const sliderSettings2 = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1, // Show one image at a time
        slidesToScroll: 1,
        autoplay: true, // Enable auto sliding
        autoplaySpeed: 3000, // Change image every 3 seconds
        cssEase: "linear",
        pauseOnHover: false,
        arrows: false,
      };
  return (
    <div>
         <section className="py-3 bg-light">
        <h1 className="  mb-4 justify-content-center text-center">About Us</h1>
        <div className="container mb-2">
          <Slider
            {...sliderSettings2}
            className="mx-auto"
            style={{ maxWidth: "1000px" }}
          >
            {about.map((item, index) => (
              <div key={index} className="d-flex justify-content-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="img-fluid"
                  style={{
                    maxWidth: "100%", // Ensures the image scales to the container width
                    maxHeight: "600px", // Increases image height
                    objectFit: "cover", // Ensures the image fills the area while maintaining aspect ratio
                  }}
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="row py-3 justify-content-center text-center">
          <div className="col-lg-8">
            <p className="lead mb-1" style={{ fontSize: "28px" }}>
              Welcome to Monu Electricals , your one-stop destination for all
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
      </section>

      
    </div>
  )
}

export default About
