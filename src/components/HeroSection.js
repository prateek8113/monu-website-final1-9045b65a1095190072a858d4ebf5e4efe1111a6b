import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "./Navbar";

const HeroCarousel = ({ contactRef, servicesRef }) => {
  // Carousel images
  const heroSlides = [
    { image: "/images/page1.png" },
    { image: "/images/page2.png" },
    { image: "/images/page3.png" }
  ];

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    arrows: false,
    appendDots: dots => (
      <div style={{ position: "absolute", bottom: "20px", width: "100%" }}>
        <ul style={{ margin: "0", padding: "0" }}>{dots}</ul>
      </div>
    ),
    customPaging: i => (
      <div
        style={{
          width: "10px",
          height: "10px",
          backgroundColor: "white",
          borderRadius: "50%",
        }}
      ></div>
    ),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: true,
          dotsClass: "slick-dots",
          appendDots: dots => (
            <div style={{ position: "absolute", bottom: "10px", width: "100%" }}>
              <ul style={{ margin: "0", padding: "0" }}>{dots}</ul>
            </div>
          ),
          customPaging: i => (
            <div
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: "white",
                borderRadius: "50%",
              }}
            ></div>
          )
        }
      }
    ]
  };

  return (
    <div>
      <Navbar />
      <div className="hero-container">
        <Slider {...sliderSettings} className="hero-slider">
          {heroSlides.map((slide, index) => (
            <div key={index} className="hero-slide">
              <img
                className="hero-image"
                src={slide.image}
                alt={`Slide ${index + 1}`}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Custom CSS for the slider */}
      <style jsx>{`
        .hero-container {
          width: 100%;
          margin: 0;
          padding: 0;
          line-height: 0; /* Remove any line-height spacing */
        }

        .hero-slider {
          margin: 0;
          padding: 0;
        }

        .hero-slide {
          width: 100%;
          margin: 0;
          padding: 0;
        }

        .hero-image {
          width: 100%;
          height: auto;
          display: block;
          margin: 0;
          padding: 0;
        }

        /* Reset slick slider default styles */
        .slick-list,
        .slick-track,
        .slick-slide > div {
          margin: 0;
          padding: 0;
          line-height: 0;
        }

        /* Ensure full image visibility on all screens */
        @media (max-width: 768px) {
          .hero-container {
            margin: 0;
            padding: 0;
          }

          .hero-slide {
            width: 100%;
            margin: 0;
            padding: 0;
          }

          .hero-image {
            width: 100%;
            height: auto;
            display: block;
            margin: 0;
            padding: 0;
          }
        }

        @media (max-width: 576px) {
          .hero-image {
            width: 100%;
            height: auto;
            display: block;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroCarousel;