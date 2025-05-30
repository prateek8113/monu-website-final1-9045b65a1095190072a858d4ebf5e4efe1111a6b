import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Brands = () => {
    const brands = [
        { name: "Anchor", logo: "images/anchor-logo.png" },
        { name: "Bajaj", logo: "/images/bajaj-electricals-logo.svg" },
        { name: "Crompton", logo: "/images/crompton-logo.png" },
        { name: "Sujata", logo: "/images/sujata.svg" },
        { name: "RR Kabel", logo: "/images/rr.svg" },
        { name: "Havells", logo: "/images/havells-logo.png" },
        { name: "Philips", logo: "/images/cona-logo.png" },
        { name: "Wipro", logo: "/images/philips1.png" },
      ];
    
      // Slider settings
      const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        cssEase: "linear",
        pauseOnHover: false,
        responsive: [
          { breakpoint: 1024, settings: { slidesToShow: 3 } },
          { breakpoint: 768, settings: { slidesToShow: 2 } },
          { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
        arrows: false,
      };
  return (
    <div>
    <section className="py-5 bg-light">
        <div className="container">
          <h3 className="text-center mb-3">Our Premium Brands</h3>
          <p className="text-center text-muted mb-5">
            We partner with the world's leading electrical manufacturers to
            bring you the best in quality and innovation.
          </p>
          <Slider {...sliderSettings}>
            {brands.map((brand, index) => (
              <div key={index} className="px-1">
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className="img-fluid"
                  style={{ maxHeight: "100px", margin: "auto" }}
                />
              </div>
            ))}
          </Slider>
        </div>
      </section>
      
    </div>
  )
}

export default Brands
