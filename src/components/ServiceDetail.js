import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { services, productCatalog } from "./productCatlog";
import { useCart } from "./Addtocart";
import Navbar from "./Navbar";

const ServiceDetail = () => {
  const { id } = useParams();
  const service = services[id];
  const products = productCatalog[id] || [];
  const { addToCart } = useCart();

  const [selectedOptions, setSelectedOptions] = useState({});

  if (!service) {
    return <h2 className="text-center mt-4">Service not found!</h2>;
  }

  const handleSizeChange = (productId, sizeObj) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [productId]: { ...(prev[productId] || {}), size: sizeObj }
    }));
  };

  const handleColorChange = (productId, color) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [productId]: { ...(prev[productId] || {}), color }
    }));
  };

  const sendWhatsAppMessage = (product) => {
    const selected = selectedOptions[product.id];
    const phoneNumber = "7303055919";
    const message = `Hello, I am interested in the ${product.name}.\n\nSpecifications:\n${Object.entries(product.specs)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n")}
      \nSelected Size: ${selected?.size?.size || "Not Selected"}
      \nSelected Color: ${selected?.color || "Not Selected"}
      \nPrice: ₹${selected?.size?.price || "N/A"}
      \n\nCould you please provide the price and more details?`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleAddToCart = (product) => {
    const selected = selectedOptions[product.id];

    if (!selected?.size) {
      alert("Please select a size first!");
      return;
    }

    const productToAdd = {
      ...product,
      selectedSize: selected.size.size,
      selectedColor: selected.color || null,
      price: selected.size.price
    };

    addToCart(productToAdd);
    window.dispatchEvent(new CustomEvent('cart-updated'));
    alert(`${product.name} (${selected.size.size}) added to cart!`);
  };

  return (
    <>
      <Navbar className="Navbar-fixed-top" />
      <div className="container py-4">
        <div className="row mb-4">
          <div className="col-12">
            <h2 className="display-5 mb-3">{service.title}</h2>
            <p className="lead text-muted mb-4">{service.description}</p>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {products.map((product, index) => {
            const selected = selectedOptions[product.id] || {};
            return (
              <div key={index} className="col">
                <div className="card h-100 shadow-sm">
                  <div style={{ height: '300px', overflow: 'hidden' }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="card-img-top h-100 w-100 object-fit-contain"
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <div className="mt-3">
                      {Object.entries(product.specs).map(([key, value]) => (
                        <div key={key} className="d-flex justify-content-between py-1 border-bottom">
                          <span className="text-muted text-capitalize">{key}:</span>
                          <span>{value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Colors */}
                    {product.variants.colors.length > 0 && (
                      <div className="mt-3">
                        <strong>Colors:</strong>
                        <div className="d-flex flex-wrap gap-2 mt-2">
                          {product.variants.colors.map((color, idx) => (
                            <button
                              key={idx}
                              className={`btn btn-sm ${selected.color === color ? "btn-primary" : "btn-outline-primary"}`}
                              onClick={() => handleColorChange(product.id, color)}
                            >
                              {color}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Sizes */}
                    {product.variants.sizes.length > 0 && (
                      <div className="mt-3">
                        <strong>Sizes:</strong>
                        <div className="d-flex flex-wrap gap-2 mt-2">
                          {product.variants.sizes.map((sizeObj, idx) => (
                            <button
                              key={idx}
                              className={`btn btn-sm ${selected?.size?.size === sizeObj.size ? "btn-success" : "btn-outline-success"}`}
                              onClick={() => handleSizeChange(product.id, sizeObj)}
                            >
                              {sizeObj.size} 
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Selected Price */}
                    {selected?.size && (
                      <div className="mt-3">
                        <h5>Price: ₹{selected.size.price}</h5>
                      </div>
                    )}
                  </div>
                  <div className="card-footer bg-transparent d-flex gap-2">
                    <button
                      className="btn btn-outline-primary flex-grow-1"
                      onClick={() => sendWhatsAppMessage(product)}
                    >
                      Enquire
                    </button>
                    <button
                      className="btn btn-success flex-grow-1"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ServiceDetail;
