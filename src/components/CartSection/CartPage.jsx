import React, { useContext } from "react";
import { CartContext } from "../CartContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai"; // React Icon for delete
import "./CartPage.css";

const CartPage = () => {
  const { cart, decreaseQuantity, increaseQuantity, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Function to handle decrease quantity
  const handleDecreaseQuantity = (product) => {
    decreaseQuantity(product);
  };

  // Function to handle increase quantity
  const handleIncreaseQuantity = (product) => {
    increaseQuantity(product);
  };

  // Function to handle delete item
  const handleDelete = (product) => {
    removeFromCart(product);
  };

  // Calculate Total Price
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const discount = totalPrice * 0.25; // 25% discount applied
  const deliveryCharge = totalPrice > 500 ? 0 : 50; // Free delivery above 500
  const finalAmount = totalPrice - discount + deliveryCharge;

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.name} className="cart-item">
                <div className="left-side-cart-section">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="right-side-cart-section">
                  <div className="product-info">
                    <h3 className="product-name">{item.name}</h3>
                    <button className="delete-icon" onClick={() => handleDelete(item)}>
                      <AiOutlineDelete size={24} />
                    </button>
                  </div>
                  <p className="cart-item-price">{item.price} Rs</p>
                  <div className="quantity-section">
                    <button className="quantity-button" onClick={() => handleDecreaseQuantity(item)}>
                      -
                    </button>
                    <p className="cart-item-quantity">{item.quantity}</p>
                    <button className="quantity-button" onClick={() => handleIncreaseQuantity(item)}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Continue Shopping Button */}
          <button className="continue-shopping-button" onClick={() => navigate("/")}>
            Continue Shopping
          </button>

          {/* Price Details Section */}
          <div className="price-details">
            <h2>Price Details</h2>
            <div className="price-info">
              <p>Price ({totalItems} items):</p>
              <p>{totalPrice.toFixed(2)} Rs</p>
            </div>
            <div className="price-info">
              <p>Discount (25%):</p>
              <p style={{ color: "green" }}>- {discount.toFixed(2)} Rs</p>
            </div>
            <div className="price-info">
              <p>Delivery Charge:</p>
              <p>{deliveryCharge === 0 ? "Free" : `${deliveryCharge} Rs`}</p>
            </div>
            <hr />
            <div className="total-amount">
              <h3>Total Amount:</h3>
              <h3>{finalAmount.toFixed(2)} Rs</h3>
            </div>

          </div>
            <button className="buy-now-button" >
              Proceed to Checkout
            </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
