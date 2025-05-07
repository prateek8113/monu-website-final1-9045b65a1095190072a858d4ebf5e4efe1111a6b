import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCartCount } from './Addtocart';

const Navbar = () => {
  // Use state to track cart count
  const [cartCount, setCartCount] = useState(getCartCount());
  
  // Add effect to listen for cart updates
  useEffect(() => {
    // Function to update cart count
    const updateCartCount = () => {
      // Force a re-fetch from localStorage
      const newCount = getCartCount();
      setCartCount(newCount);
    };
    
    // Add event listener for cart updates
    window.addEventListener('cart-updated', updateCartCount);
    
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('cart-updated', updateCartCount);
    };
  }, []); // Empty dependency array means this runs once on mount
  
  return (
    <div className="sticky-top bg-white w-100">
      <nav className="navbar navbar-light py-2 w-100">
        <div className="container-fluid">
          {/* Logo with left padding */}
          <Link to="/" className="navbar-brand m-0 ps-4">
            <img 
              src="/images/Monu-logo.svg" 
              alt="Monu Brand Logo" 
              style={{ maxHeight: '35px' }} 
            />
          </Link>
          
          {/* Cart and Login with right padding */}
          <div className="d-flex align-items-center gap-3 pe-4">
            <Link to="/cart" className="position-relative d-inline-flex align-items-center">
              {/* Custom cart icon image */}
              <img 
                src="/images/shopping-cart.png" 
                alt="Shopping Cart" 
                style={{ 
                  width: '24px', 
                  height: '24px',
                  objectFit: 'contain'
                }} 
              />
              
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.65rem' }}>
                  {cartCount}
                  <span className="visually-hidden">items in cart</span>
                </span>
              )}
            </Link>
            
              
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;