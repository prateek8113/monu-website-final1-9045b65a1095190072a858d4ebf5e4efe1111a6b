import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { services, productCatalog } from "./productCatlog"; // Adjust path as needed
import { useCart } from "./Addtocart";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import {  Select, Option } from "@mui/joy";
import ChatIcon from '@mui/icons-material/Chat';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


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
        {/* Page title with different styling for mobile/desktop */}
        <Typography
          level="h1"
          sx={{
            fontSize: { xs: "1.5rem", md: "2.5rem" },
            mb: { xs: 1, md: 4 },
            px: { xs: 2, md: 0 },
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
            gap: 1,
          }}
        >
          {products.map((product, index) => {
            const selected = selectedOptions[product.id] || {};
            const variants = product.variants || {};
            const currentImage = getCurrentImage(product, selected.color);
            const showPrice = selected.size?.price || product.price || "Not Updated";

            return (
              <Card
                key={index}
                sx={{
                  borderRadius: "20px",
                  display: "flex",
                  flexDirection: "row",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  marginRight: 1,
                  marginLeft: 1,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)", 
                }}
              >
                {/* Image Section - Left side on mobile */}
                <Box
                  sx={{
                    width: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AspectRatio ratio="1" sx={{ width: "100%", 
                    backgroundColor: "transparent",
                  padding:0,
                  }}>
                    <Zoom>
                      <img
                        src={currentImage}
                        alt={product.name}
                        loading="lazy"
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                          cursor: "pointer",
                          backgroundColor: "white",
                        }}
                      />
                    </Zoom>
                  </AspectRatio>
                </Box>

                {/* Content Section - Right side on mobile */}
                <Box sx={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  width: "60%",
                  pl: 2
                }}>
                  {/* Product Name */}
                  <Typography
                    level="title-md"
                    sx={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                      color: "text.primary",
                      lineHeight: 1.3,
                      mb: 0.5
                    }}
                  >
                    {product.name}
                  </Typography>

                  {/* Product specs on mobile - styled version */}
                  {product.specs && Object.keys(product.specs).length > 0 && (
                    <Box sx={{ 
                      mt: 1, 
                      mb: 1,
                      p: 1.5,
                      backgroundColor: "rgba(25, 118, 210, 0.04)",
                      borderRadius: "12px",
                      border: "1px solid rgba(25, 118, 210, 0.12)"
                    }}>
                      {Object.entries(product.specs).slice(0, 2).map(([key, value]) => (
                        <Box
                          key={key}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 0.5,
                            "&:last-child": { mb: 0 }
                          }}
                        >
                          <Box
                            sx={{
                              width: "6px",
                              height: "6px",
                              backgroundColor: "primary.main",
                              borderRadius: "50%",
                              mr: 1,
                              flexShrink: 0
                            }}
                          />
                          <Typography
                            level="body-sm"
                            sx={{
                              fontSize: "13px",
                              color: "text.primary",
                              fontWeight: "500"
                            }}
                          >
                            <Box component="span" sx={{ 
                              color: "primary.main", 
                              fontWeight: "600", 
                              textTransform: "capitalize",
                              mr: 0.5
                            }}>
                              {key}:
                            </Box>
                            <Box component="span" sx={{ 
                              fontWeight: "400", 
                              textTransform: "capitalize",
                              color: "text.secondary"
                            }}>
                              {value}
                            </Box>
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  )}

                  {/* Color and Size options for mobile - side by side with reduced width */}
                  <Box sx={{ 
                    mt: 1, 
                    display: "flex", 
                    gap: 1, 
                    flexWrap: "wrap"
                  }}>
                    {variants.colors?.length > 0 && (
                      <Box sx={{ mb: 1, minWidth: "85px", flex: 1 }}>
                        <Typography
                          level="body-sm"
                          sx={{
                            color: "text.secondary",
                            fontWeight: "600",
                            fontSize: "13px",
                            mb: 0.5
                          }}
                        >
                          Colors
                        </Typography>
                        <Select
                          size="sm"
                          value={selected.color || ""}
                          onChange={(event, value) => handleColorChange(product.id, value)}
                          sx={{
                            fontSize: "12px",
                            minWidth: "80px",
                            width: "100%"
                          }}
                        >
                          {variants.colors.map((color, idx) => (
                            <Option key={idx} value={color}>
                              {color}
                            </Option>
                          ))}
                        </Select>
                      </Box>
                    )}

                    {variants.sizes?.length > 0 && (
                      <Box sx={{ minWidth: "85px", flex: 1 }}>
                        <Typography
                          level="body-sm"
                          sx={{
                            color: "text.secondary",
                            fontWeight: "600",
                            fontSize: "13px",
                            mb: 0.5
                          }}
                        >
                          Sizes
                        </Typography>
                        <Select
                          size="sm"
                          value={selected?.size?.size || ""}
                          onChange={(event, value) => {
                            const sizeObj = variants.sizes.find(s => s.size === value);
                            handleSizeChange(product.id, sizeObj);
                          }}
                          sx={{
                            fontSize: "12px",
                            minWidth: "80px",
                            width: "100%"
                          }}
                        >
                          {variants.sizes.map((sizeObj, idx) => (
                            <Option key={idx} value={sizeObj.size}>
                              {sizeObj.size}
                            </Option>
                          ))}
                        </Select>
                      </Box>
                    )}
                  </Box>

                  {/* Pricing Section */}
                  <Typography
                    component="span"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      marginTop: 1,
                    }}
                  >
                    ₹{showPrice}
                  </Typography>

                  {/* Enhanced delivery information */}
                  <Box sx={{ mt: 0.5, mb: 1 }}>
                    <Typography
                      level="body-sm"
                      sx={{
                        mb: 0.2,
                        fontSize: "13px",
                        color: "success.main",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      <Box
                        sx={{
                          width: "4px",
                          height: "4px",
                          backgroundColor: "success.main",
                          borderRadius: "50%",
                          mr: 0.5
                        }}
                      />
                      Free delivery
                    </Typography>
                    <Typography
                      level="body-sm"
                      sx={{
                        fontSize: "12px",
                        color: "warning.main",
                        fontWeight: "500",
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      <Box
                        sx={{
                          width: "4px",
                          height: "4px",
                          backgroundColor: "warning.main",
                          borderRadius: "50%",
                          mr: 0.5
                        }}
                      />
                      Delivery within 2 hours
                    </Typography>
                  </Box>

                  {/* Mobile action buttons */}
                  <Box sx={{
                    display: "flex",
                    gap: 1,
                    mt: "auto",
                    pt: 1,
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="sm"
                      sx={{
                        borderRadius: "4px",
                        fontWeight: "600",
                        textTransform: "none",
                        boxShadow: "none",
                        fontSize: "16px",
                        px: 1
                      }}
                      onClick={() => sendWhatsAppMessage(product)}
                    >
                      <ChatIcon sx={{ mr: 0.5, fontSize: "18px" }} />

                      Enquire
                    </Button>
                    <Button
                      variant="solid"
                      size="sm"
                      sx={{
                        borderRadius: "4px",
                        fontWeight: "600",
                        textTransform: "none",
                        boxShadow: "none",
                        fontSize: "16px",
                        px: 1,
                        whiteSpace: "nowrap",
                        backgroundColor: "#4caf50",
                        "&:hover": {
                          backgroundColor: "#45a049"
                        }
                      }}
                      onClick={() => handleAddToCart(product)}
                    >
                       <ShoppingCartIcon sx={{ mr: 0.5, fontSize: "18px" }} />
                      Add to Cart
                    </Button>
                  </Box>
                </Box>
              </Card>
            );
          })}
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
            gap: 4
          }}
        >
          {products.map((product, index) => {
            const selected = selectedOptions[product.id] || {};
            const variants = product.variants || {};
            const currentImage = getCurrentImage(product, selected.color);
            const showPrice = selected.size?.price || product.price || "14999";

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
                    <Zoom>
                      <img
                        src={currentImage}
                        alt={product.name}
                        loading="lazy"
                        style={{
                          objectFit: "contain",
                          maxHeight: "100%",
                          width: "100%",
                          height: "100%",
                          cursor: "zoom-in"
                        }}
                      />
                    </Zoom>
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

                    {/* Enhanced Desktop Specs */}
                    {product.specs && Object.keys(product.specs).length > 0 && (
                      <Box sx={{ 
                        mt: 2, 
                        mb: 2,
                        p: 1,
                        backgroundColor: "rgba(25, 118, 210, 0.04)",
                        borderRadius: "12px",
                        border: "1px solid rgba(25, 118, 210, 0.12)"
                      }}>
                        {Object.entries(product.specs).map(([key, value]) => (
                          <Box
                            key={key}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1,
                              "&:last-child": { mb: 0 }
                            }}
                          >
                            <Box
                              sx={{
                                width: "8px",
                                height: "8px",
                                backgroundColor: "primary.main",
                                borderRadius: "50%",
                                mr: 1.5,
                                flexShrink: 0
                              }}
                            />
                            <Typography
                              level="body-sm"
                              sx={{
                                fontSize: "16px",
                                color: "text.primary",
                                fontWeight: "500"
                              }}
                            >
                              <Box component="span" sx={{ 
                                color: "primary.main", 
                                fontWeight: "600", 
                                textTransform: "capitalize",
                                mr: 0.5
                              }}>
                                {key}:
                              </Box>
                              <Box component="span" sx={{ 
                                fontWeight: "400", 
                                textTransform: "capitalize",
                                color: "text.secondary"
                              }}>
                                {value}
                              </Box>
                            </Typography>
                          </Box>
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
                        
                          color: "primary.main",
                          fontWeight: "700",
                          fontSize: "1.5rem"
                        }}
                      >
                        Price-₹{showPrice}
                      </Typography>
                    )}

                    {/* Enhanced delivery information for desktop */}
                    <Box sx={{ mt: 1 }}>
                      <Typography
                        level="body-sm"
                        sx={{
                          mb: 0.2,
                          fontSize: "14px",
                          color: "blue.main",
                          fontWeight: "600",
                          display: "flex",
                          alignItems: "center"
                        }}
                      >
                        <Box
                          sx={{
                            width: "5px",
                            height: "5px",
                            backgroundColor: "success.main",
                            borderRadius: "50%",
                            mr: 0.7
                          }}
                        />
                        Free delivery
                      </Typography>
                      <Typography
                        level="body-sm"
                        sx={{
                          fontSize: "13px",
                          color: "warning.main",
                          fontWeight: "500",
                          display: "flex",
                          alignItems: "center"
                        }}
                      >
                        <Box
                          sx={{
                            width: "5px",
                            height: "5px",
                            backgroundColor: "warning.main",
                            borderRadius: "50%",
                            mr: 0.7
                          }}
                        />
                        Delivery within 2 hours
                      </Typography>
                    </Box>
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
                        fullWidth
                        sx={{
                          borderRadius: "8px",
                          fontWeight: "600",
                          textTransform: "none",
                          boxShadow: "none",
                          backgroundColor: "#4caf50",
                          "&:hover": {
                            backgroundColor: "#45a049"
                          }
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
      <Footer />
    </>
  );
};

export default ServiceDetail;