import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext";
import "./ProductDescription.css";
import { FaTruck, FaShoppingBag } from "react-icons/fa";

const ProductDescription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  // Extract product details from location.state
  const { image, name, description, price, rating, images } = location.state || {};

  // Ensure the product has additional images
  const productImages = images ? [image, ...images] : [image];

  // State to track the displayed main image
  const [mainImage, setMainImage] = useState(image);

  // State to track quantity
  const [quantity, setQuantity] = useState(1);

  if (!name) {
    return <h2>Product not found</h2>;
  }

  // Function to render star ratings
  const renderStars = () => {
    return [...Array(5)].map((_, i) => (
      <span key={i} style={{ color: i < rating ? "gold" : "gray" }}>★</span>
    ));
  };

  // Function to handle quantity decrease
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Function to handle quantity increase
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Function to handle "Add to Cart"
  const handleAddToCart = () => {
    addToCart({ image, name, price, description, rating, quantity });
    alert(`${quantity} ${name}(s) added to cart!`);
  };

  // Function to handle "Buy Now"
  const handleBuyNow = () => {
    addToCart({ image, name, price, description, rating, quantity });
    navigate("/cart");
  };

  return (
    <div className="product-description-page">
      {/* Product Image Section */}
      <div className="product-image-section">
        <img src={mainImage} alt={name} className="product-image" />

        {/* Thumbnail Images */}
        <div className="thumbnail-container">
          {productImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index}`}
              className={`thumbnail ${mainImage === img ? "active" : ""}`}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Product Details Section */}
      <div className="product-details-section">
        <h2 className="product-name">{name}</h2>
        <p className="product-description">{description}</p>
        <div className="product-rating">{renderStars()}</div>

        <hr className="separator-line" />
        <p className="product-price">{price} Rs</p>
        <hr className="separator-line" />

        {/* Quantity Selector */}
        <div className="quantity-selector">
          <button className="quantity-btn" onClick={decreaseQuantity}>−</button>
          <span className="quantity-number">{quantity}</span>
          <button className="quantity-btn" onClick={increaseQuantity}>+</button>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="buy-now-btn" onClick={handleBuyNow}>
            <FaShoppingBag /> Buy Now
          </button>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            <FaTruck /> Add to Cart
          </button>
        </div>

        {/* Delivery & Return Policy Section */}
        <div className="delivery-return-box">
          {/* Free Delivery Section */}
          <div className="delivery-section">
            <FaTruck className="icon" />
            <div>
              <h4>Free Delivery</h4>
              <p>Enjoy free delivery on all orders above ₹500. Get your products delivered safely and on time.</p>
            </div>
          </div>

          <hr className="divider-line" />

          {/* Return Policy Section */}
          <div className="return-section">
            <FaShoppingBag className="icon" />
            <div>
              <h4>Return Policy</h4>
              <p>Easy 7-day return policy. If you're not satisfied, return the product within 7 days for a refund or exchange.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
