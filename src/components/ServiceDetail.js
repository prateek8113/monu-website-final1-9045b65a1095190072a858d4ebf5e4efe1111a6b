import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { services, productCatalog } from "./productCatlog"; // Adjust path as needed
import { useCart } from "./Addtocart";
import Navbar from "./Navbar";
import Footer from "./Footer";

// MUI Joy imports
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
const DEFAULT_IMAGE = "/images/placeholder-product.png";

const ServiceDetail = () => {
  // Check which params we have - could be either :id or :serviceId/:brandId
  const { id, serviceId, brandId } = useParams();
  
  // Determine which ID to use for the service
  const actualServiceId = serviceId || id;
  const service = services[actualServiceId];
  
  // Get the appropriate products based on whether we're in brand mode or not
  const products = useMemo(() => {
    // For service 3 with a brand selected
    if (brandId && serviceId === '3') {
      return productCatalog[`${serviceId}_${brandId}`] || [];
    }
    // Regular service products (including the direct products for service 3 if needed)
    return productCatalog[actualServiceId] || [];
  }, [actualServiceId, serviceId, brandId]);
  
  // If we have a brand selected for service 3, get its name
  const brandName = brandId && serviceId === '3' ? 
    (productCatalog.brands?.find(b => b.id === brandId)?.name || '') : '';
    
  const { addToCart } = useCart();
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    const initialSelections = {};
    products.forEach((product) => {
      const initialSelection = {};
      const variants = product.variants || {};
      if (variants.sizes?.length > 0) {
        initialSelection.size = variants.sizes[0];
      }
      if (variants.colors?.length > 0 && product.colorImages) {
        initialSelection.color = variants.colors[0];
      }
      initialSelections[product.id] = initialSelection;
    });
    setSelectedOptions(initialSelections);
  }, [products]);

  if (!service) {
    return (
      <>
        <Navbar />
        <Box sx={{ width: "95%", maxWidth: "1600px", mx: "auto", py: 3 }}>
          <Typography level="h2" sx={{ textAlign: "center", mt: 4 }}>
            Service not found!
          </Typography>
        </Box>
      </>
    );
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

    let message = `Hello, I am interested in the ${product.name}.\n\nSpecifications:\n${Object.entries(product.specs || {})
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n")}`;

    if (selected?.size) {
      message += `\nSelected Size: ${selected.size.size}`;
      message += `\nPrice: ₹${selected.size.price}`;
    }

    if (selected?.color) {
      message += `\nSelected Color: ${selected.color}`;
    }

    message += `\n\nCould you please provide the price and more details?`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleAddToCart = (product) => {
    const selected = selectedOptions[product.id] || {};

    const productToAdd = {
      ...product,
      selectedSize: selected.size?.size || null,
      selectedColor: selected.color || null,
      price: selected.size?.price || product.price || "N/A"
    };

    addToCart(productToAdd);
    window.dispatchEvent(new CustomEvent("cart-updated"));

    alert(`${product.name}${selected.size?.size ? ` (${selected.size.size})` : ""} added to cart!`);
  };

  const getCurrentImage = (product, selectedColor) => {
    if (selectedColor && product.colorImages && product.colorImages[selectedColor]) {
      return product.colorImages[selectedColor];
    }
    
    // Check if the product has a main image
    if (product.image && product.image !== "") {
      return product.image;
    }
    
    // Return default placeholder if no valid image is found
    return DEFAULT_IMAGE;
  };

  return (
    <>
      <Navbar />
      {/* Replaced Bootstrap container with custom Box styling */}
      <Box 
        sx={{ 
          width: "95%", 
          maxWidth: "1800px", 
          mx: "auto", 
          py: 3 
        }}
      >
        {/* Page title */}
        <Typography 
          level="h1" 
          sx={{ 
            fontSize: { xs: "2rem", md: "2.5rem" }, 
            mb: 4, 
            fontWeight: "bold" 
          }}
        >
          {brandName ? `${service.title} - ${brandName}` : service.title}
        </Typography>
        
        {/* Product grid */}
        <Box 
          sx={{ 
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",                    // One column on extra small screens
              sm: "repeat(2, 1fr)",         // Two columns on small screens
              md: "repeat(2, 1fr)",         // Two columns on medium screens
              lg: "repeat(3, 1fr)",         // Three columns on large screens
              xl: "repeat(4, 1fr)"          // Four columns on extra large screens
            },
            gap: 4                          // Increased gap between cards
          }}
        >
          {products.map((product, index) => {
            const selected = selectedOptions[product.id] || {};
            const variants = product.variants || {};
            const currentImage = getCurrentImage(product, selected.color);
            const showPrice = selected.size?.price || product.price;

            return (
              <Card 
                key={index}
                sx={{ 
                  height: "100%", 
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  transition: "all 0.3s",
                  "&:hover": {
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    transform: "translateY(-5px)"
                  },
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                {/* Image Section */}
                <CardOverflow>
                  <AspectRatio ratio="4/3" sx={{ minWidth: 200, height: 280 }}>
                    <img 
                      src={currentImage} 
                      alt={product.name} 
                      loading="lazy" 
                      style={{ 
                        objectFit: "cover",
                        transition: "transform 0.5s",
                        "&:hover": {
                          transform: "scale(1.05)"
                        }
                      }}
                    />
                  </AspectRatio>
                </CardOverflow>
                
                {/* Container for all text content */}
                <Box sx={{ 
                  display: "flex", 
                  flexDirection: "column",
                  flex: 1,
                  mt: 1,
                }}>
                  {/* Text Content Section */}
                  <CardContent sx={{ p: 2, flex: 1 }}>
                    <Typography 
                      level="title-md" 
                      sx={{ 
                        fontSize: "1.5rem", 
                        fontWeight: "bold", 
                        fontFamily: "Helvetica",
                        color: "text.primary" 
                      }}
                    >
                      {product.name}
                    </Typography>
                
                    {product.specs && Object.keys(product.specs).length > 0 && (
                      <Box sx={{}}>
                        {Object.entries(product.specs).map(([key, value]) => (
                          <Typography 
                            key={key} 
                            level="body-sm" 
                            sx={{ 
                              mt: 1,
                              display: "flex",
                              fontSize: "20px", 
                              mb: 0.75,
                              color: "text.secondary"
                            }}
                          >
                            <Box component="span" sx={{ color: "primary.main", fontWeight: "600", mr: 1, textTransform: "capitalize" }}>
                              {key} -
                            </Box> 
                            <Box component="span" sx={{ color: "text.secondary", fontWeight: "600", mr: 1, textTransform: "capitalize" }}>
                              {value}
                            </Box> 
                          </Typography>
                        ))}
                      </Box>
                    )}
                
                    {(variants.colors?.length > 0 || variants.sizes?.length > 0) && (
                      <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 2 }}>
                        {variants.colors?.length > 0 && (
                          <Box>
                            <Typography 
                              level="body-sm" 
                              sx={{ 
                                color: "text.secondary", 
                                fontWeight: "600",
                                fontSize: "20px",
                                mb: 1 
                              }}
                            >
                              Colors
                            </Typography>
                            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                              {variants.colors.map((color, idx) => (
                                <Button
                                  key={idx}
                                  size="sm"
                                  variant={selected.color === color ? "solid" : "outlined"}
                                  color="primary"
                                  sx={{ 
                                    borderRadius: "6px",
                                    textTransform: "none",
                                    fontSize: "1rem",
                                    minWidth: "unset",
                                    px: 1.5,
                                    py: 0.5
                                  }}
                                  onClick={() => handleColorChange(product.id, color)}
                                >
                                  {color}
                                </Button>
                              ))}
                            </Box>
                          </Box>
                        )}
                
                        {variants.sizes?.length > 0 && (
                          <Box>
                            <Typography 
                              level="body-sm" 
                              sx={{ 
                                color: "text.secondary", 
                                fontWeight: "600",
                                fontSize: "20px",
                                mb: 1 
                              }}
                            >
                              Sizes
                            </Typography>
                            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                              {variants.sizes.map((sizeObj, idx) => (
                                <Button
                                  key={idx}
                                  size="sm"
                                  variant={selected?.size?.size === sizeObj.size ? "solid" : "outlined"}
                                  color="primary"
                                  sx={{ 
                                    borderRadius: "6px",
                                    textTransform: "none",
                                    fontSize: "1rem",
                                    minWidth: "unset",
                                    px: 1.5,
                                    py: 0.5
                                  }}
                                  onClick={() => handleSizeChange(product.id, sizeObj)}
                                >
                                  {sizeObj.size}
                                </Button>
                              ))}
                            </Box>
                          </Box>
                        )}
                      </Box>
                    )}
                
                    {showPrice && (
                      <Typography 
                        level="title-lg" 
                        sx={{ 
                          mt: 1, 
                          color: "primary.main", 
                          fontWeight: "700",
                          fontSize: "1.5rem"
                        }}
                      >
                        Price-₹{showPrice}
                      </Typography>
                    )}
                  </CardContent>
                
                  {/* Buttons Section */}
                  <CardOverflow>
                    <Box sx={{ 
                      display: "flex", 
                      gap: 1.5,
                      p: 1
                    }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        sx={{
                          borderRadius: "8px",
                          fontWeight: "600",
                          textTransform: "none",
                          boxShadow: "none"
                        }}
                        onClick={() => sendWhatsAppMessage(product)}
                      >
                        Enquire
                      </Button>
                      <Button
                        variant="solid"
                        color="primary"
                        fullWidth
                        sx={{
                          borderRadius: "8px",
                          fontWeight: "600",
                          textTransform: "none",
                          boxShadow: "none"
                        }}
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    </Box>
                  </CardOverflow>
                </Box>
              </Card>
            );
          })}
        </Box>
      </Box>
      <Footer/>
    </>
  );
};

export default ServiceDetail;