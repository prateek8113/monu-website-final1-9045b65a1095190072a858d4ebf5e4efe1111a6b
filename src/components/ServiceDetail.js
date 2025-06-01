import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { services, productCatalog } from "./productCatlog"; // Adjust path as needed
import { useCart } from "./Addtocart";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { Select, Option } from "@mui/joy";

// MUI Joy imports
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
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
        <Footer />
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

  // Single ProductCard component to avoid duplication
  const ProductCard = ({ product, index, isMobile = false }) => {
    const selected = selectedOptions[product.id] || {};
    const variants = product.variants || {};
    const currentImage = getCurrentImage(product, selected.color);
    const showPrice = selected.size?.price || product.price || "14999";

    const cardStyles = {
      
      boxShadow: isMobile ? "0 4px 20px rgba(0,0,0,0.08)" : "0 8px 32px rgba(0,0,0,0.08)",
      display: "flex",
      flexDirection: isMobile ? "row" : "column",
      overflow: "hidden",
      backgroundColor: "white",
      border: "1px solid rgba(0,0,0,0.06)",
      transition: "all 0.3s ease",
      height: isMobile ? "auto" : "100%",
      
    };

    const imageContainerStyles = {
      width: isMobile ? "100%" : "100%",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden"
    };

    const contentStyles = {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      backgroundColor: "white",
      whitespace:isMobile ? "nowrap" : "normal",

      
    };

    return (
      <Card key={index} sx={cardStyles}>
        {/* Image Section */}
        <Box sx={imageContainerStyles}>
          <AspectRatio ratio={isMobile ? "1" : "4/3"} sx={{ 
            width: "100%", 
            backgroundColor: "transparent",
            overflow: "hidden", 
            boxSizing: "border-box",
            '& .MuiAspectRatio-content': {
              position: 'relative',
              width: '100%',
              height: '100%',
              backgroundColor: 'transparent' // Remove grey background
            }
          }}>
            <Zoom>
              <img
                src={currentImage}
                alt={product.name}
                loading="lazy"
                style={{
                  objectFit: isMobile ? "contain" : "contain",
                  width: "100%",
                  height: "100%",
                
                }}
              />
            </Zoom>
          </AspectRatio>
        </Box>

        {/* Content Section */}
        <Box sx={contentStyles}>
          {/* Product Name */}
          <Typography
            level="title-md"
            sx={{
              fontSize: isMobile ? "16px" : "1.3rem",
              fontWeight: isMobile ? "700" : "800",
              fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              color: "#1a202c",
              lineHeight: 1,
              mb: isMobile ? 1 : 2,
              letterSpacing: "-0.01em"
            }}
          >
            {product.name}
          </Typography>

          {/* Product specs */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <Box sx={{ mb: 0.5 }}>
              {Object.entries(product.specs).slice(0, isMobile ? 2 : undefined).map(([key, value]) => (
                <Box
                  key={key}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: isMobile ? "flex-start" : "space-between",
                    mb: isMobile ? 1 : 1,
                    p: isMobile ? 1 : 1.5,
                    backgroundColor: "#f7fafc",
                    borderRadius: isMobile ? "6px" : "12px",
                    border: "1px solid #e2e8f0",
                    
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: isMobile ? "12px" : "14px",
                      fontWeight: "600",
                      color: "#4299e1",
                      textTransform: isMobile ? "uppercase" : "capitalize",
                      letterSpacing: isMobile ? "0.05em" : "normal",
                      minWidth: isMobile ? "60px" : "auto"
                    }}
                  >
                    {key}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: isMobile ? "12px" : "14px",
                      color: "#4a5568",
                      fontWeight: isMobile ? "500" : "600",
                      ml: isMobile ? 1 : 0,
                      textTransform: "capitalize"
                    }}
                  >
                    {value}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}

          {/* Color and Size options */}
          <Box sx={{ mb: 2, 
  display: "flex", 
  gap: isMobile ? 1.5 : 1.5, 
  flexWrap: isMobile ? "nowrap" : "wrap",
  flexDirection: "row",  // Always row for both mobile and desktop
  alignItems: "flex-start"}}>
            {variants.colors?.length > 0 && (
              <Box sx={{ minWidth: isMobile ? "100px" : "auto", mb: isMobile ? 0 : 2 }}>
                <Typography
                  sx={{
                    color: "#718096",
                    fontWeight: isMobile ? "700" : "700",
                    fontSize: isMobile ? "11px" : "14px",
                    mb: isMobile ? 0.5 : 1.5,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em"
                  }}
                >
                  Color{isMobile ? "" : "s"}
                </Typography>
                {isMobile ? (
                  <Select
                    size="sm"
                    value={selected.color || ""}
                    onChange={(event, value) => handleColorChange(product.id, value)}
                    sx={{
                      fontSize: "12px",
                      minWidth: "90px",
                      borderRadius: "8px",
                      backgroundColor: "white",
                      border: "1.5px solid #e2e8f0",
                      "&:hover": {
                        borderColor: "#4299e1"
                      }
                    }}
                  >
                    {variants.colors.map((color, idx) => (
                      <Option key={idx} value={color}>
                        {color}
                      </Option>
                    ))}
                  </Select>
                ) : (
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {variants.colors.map((color, idx) => (
                      <Button
                        key={idx}
                        size="sm"
                        variant={selected.color === color ? "solid" : "outlined"}
                        sx={{
                          borderRadius: "12px",
                          textTransform: "capitalize",
                          fontSize: "12px",
                          fontWeight: "600",
                          px: 2,
                          py: 1,
                          minWidth: "unset",
                          ...(selected.color === color ? {
                            background: "linear-gradient(135deg, #4299e1 0%, #3182ce 100%)",
                            boxShadow: "0 4px 12px rgba(66, 153, 225, 0.3)",
                            border: "none"
                          } : {
                            border: "1.5px solid #e2e8f0",
                            color: "#4a5568",
                            backgroundColor: "white",
                            "&:hover": {
                              borderColor: "#4299e1",
                              backgroundColor: "#ebf8ff"
                            }
                          })
                        }}
                        onClick={() => handleColorChange(product.id, color)}
                      >
                        {color}
                      </Button>
                    ))}
                  </Box>
                )}
              </Box>
            )}

            {variants.sizes?.length > 0 && (
              <Box sx={{ minWidth: isMobile ? "100px" : "auto" }}>
                <Typography
                  sx={{
                    color: "#718096",
                    fontWeight: isMobile ? "600" : "700",
                    fontSize: isMobile ? "11px" : "14px",
                    mb: isMobile ? 0.5 : 1.5,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em"
                  }}
                >
                  Size{isMobile ? "" : "s"}
                </Typography>
                {isMobile ? (
                  <Select
                    size="sm"
                    value={selected?.size?.size || ""}
                    onChange={(event, value) => {
                      const sizeObj = variants.sizes.find(s => s.size === value);
                      handleSizeChange(product.id, sizeObj);
                    }}
                    sx={{
                      fontSize: "12px",
                      minWidth: "90px",
                      borderRadius: "8px",
                      backgroundColor: "white",
                      border: "1.5px solid #e2e8f0",
                      "&:hover": {
                        borderColor: "#4299e1"
                      }
                    }}
                  >
                    {variants.sizes.map((sizeObj, idx) => (
                      <Option key={idx} value={sizeObj.size}>
                        {sizeObj.size}
                      </Option>
                    ))}
                  </Select>
                ) : (
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {variants.sizes.map((sizeObj, idx) => (
                      <Button
                        key={idx}
                        size="sm"
                        variant={selected?.size?.size === sizeObj.size ? "solid" : "outlined"}
                        sx={{
                          borderRadius: "12px",
                          textTransform: "uppercase",
                          fontSize: "13px",
                          fontWeight: "600",
                          px: 2,
                          py: 1,
                          minWidth: "unset",
                          ...(selected?.size?.size === sizeObj.size ? {
                            background: "linear-gradient(135deg, #4299e1 0%, #3182ce 100%)",
                            boxShadow: "0 4px 12px rgba(66, 153, 225, 0.3)",
                            border: "none"
                          } : {
                            border: "1.5px solid #e2e8f0",
                            color: "#4a5568",
                            backgroundColor: "white",
                            "&:hover": {
                              borderColor: "#4299e1",
                              backgroundColor: "#ebf8ff"
                            }
                          })
                        }}
                        onClick={() => handleSizeChange(product.id, sizeObj)}
                      >
                        {sizeObj.size}
                      </Button>
                    ))}
                  </Box>
                )}
              </Box>
            )}
          </Box>

          {/* Pricing Section */}
          <Box sx={{ mb: isMobile ? 2 : 3 }}>
            <Typography
              sx={{
                fontWeight: isMobile ? "800" : "900",
                fontSize: isMobile ? "20px" : "1.8rem",
                background: "linear-gradient(135deg, #4299e1 0%, #3182ce 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                letterSpacing: "-0.02em"
              }}
            >
              ₹{showPrice}
            </Typography>
            {isMobile && (
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#48bb78",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  mt: 0.5
                }}
              >
                <Box
                  component="span"
                  sx={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "#48bb78"
                  }}
                />
                Free delivery
                
                
              </Typography>
            )}
          </Box>

          {/* Action buttons */}
          <Box sx={{
            display: "flex",
            gap: isMobile ? 1 : 1.5,
            mt: "auto"
          }}>
            <Button
              variant="outlined"
              size={isMobile ? "sm" : "md"}
              fullWidth
              sx={{
                whiteSpace:isMobile ? "nowrap" : "normal",
                borderRadius: isMobile ? "10px" : "12px",
                fontWeight: "600",
                textTransform: "none",
                fontSize: isMobile ? "13px" : "15px",
                py: isMobile ? 0 : 1.5,
                border: isMobile ? "1.5px solid #4299e1" : "2px solid #4299e1",
                color: "#4299e1",
                backgroundColor: "white",
                transition: isMobile ? "all 0.2s ease" : "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  backgroundColor: "#ebf8ff",
                  borderColor: "#3182ce",
                  transform: "translateY(-1px)",
                  boxShadow: isMobile ? "none" : "0 8px 20px rgba(66, 153, 225, 0.2)"
                }
              }}
              onClick={() => sendWhatsAppMessage(product)}
            >
              Enquire
            </Button>
            <Button
              variant="solid"
              size={isMobile ? "sm" : "md"}
              fullWidth
              sx={{
                borderRadius: isMobile ? "10px" : "12px",
                fontWeight: "600",
                textTransform: "none",
                fontSize: isMobile ? "13px" : "15px",
                py: isMobile ? 1 : 1.5,
                background: "linear-gradient(135deg, #48bb78 0%, #48bb78 100%)",
                boxShadow: isMobile ? "0 4px 12px rgba(66, 153, 225, 0.3)" : "0 8px 20px rgba(66, 153, 225, 0.3)",
                border: "none",
                transition: isMobile ? "all 0.2s ease" : "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  background: "linear-gradient(135deg, #48bb78 0%, #48bb78 100%)",
                  boxShadow: isMobile ? "0 6px 16px rgba(66, 225, 100, 0.4)" : "0 12px 28px rgba(66, 153, 225, 0.4)",
                  transform: "translateY(-1px)"
                }
              }}
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Card>
    );
  };

  return (
    <>
      <Navbar />
      {/* Main content container */}
      <Box
        sx={{
          width: { xs: "100%", md: "95%" },
          maxWidth: "1800px",
          mx: "auto",
          py: { xs: 1, md: 3 }
        }}
      >
        {/* Page title - only show on desktop */}
        <Typography
          level="h1"
          sx={{
            fontSize: "2.5rem",
            mb: 4,
            fontWeight: "bold",
            display: { xs: "none", md: "block" }
          }}
        >
          {brandName ? `${service.title} - ${brandName}` : service.title}
        </Typography>

        {/* Mobile view: List layout */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            flexDirection: "column",
            gap: 2.5,
            px: 2,
            py: 1
          }}
        >
          {products.map((product, index) => (
            <ProductCard key={index} product={product} index={index} isMobile={true} />
          ))}
        </Box>

        {/* Desktop view: Grid layout */}
        <Box
          sx={{
            display: { xs: "none", md: "grid" },
            gridTemplateColumns: {
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
              xl: "repeat(4, 1fr)"
            },
            gap: 3,
            p: 3
          }}
        >
          {products.map((product, index) => (
            <ProductCard key={index} product={product} index={index} isMobile={false} />
          ))}
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default ServiceDetail;