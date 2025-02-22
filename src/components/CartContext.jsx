import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { loggedInUser } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  // Load cart from localStorage when the user logs in or refreshes
  useEffect(() => {
    if (loggedInUser?.email) {
      const savedCart = JSON.parse(localStorage.getItem(`cart_${loggedInUser.email}`)) || [];
      setCart(savedCart);
    }
  }, [loggedInUser]);

  // Function to add an item to the cart with quantity update
  const addToCart = (product, selectedQuantity = 1) => {
    setCart((prevCart) => {
      // Check if product already exists in the cart
      const existingProduct = prevCart.find((item) => item.name === product.name);
  
      if (existingProduct) {
        // Increase quantity by selected amount
        return prevCart.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + selectedQuantity } // Increase by selectedQuantity
            : item
        );
      } else {
        // Add new product with selected quantity
        return [...prevCart, { ...product, quantity: selectedQuantity }];
      }
    });
  
    // Persist the cart data in local storage
    if (loggedInUser && loggedInUser.email) {
      const updatedCart = JSON.parse(localStorage.getItem(`cart_${loggedInUser.email}`)) || [];
      const productExists = updatedCart.find((item) => item.name === product.name);
  
      if (productExists) {
        productExists.quantity += selectedQuantity;
      } else {
        updatedCart.push({ ...product, quantity: selectedQuantity });
      }
  
      localStorage.setItem(`cart_${loggedInUser.email}`, JSON.stringify(updatedCart));
    }
  };
  

  const decreaseQuantity = (product) => {
    let updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex((item) => item.name === product.name);

    if (existingProductIndex !== -1) {
      if (updatedCart[existingProductIndex].quantity > 1) {
        updatedCart[existingProductIndex].quantity -= 1;
      } else {
        updatedCart.splice(existingProductIndex, 1);
      }

      setCart(updatedCart);
      if (loggedInUser?.email) {
        localStorage.setItem(`cart_${loggedInUser.email}`, JSON.stringify(updatedCart));
      }
    }
  };

  const increaseQuantity = (product) => {
    let updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex((item) => item.name === product.name);

    if (existingProductIndex !== -1) {
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
      if (loggedInUser?.email) {
        localStorage.setItem(`cart_${loggedInUser.email}`, JSON.stringify(updatedCart));
      }
    }
  };

  const removeFromCart = (product) => {
    let updatedCart = cart.filter((item) => item.name !== product.name);
    setCart(updatedCart);
    if (loggedInUser?.email) {
      localStorage.setItem(`cart_${loggedInUser.email}`, JSON.stringify(updatedCart));
    }
  };

  // Function to reset cart on logout
  const clearCart = () => {
    setCart([]);
    if (loggedInUser?.email) {
      localStorage.removeItem(`cart_${loggedInUser.email}`);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, decreaseQuantity, increaseQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
