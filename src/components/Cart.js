import React from 'react';
import { useCart } from './Addtocart';

const Cart = () => {
  const { cart, removeFromCart, clearCart, getCartTotal } = useCart(); // Cart functions from context
  
  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2>Your cart is empty</h2>
        <p>Continue shopping to add items to your cart.</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Your Cart</h2>
      
      {cart.map((item, index) => (
        <div key={index} className="card mb-3">
          <div className="card-body d-flex align-items-center">
            <div className="flex-shrink-0" style={{ width: '100px' }}>
              {item.image && (
                <img src={item.image} alt={item.name} className="img-fluid" />
              )}
            </div>
            <div className="flex-grow-1 ms-3">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">Quantity: {item.quantity}</p>
              <p className="card-text">Price: ₹{item.price * item.quantity}</p>

              {/* Remove from Cart Button */}
              <button 
                className="btn btn-danger btn-sm" 
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="mt-4">
        <h4>Total: ₹{getCartTotal()}</h4>
      </div>

      {/* Buttons: Clear Cart & Proceed to Checkout */}
      <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
        <button 
          className="btn btn-warning" 
          onClick={clearCart}
        >
          Clear Cart
        </button>
        <button className="btn btn-primary">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
