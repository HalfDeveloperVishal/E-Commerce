import React from 'react';
import './Heropart.css'; // Import the CSS file for styling
import Headphone from './Headphone.png'

const Heropart = () => {
  return (
    <div className='Heropart'>
    <div className="container">
      <div className="content">
        <h1 className="heading">Grab upto 50% Off on the Selected Headphone</h1>
        <button className="button">Buy Now</button>
      </div>
      <div className="image-container">
        <img
          src={Headphone} // Replace with your image URL
          alt="Placeholder"
          className="image"
        />
      </div>
    </div>
    </div>
  );
};

export default Heropart;