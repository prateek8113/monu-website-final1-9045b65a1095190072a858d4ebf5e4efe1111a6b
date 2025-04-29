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
    <div>
      <nav className="navbar navbar-expand-lg navbar-light" >
        <div className="container-fluid">
          <a href="/">
            <img src="/images/Monu-logo.svg" alt="Monu Brand Logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <div className="d-flex gap-3">
              <Link to="/cart" className="position-relative d-inline-flex align-items-center text-dark">
                <i className="fa-solid fa-cart-shopping" style={{ fontSize: '20px' }}></i>
                
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                    <span className="visually-hidden">items in cart</span>
                  </span>
                )}
              </Link>
              <button className="btn btn-outline-dark">Login</button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;