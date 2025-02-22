import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext";
import "./Products.css";
import SimilarItem1 from './similarItem1.jpg';
import SimilarItem2 from './similarItem2.jpg';
import SimilarItem3 from './similarItem3.jpg';
import SimilarItem4 from './similarItem4.jpg';
import similardescription11 from './DescriptionImg/similardescription11.jpg'
import similardescription12 from './DescriptionImg/similardescription12.jpg'
import similardescription13 from './DescriptionImg/similardescription13.jpg'
import similardescription21 from './DescriptionImg/similardescription21.jpg'
import similardescription22 from './DescriptionImg/similardescription22.jpg'
import similardescription23 from './DescriptionImg/similardescription23.jpg'
import similardescription31 from './DescriptionImg/similardescription31.jpg'
import similardescription32 from './DescriptionImg/similardescription32.jpg'
import similardescription33 from './DescriptionImg/similardescription33.jpg'
import similardescription41 from './DescriptionImg/similardescription41.jpg'
import similardescription42 from './DescriptionImg/similardescription42.jpg'
import similardescription43 from './DescriptionImg/similardescription43.jpg'

// Define a Card component for individual products
const Card = ({ id, image, name, price, description, rating, images }) => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart({ image, name, price, description, rating });
  };

  // Navigate to Product Description page with multiple images
  const handleNavigateToDescription = () => {
    navigate("/product-description", { state: { image, name, price, description, rating, images } });
  };

  // Render star ratings
  const renderStars = () => {
    return [...Array(5)].map((_, i) => (
      <span key={i} style={{ color: i < rating ? "gold" : "gray" }}>★</span>
    ));
  };

  return (
    <div className="card">
      <img src={image} alt={name} className="card-image" />
      <div className="card-details">
        <button className="card-name" onClick={handleNavigateToDescription}>
          {name}
        </button>
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

// Define the SimilarItems component that renders multiple product cards
const SimilarItems = () => {
  const similarItemsData = [
    {
      id: 1,
      image: SimilarItem1,
      name: "Logitech G431",
      price: 3595,
      description: "It comes with 7.1 Surround Sound, DTS x 2.0, 50 mm Audio Drivers and 3.5 mm Jack",
      rating: 4,
      images: [ 
        SimilarItem1,
        similardescription11, 
        similardescription12,
        similardescription13,
      ],
    },
    {
      id: 2,
      image: SimilarItem2,
      name: "Ant Esports H520W World Of Warships Edition",
      price: 699,
      description: "It is a Lightweight Gaming Over Ear Wired Headphones with Mic| 3.5MM Jack |50 MM Drivers ",
      rating: 4,
      images: [
        SimilarItem2,
        similardescription21 ,
        similardescription22, 
        similardescription23,
      ],
    },
    {
      id: 3,
      image: SimilarItem3,
      name: "Cosmic Byte GS430",
      price: 999,
      description: "It is a Gaming wired over ear Headphone, 7 Color RGB LED and Microphone",
      rating: 5,
      images: [
        SimilarItem3,
        similardescription31, 
        similardescription32, 
        similardescription33,
      ],
    },
    {
      id: 4,
      image: SimilarItem4,
      name: "Razer BlackShark V2 X",
      price: 4602,
      description: "It is a Multi-Platform Wired Esports On Ear Headset - RZ04-03240700-R3M1",
      rating: 4,
      images: [ 
        SimilarItem4,
        similardescription41, 
        similardescription42,
        similardescription43,
      ],
    },
  ];

  return (
    <div className="app">
      <h1 className="heading">Similar Items You Might Like</h1>
      <div className="card-container">
        {similarItemsData.map((item, index) => (
          <Card key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default SimilarItems;
