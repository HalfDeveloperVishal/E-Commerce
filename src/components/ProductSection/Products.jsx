import React from "react";
import "./Products.css";
import { useContext } from "react";
import { CartContext } from "../CartContext";
import { useNavigate } from "react-router-dom";
import Product1 from "./Product1.jpg";
import Product2 from "./Product2.jpg";
import Product3 from "./Product3.jpg";
import Product4 from "./Product4.jpg";
import Product5 from "./Product5.jpg";
import Product6 from "./Product6.jpg";
import Product7 from "./Product7.jpg";
import Product8 from "./Product8.jpg";
import Product9 from "./Product9.jpg";
import description11 from './DescriptionImg/description11.jpg'
import description12 from './DescriptionImg/description12.jpg'
import description13 from './DescriptionImg/description13.jpg'
import description21 from './DescriptionImg/description21.jpg'
import description22 from './DescriptionImg/description22.jpg'
import description23 from './DescriptionImg/description23.jpg'
import description31 from './DescriptionImg/description31.jpg'
import description32 from './DescriptionImg/description32.jpg'
import description33 from './DescriptionImg/description33.jpg'
import description41 from './DescriptionImg/description41.jpg'
import description42 from './DescriptionImg/description42.jpg'
import description43 from './DescriptionImg/description43.jpg'
import SimilarItems from "./SimilarItems";

const Card = ({ id, image, name, price, description, rating, images }) => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart({ image, name, price, description, rating });
  };

  const handleViewDetails = () => {
    navigate("/product-description", {
      state: { image, name, price, description, rating, images }, // Pass images array
    });
  };

  const renderStars = () => {
    return [...Array(5)].map((_, i) => (
      <span key={i} style={{ color: i < rating ? "gold" : "gray" }}>★</span>
    ));
  };

  return (
    <div className="card">
      <img src={image} alt={name} className="card-image" />
      <div className="card-details">
        <div className="card-name" onClick={handleViewDetails} style={{ cursor: "pointer" }}>
          {name}
        </div>
        <div className="card-price">{price} rs</div>
      </div>
      <div className="card-product-description">{description}</div>
      <div className="card-rating">{renderStars()}</div>
      <button className="add-to-cart-button" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

const Products = () => {
  const cardsData = [
    {
      id: 1,
      image: Product1,
      name: "Noise Airwave Max 5",
      price: 1299,
      description: "Wireless Over-Ear headphones with AdaptiveHybrid Anc (upto 50dB)",
      rating: 4,
      images: [description11, description12, description13], // Unique images
    },
    {
      id: 2,
      image: Product2,
      name: "ZEBRONICS Thunder",
      price: 699,
      description: "Bluetooth 5.3 Wireless Over Ear with 60H Backup",
      rating: 5,
      images: [description21, description22, description23], // Unique images
    },
    {
      id: 3,
      image: Product3,
      name: "boAt Rockerz 450",
      price: 1499,
      description: "Comes with 15 HRS Battery, 40mm Drivers, Padded Ear Cushions",
      rating: 3,
      images: [description31, description32,description33], // Unique images
    },
    {
      id: 4,
      image: Product4,
      name: "boAt Rockerz 425",
      price: 1299,
      description: "Bluetooth Wireless on Ear Headphones , Enx Tech , ASAP Charge, 25H Playtime",
      rating: 4,
      images: [description41, description42, description43], // Unique images
    },
  ];

  return (
    <div className="app">
      <h1 className="heading">Headphones For You!</h1>
      <div className="card-container">
        {cardsData.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
      <SimilarItems />
    </div>
  );
};

export default Products;
