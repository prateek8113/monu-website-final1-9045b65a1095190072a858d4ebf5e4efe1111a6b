import React from 'react';
import Button from "@mui/joy/Button";
import { useCart } from './Addtocart';

const Cart = () => {
  const { cart, removeFromCart, clearCart, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2>Your cart is empty</h2>
        <p>Continue shopping to add items to your cart.</p>
      </div>
    );
  }

  const sendCartOnWhatsApp = (cartItems) => {
    const phoneNumber = "7303055919";

    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    let message = `Hello, I am interested in the following products:\n\n`;

    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;

      if (item.specs && Object.keys(item.specs).length > 0) {
        message += `Specifications:\n${Object.entries(item.specs)
          .map(([key, value]) => `${key}: ${value}`)
          .join("\n")}\n`;
      }

      if (item.selectedSize) {
        message += `Selected Size: ${item.selectedSize}\n`;
        message += `Price: ₹${item.price}\n`;
      }

      if (item.selectedColor) {
        message += `Selected Color: ${item.selectedColor}\n`;
      }

      message += `Quantity: ${item.quantity || 1}\n`;
      message += `\n----------------------\n\n`;
    });

    message += `\nTotal Estimated Amount: ₹${getCartTotal()}`;
    message += `\n\nPlease share the final price and next steps.`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

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
              <p className="card-text">Quantity: {item.quantity || 1}</p>
              <p className="card-text">Price: ₹{item.price * (item.quantity || 1)}</p>
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

      <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
        <button 
          className="btn btn-warning" 
          onClick={clearCart}
        >
          Clear Cart
        </button>
        <Button
          variant="outlined"
          color="success"
          fullWidth
          onClick={() => sendCartOnWhatsApp(cart)}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
