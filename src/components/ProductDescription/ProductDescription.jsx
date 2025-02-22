import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext";
import "./ProductDescription.css";
import { FaTruck, FaShoppingBag } from "react-icons/fa";

const ProductDescription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { image, name, description, price, rating, images } = location.state || {};

  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const productImages = images || [image]; // Use provided images or fallback to main image
  const [mainImage, setMainImage] = useState(productImages[0]);
  const [quantity, setQuantity] = useState(1); // State for selected quantity

  if (!name) {
    return <h2>Product not found</h2>;
  }

  const renderStars = () => {
    return [...Array(5)].map((_, i) => (
      <span key={i} style={{ color: i < rating ? "gold" : "gray" }}>★</span>
    ));
  };

  const handleAddToCart = () => {
    addToCart({ image, name, price, description, rating }, quantity); // Pass correct quantity
    alert(`${quantity} ${name}(s) added to cart!`);
  };

  const handleBuyNow = () => {
    addToCart({ image, name, price, description, rating }, quantity);
    navigate("/cart");
  };

  return (
    <div className="product-description-page">
      <div className="product-image-section">
        <img src={mainImage} alt={name} className="product-image" />
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

      <div className="product-details-section">
        <h2 className="product-name">{name}</h2>
        <p className="product-description">{description}</p>
        <div className="product-rating">{renderStars()}</div>

        <hr className="separator-line" />
        <p className="product-price">{price} Rs</p>
        <hr className="separator-line" />

        <div className="quantity-selector">
          <button className="quantity-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
          <span className="quantity-number">{quantity}</span>
          <button className="quantity-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>

        <div className="action-buttons">
          <button className="buy-now-btn" onClick={handleBuyNow}>Buy Now</button>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
        </div>

        <div className="delivery-return-box">
          <div className="delivery-section">
            <FaTruck className="icon" />
            <div>
              <h4>Free Delivery</h4>
              <p>Enjoy free delivery on all orders above ₹500. Get your products delivered safely and on time.</p>
            </div>
          </div>

          <hr className="divider-line" />

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
