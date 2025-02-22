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
  const addToCart = (product, isQuantityUpdate = false) => {
    if (!loggedInUser) {
      alert("Please log in to add items to your cart.");
      return;
    }

    let updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex((item) => item.name === product.name);

    if (existingProductIndex !== -1) {
      // If product exists, update the quantity
      if (isQuantityUpdate) {
        updatedCart[existingProductIndex].quantity += product.quantity; // Add new quantity to existing one
      } else {
        updatedCart[existingProductIndex].quantity = product.quantity; // Set new quantity
      }
    } else {
      // If the product is new, add it to the cart
      updatedCart.push({ ...product, quantity: product.quantity || 1 });
    }

    setCart(updatedCart);
    if (loggedInUser?.email) {
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
