import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCartCount } from './Addtocart';

const CartIcon = () => {
  const [cartCount, setCartCount] = useState(getCartCount());

  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getCartCount());
    };

    window.addEventListener('cart-updated', updateCartCount);

    return () => {
      window.removeEventListener('cart-updated', updateCartCount);
    };
  }, []);

  return (
    <Link to="/cart" className="position-relative d-inline-flex align-items-center">
      <i className="fa-solid fa-cart-shopping" style={{ fontSize: '20px' }}></i>
      {cartCount > 0 && (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {cartCount}
          <span className="visually-hidden">items in cart</span>
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
